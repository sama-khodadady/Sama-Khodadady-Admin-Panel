import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Layout from "layout/layout";
import { useProducts } from "hooks/queries";
import { searchProducts } from "utils/search";
import { useAuth } from "context/AuthContext";
import Loader from "components/modules/Loader";
import Card from "components/templates/shop/Card";
import Sidebar from "components/templates/shop/Sidebar";
import Pagination from "components/templates/admin/pagination";

import styles from "./HomePage.module.css";

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [price, setPrice] = useState({ min: "", max: "" });
  const [search, setSearch] = useState("");
  const [displayed, setDisplayed] = useState([]);
  const { page, setQuery, query } = useAuth();
  const { data, isFetching, error, refetch } = useProducts(page, price);
  const productsData = data?.data?.data;

  useEffect(() => {
    setDisplayed(productsData);
  }, [productsData]);

  useEffect(() => {
    setSearchParams(query);
    let finalProducts = searchProducts(productsData, search);
    setDisplayed(finalProducts);
    refetch("products");
  }, [query]);

  return (
    <Layout>
      <div className={styles.container}>
        {isFetching ? (
          <Loader />
        ) : (
          <div className={styles.main}>
            <Sidebar
              productsData={productsData}
              refetch={refetch}
              price={price}
              setPrice={setPrice}
              setQuery={setQuery}
              search={search}
              setSearch={setSearch}
            />
            <div className={styles.mainContent}>
              {error?.status === 400 ? (
                <div className={styles.emptyProduct}>
                  <p>محصولی یافت نشد!</p>
                  <img src="/emptyshop.svg" alt="empty" />
                </div>
              ) : (
                displayed?.map((product) => (
                  <Card key={product.id} data={product} />
                ))
              )}
            </div>
          </div>
        )}
        <Pagination />
      </div>
    </Layout>
  );
}

export default HomePage;
