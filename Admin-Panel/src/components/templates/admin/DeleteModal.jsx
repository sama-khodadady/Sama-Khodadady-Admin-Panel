import toast from "react-hot-toast";

import { useDelete } from "hooks/mutation";
import { removeCookie } from "utils/cookie";
import { createQueryObj } from "utils/search";
import { useAuth } from "context/AuthContext";

import styles from "./DeleteModal.module.css";

function DeleteModal({ searchParams }) {
  const { setQuery, setIsDelete } = useAuth();
  const id = searchParams.get("delete");
  const { mutate } = useDelete();
  //confirm delete a product
  const confirmDelete = () => {
    mutate(id, {
      onSuccess: () => {
        toast.success("محصول با موفقیت حذف شد");
        setQuery((query) => createQueryObj(query, { delete: "" }));
        setIsDelete(false);
      },
      onError: (error) => {
        console.log(error);
        if (error.status === 401 || error.status === 403) {
          toast.error("لطفا دوباره وارد اکانت خود شوید!");
          removeCookie("token");
          navigate("/signup");
        }
        if (error.status === 404) toast.error("محصول مورد نظر یافت نشد!");
      },
    });
  };
  //cancel deleting product process
  const cancelHandler = () => {
    setIsDelete(false);
    setQuery((query) => createQueryObj(query, { delete: "" }));
  };

  return (
    <div className={styles.delete}>
      <div className={styles.modal}>
        <img src="/close.svg" alt="close" />
        <div>
          <h2>آیا از حذف این محصول مطمئنید؟</h2>
          <div className={styles.actions}>
            <button onClick={confirmDelete} className={styles.confirm}>
              حذف
            </button>
            <button onClick={cancelHandler} className={styles.cancel}>
              لغو
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
