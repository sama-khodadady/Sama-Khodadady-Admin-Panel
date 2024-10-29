import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { removeCookie } from "utils/cookie";
import { createQueryObj } from "utils/search";
import { useAuth } from "context/AuthContext";
import { useAddProduct, useUpdateProduct } from "hooks/mutation";

import styles from "./AddModal.module.css";

function AddModal({ form, setForm, refetch }) {
  const { setQuery, isEdit, setIsEdit, setAddModal } = useAuth();
  const navigate = useNavigate();
  const { mutate } = useAddProduct();
  const { mutate: update } = useUpdateProduct();

  //input change handler
  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm((form) => ({ ...form, [name]: value }));
  };
  //add a new product handler
  const addHandler = (event) => {
    event.preventDefault();
    if (!form.name || !form.quantity || !form.price) return;
    mutate(form, {
      onSuccess: (response) => {
        if (response.status === 201) toast.success("کالا با موفقیت اضافه شد");
        refetch("products");
        setAddModal(false);
        setForm({ name: "", price: "", quantity: "" });
      },
      onError: (error) => {
        console.log(error);
        if (error.status === 401 || error.status === 403) {
          toast.error("لطفا دوباره وارد اکانت خود شوید!");
          removeCookie("token");
          navigate("/signup");
        }
      },
    });
  };
  //edit a product handler
  const editHandler = (event) => {
    event.preventDefault();
    setForm(form);
    update(form, {
      onSuccess: (response) => {
        console.log(response);
        toast.success("اطلاعات محصول با موفقیت ویرایش شد");
        setForm({ name: "", price: "", quantity: "" });
        setQuery((query) => createQueryObj(query, { edit: "" }));
        setIsEdit(false);
        setAddModal(false);
      },
      onError: (error) => {
        console.log(error);
        if (error.status === 401 || error.status === 403) {
          toast.error("لطفا دوباره وارد اکانت خود شوید!");
          removeCookie("token");
          setAddModal(false);
          navigate("/signup");
        }
        if (error.status === 404) toast.error("محصول مورد نظر یافت نشد!");
      },
    });
  };
  //cancel add/edit process handler
  const cancleHandler = () => {
    if (isEdit) {
      setIsEdit(false);
      setForm({ name: "", price: "", quantity: "" });
      setQuery((query) => createQueryObj(query, { edit: "" }));
    }
    setAddModal(false);
    setForm({ name: "", price: "", quantity: "" });
  };
  return (
    <div className={styles.addModal}>
      <form onSubmit={isEdit ? editHandler : addHandler}>
        <h3>{isEdit ? "ویرایش اطلاعات" : " ایجاد محصول جدید"}</h3>
        <div className={styles.inputs}>
          <label htmlFor="name">نام کالا</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="نام کالا"
            value={form.name}
            onChange={changeHandler}
          />
          <label htmlFor="quantity">تعداد موجودی </label>
          <input
            type="text"
            name="quantity"
            id="quantity"
            placeholder="تعداد موجودی"
            value={form.quantity}
            onChange={changeHandler}
          />
          <label htmlFor="price"> قیمت</label>
          <input
            type="text"
            name="price"
            id="price"
            placeholder=" قیمت"
            value={form.price}
            onChange={changeHandler}
          />
        </div>
        <div className={styles.actions}>
          <button type="submit" className={styles.add}>
            {isEdit ? "ثبت اطلاعات جدید" : "ایجاد"}
          </button>
          <button onClick={cancleHandler} className={styles.cancel}>
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddModal;
