//username validation in registration & login form
const nameValidation = {
  required: "لطفا نام کاربری خود را وارد کنید!",
  pattern: {
    value: /^[0-9A-Za-z]{6,16}$/,
    message:
      "نام کاربری باید بین 6-16 رقم و ترکیب از اعداد و حروف انگلیسی باشد",
  },
};

//userpassword validation in registration & login form
const passwordValidation = {
  required: "لطفا رمز خود را وارد کنید!",
  pattern: {
    value: /^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[^0-9A-Za-z]).{8,12}$/,
    message:
      "رمز شما باید بین 8-12 رقم و ترکیبی از حروف کوچک و بزرگ و کاراکتر خاص !،@،$،&،* باشد",
  },
};

//userpassword confirm validation in registration 
const confirmPasswordvalidation = (getValues) => ({
  required: "لطفا رمز خود را تکرار کنید!",
  validate: (value) =>
    value === getValues("password") || "رمز های وارد شده با هم مطابقت ندارند!",
});

export { nameValidation, passwordValidation, confirmPasswordvalidation };
