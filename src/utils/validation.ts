import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  phone_number: Yup.string().min(13, "Too Short!").required("Please enter a phone number"),
  password: Yup.string().min(6, "Too Short!").required("Please enter a password"),
});
export const signUpSchema = Yup.object().shape({
  email: Yup.string().min(4, "Too Short!").required("Please enter an email address"),
  first_name: Yup.string().required("Please enter your first name"),
  phone_number: Yup.string().min(13).required("Please enter a phone number"),
  last_name: Yup.string().required("Please enter your last name"),
  password: Yup.string().min(6, "Too Short!").required("Please enter a password"),
});
export const postCategorySchema = Yup.object().shape({
  name: Yup.string().required("Please enter name"),
  // parent_category_id: Yup.number().required("Required"),
  // positon: Yup.number().required("Required"),
});
export const postBrandSchema = Yup.object().shape({
  name: Yup.string().required("Please enter name"),
  description: Yup.string().required("Please enter description"),
  category_id: Yup.string().required("Please enter category"),
});

export const postProductSchema2 = Yup.object().shape({
  quantity: Yup.number().required("Please enter quantity"),
  description: Yup.string().required("Please enter description"),
  discount: Yup.number().required("Please enter discount"),
  colors: Yup.string().required("Please enter color"),
});

export const postProductSchema = Yup.object().shape({
  name: Yup.string().required("Please enter name"),
  price: Yup.number().required("Please enter price"),
})

