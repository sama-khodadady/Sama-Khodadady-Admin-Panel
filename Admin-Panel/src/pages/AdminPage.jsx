import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { useProducts } from "hooks/queries";
import { useAuth } from "context/AuthContext";
import Loader from "components/modules/Loader";
import { useMultipleDelete } from "hooks/mutation";
import Search from "components/templates/admin/Search";
import AddModal from "components/templates/admin/AddModal";
import { createQueryObj, searchProducts } from "utils/search";
import Pagination from "components/templates/admin/pagination";
import DeleteModal from "components/templates/admin/DeleteModal";
import ProductsList from "components/templates/admin/ProductsList";

import styles from "./AdminPage.module.css";

function AdminPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [ids, setIds] = useState([]);
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", quantity: "" });
  const { page, setPage, query, setQuery, addModal, setAddModal, isDelete } =
    useAuth();

  const { data, refetch, isFetching, error } = useProducts(page);
  const productsData = data?.data?.data;

  if (error?.code === "ERR_NETWORK")
    toast.error("مشکلی از سمت سرور بوجود آمده است،لطفا بعدا تلاش کنید!");

  const { mutate } = useMultipleDelete();

  useEffect(() => {
    setDisplay(productsData);
  }, [productsData]);

  useEffect(() => {
    setSearchParams(query);
    let finalProducts = searchProducts(productsData, search);
    setDisplay(finalProducts);
  }, [query]);

  useEffect(
    () => setQuery((query) => createQueryObj(query, { search })),
    [search]
  );

  //delete handler
  const deleteAllHandler = () => {
    mutate(ids, {
      onSuccess: () => toast.success("محصولات با موفقیت حذف شدند!"),
      onError: (error) => {
        if (error.status === 404) toast.error("محصولی برا حذف یافت نشد!");
        if (error.status === 403)
          toast.error(
            "شما مجاز به حذف نیستید،لطفا دوباره وارد اکانت خود شوید!"
          );
      },
    });
  };

  return (
    <div className={styles.admin}>
      <Search search={search} setSearch={setSearch} />
      <div className={styles.actions}>
        <div className={styles.title}>
          <img src="/setting.svg" alt="setting" />
          <h2>مدیریت کالا</h2>
        </div>
        <div className={styles.buttons}>
          <button onClick={deleteAllHandler}>حذف</button>
          <button onClick={() => setAddModal(true)}>افزودن محصول</button>
        </div>
      </div>
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th>نام کالا</th>
              <th>موجودی</th>
              <th>قیمت</th>
              <th>شناسه کالا</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {error?.status === 400 ? (
              <tr className={styles.notfound}>
                <td colSpan="5">محصولی یافت نشد! </td>
              </tr>
            ) : isFetching ? (
              <Loader />
            ) : (
              display?.map((item) => (
                <ProductsList
                  key={item.id}
                  data={item}
                  setForm={setForm}
                  ids={ids}
                  setIds={setIds}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination page={page} setPage={setPage} />
      {addModal && (
        <AddModal
          form={form}
          setForm={setForm}
          searchParams={searchParams}
          refetch={refetch}
        />
      )}
      {isDelete && <DeleteModal searchParams={searchParams} />}
    </div>
  );
}

export default AdminPage;
