const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const swaggerUi = require('swagger-ui-express');

// Load swagger configuration
let swaggerDocument = require('./swagger/swagger.json');

const app = express();
let PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all origins
app.use(cors());

// Routes
app.use('/products', productRoutes);
app.use('/auth', authRoutes);

// Helper function to start server and try the next port if the current one is taken
function startServer(port) {
  const server = app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);

    // Update Swagger with the correct port
    swaggerDocument.servers = [
      {
        url: `http://localhost:${port}`,
        description: "Local server"
      }
    ];

    // Serve updated Swagger docs
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    console.log(`Swagger API docs are available at http://localhost:${port}/api-docs`);
  });

  // Handle error in case the port is in use
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is in use, trying port ${port + 1}...`);
      startServer(port + 1); // Try the next port
    } else {
      console.error('Server error:', err);
    }
  });
}

// Start the server and handle port availability
startServer(PORT);