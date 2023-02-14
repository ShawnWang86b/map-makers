import * as Yup from "yup";
const LoginValidator = Yup.object().shape({
  email: Yup.string()
    .email()
    .max(50, "please input a valid email")
    .required("Required"),
  password: Yup.string().required("Required"),
});

export default LoginValidator;
