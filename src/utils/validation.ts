import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().min(4, "Too Short!").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
});
