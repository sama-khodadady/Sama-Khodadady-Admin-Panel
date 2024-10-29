import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { setCookie } from "utils/cookie";
import { useLogin } from "hooks/mutation";
import { useAuth } from "context/AuthContext";
import { nameValidation, passwordValidation } from "constants/validation";

import styles from "./LoginForm.module.css";

function LoginForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const { setUsername } = useAuth();

  const { mutate } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //form inputs change handler
  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setForm((form) => ({ ...form, [name]: value }));
  };
  //handle user login process
  const loginHandler = async () => {
    if (!form.username || !form.password) return;
    if (errors.username || errors.password) return;
    mutate(form, {
      onSuccess: (data) => {
        setUsername(JSON.parse(data.config.data).username);
        setCookie("token", data.data?.token);
        toast.success("ورود با موفقیت انجام شد");
        navigate("/admin");
      },
      onError: (error) => {
        if (error?.code === "ERR_NETWORK") {
          toast.error(
            "خطایی در اتصال به سرور رخ داده است!لطفا اتصال اینترنت خود را چک کرده و دوباره تلاش کنید"
          );
        }
        if (error?.status)
          toast.error("نام کاربری یا رمز عبور شما نامعتبر است!");
      },
    });
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginHeader}>
        <img src="/logo.svg" alt="logo" />
        <h3>فرم ورود</h3>
      </div>
      <form
        onSubmit={handleSubmit(loginHandler)}
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
        </div>
        <button type="submit">ورود</button>
        <Link to="/signup">ایجاد حساب کاربری!</Link>
      </form>
    </div>
  );
}

export default LoginForm;
