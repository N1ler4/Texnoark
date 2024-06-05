import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  PhoneNumber: Yup.string().min(13, "Too Short!").required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
});
export const signUpSchema = Yup.object().shape({
  email: Yup.string().min(4, "Too Short!").required("Required"),
  first_name: Yup.string().required("Required"),
  phone_number: Yup.string().min(13).required("Required"),
  last_name: Yup.string().required("Required"),
  password: Yup.string().min(6, "Too Short!").required("Required"),
});
export const postCategorySchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  // parent_category_id: Yup.number().required("Required"),
  // positon: Yup.number().required("Required"),
});
export const postBrandSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  file: Yup.string().required("Required"),
  category_id: Yup.string().required("Required"),
});
