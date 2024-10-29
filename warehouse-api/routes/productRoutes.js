const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

// Path to the products JSON file
const productsFilePath = path.join(__dirname, '../data/products.json');

// Helper functions...
const readProducts = () => {
  const data = fs.readFileSync(productsFilePath);
  return JSON.parse(data);
};

const writeProducts = (products) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};

// GET all products with pagination and search parameters (protected)
router.get('/', (req, res) => {
  const products = readProducts();

  // Extract query parameters for pagination and search
  let { page = 1, limit = 10, name, minPrice, maxPrice } = req.query;

  // Convert page and limit to integers and ensure they are valid
  page = Math.max(1, parseInt(page) || 1);
  limit = Math.max(1, parseInt(limit) || 10);

  // Filter products by search parameters if provided
  let filteredProducts = products;

  // Case-insensitive search by product name
  if (name) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Validate and filter by price range if provided
  const minPriceNum = parseFloat(minPrice);
  const maxPriceNum = parseFloat(maxPrice);

  if (!isNaN(minPriceNum)) {
    filteredProducts = filteredProducts.filter(product => product.price >= minPriceNum);
  }

  if (!isNaN(maxPriceNum)) {
    filteredProducts = filteredProducts.filter(product => product.price <= maxPriceNum);
  }

  // Check if minPrice is greater than maxPrice
  if (!isNaN(minPriceNum) && !isNaN(maxPriceNum) && minPriceNum > maxPriceNum) {
    return res.status(400).json({ message: "minPrice cannot be greater than maxPrice" });
  }

  // Pagination calculation
  const totalProducts = filteredProducts.length;
  const totalPages = Math.ceil(totalProducts / limit);
  const startIndex = (page - 1) * limit;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + limit);

  // Check if the page requested is out of bounds
  if (page > totalPages) {
    return res.status(400).json({
      message: `Page ${page} is out of bounds. There are only ${totalPages} pages.`,
    });
  }

  // Response with paginated products and total count
  res.json({
    totalProducts,
    page,
    limit,
    totalPages,
    data: paginatedProducts
  });
});

// GET a specific product by ID (public)
router.get('/:id', (req, res) => {
  const products = readProducts();
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// POST a new product (protected)
router.post('/', authenticateToken, (req, res) => {
  const products = readProducts();
  const newProduct = {
    id: uuidv4(),
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity
  };
  products.push(newProduct);
  writeProducts(products);
  res.status(201).json(newProduct);
});

// PUT to update an existing product (protected)
router.put('/:id', authenticateToken, (req, res) => {
  const products = readProducts();
  const productIndex = products.findIndex(p => p.id === req.params.id);
  if (productIndex === -1) return res.status(404).json({ message: 'Product not found' });

  const updatedProduct = { ...products[productIndex], ...req.body };
  products[productIndex] = updatedProduct;
  writeProducts(products);
  res.json(updatedProduct);
});

// DELETE a product by ID (protected)
router.delete('/:id', authenticateToken, (req, res) => {
  const products = readProducts();
  const newProducts = products.filter(p => p.id !== req.params.id);
  if (products.length === newProducts.length) return res.status(404).json({ message: 'Product not found' });

  writeProducts(newProducts);
  res.status(204).send();
});

// DELETE multiple products (protected)
router.delete('/', authenticateToken, (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids)) return res.status(400).json({ message: 'IDs should be an array' });

  const products = readProducts();
  const newProducts = products.filter(p => !ids.includes(p.id));

  if (products.length === newProducts.length) return res.status(404).json({ message: 'No products found to delete' });

  writeProducts(newProducts);
  res.status(204).send();
});

module.exports = router;
