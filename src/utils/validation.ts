import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().min(4, "Too Short!").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
});
export const signUpSchema = Yup.object().shape({
    email: Yup.string().min(4, "Too Short!").required("Required"),
    first_name: Yup.string().required("Required"),
    phone_number: Yup.string().min(13).required("Required"),
    last_name: Yup.string().required("Required"),
    password: Yup.string().min(6, "Too Short!").required("Required"),
  });