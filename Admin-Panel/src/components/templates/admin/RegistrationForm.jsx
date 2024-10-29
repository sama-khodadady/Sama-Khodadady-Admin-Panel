import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { useRegister } from "hooks/mutation";
import {
  confirmPasswordvalidation,
  nameValidation,
  passwordValidation,
} from "constants/validation";

import styles from "./RegistrationForm.module.css";

function RegistrationForm() {
  const navigate = useNavigate();
  const { mutate } = useRegister();
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  //input change handler
  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm((form) => ({ ...form, [name]: value }));
  };
  //handler user registration processs
  const registerHandler = async () => {
    if (!form.username || !form.password || !form.confirmPassword) return;
    if (errors.username || errors.password || errors.confirmPassword) return;

    mutate(form, {
      onSuccess: () => {
        toast.success("ثبت نام با موفقیت انجام شد");
        navigate("/login");
      },
      onError: (error) => {
        if (error?.code === "ERR_NETWORK") {
          toast.error(
            "خطایی در اتصال به سرور رخ داده است!لطفا اتصال اینترنت خود را چک کرده و دوباره تلاش کنید"
          );
        } else if (error?.response.status === 400) {
          toast.error("شما از قبل ثبت نام کرده اید لطفا وارد اکانت خود شوید!");
        }
      },
    });
  };
  return (
    <div className={styles.signup}>
      <div className={styles.signupHeader}>
        <img src="/logo.svg" alt="logo" />
        <h3>فرم ثبت نام</h3>
      </div>
      <form
        onSubmit={handleSubmit(registerHandler)}
        onChange={changeHandler}
        className={styles.form}
      >
        <div>
          <input
            type="text"
            placeholder="نام کاربری"
            {...register("username", nameValidation)}
          />
          {errors.username && <span>{errors.username?.message}</span>}
          <input
            type="text"
            placeholder="رمز عبور"
            {...register("password", passwordValidation)}
          />
          {errors.password && <span>{errors.password?.message}</span>}

          <input
            type="text"
            placeholder="تکرار رمز عبور"
            {...register(
              "confirmPassword",
              confirmPasswordvalidation(getValues)
            )}
          />
          {errors.confirmPassword && (
            <span>{errors.confirmPassword?.message}</span>
          )}
        </div>
        <button type="submit">ثبت نام</button>
        <Link to="/login">حساب کاربری دارید؟ </Link>
      </form>
    </div>
  );
}

export default RegistrationForm;
