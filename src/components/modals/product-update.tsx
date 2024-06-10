import { useEffect, useState } from "react";
import { createTheme, ThemeProvider, Button as MuiButton } from "@mui/material";
import { postProductSchema } from "@validation";
import { ErrorMessage, Field, Formik, Form } from "formik";
import EditIcon from "@mui/icons-material/Edit";
import { deleteDataFromCookie, getDataFromCookie, saveDataToCookie } from "@token-service";
import useCategoryStore from "../../store/category";
import useBrandStore from "../../store/brand";
import useProductStore from "../../store/product";
import { Input, Select, Button, Modal } from "antd";

const theme = createTheme({
  palette: {
    primary: {
      main: "#008000",
      light: "#E9DB5D",
      dark: "#355E3B",
      contrastText: "#fff",
    },
    secondary: {
      main: "#355E3B",
      light: "#E9DB5D",
      dark: "#D55200",
      contrastText: "#fff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#00",
        },
      },
    },
  },
});

interface FormValues {
  name: string;
  price: number;
  category_id: string;
  brand_category_id: string;
  brand_id: string;
}

const initialValues: FormValues = {
  name: "",
  price: 0,
  category_id: "",
  brand_category_id: "",
  brand_id: "",
};

function BasicModal() {
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState<any[]>([]);
  const [brandId, setBrandId] = useState<any[]>([]);
  const [brandCategoryId, setBrandCategoryId] = useState<any[]>([]);
  const { getCategory } = useCategoryStore();
  const { getBrand, getSingleBrand } = useBrandStore();
  const { updateProduct } = useProductStore();
  const [reload, setReload] = useState(false); 


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (values: FormValues) => {
    try {
      const res = await updateProduct(values, getDataFromCookie("productId"));
      if (res && res.status === 200) {
        handleClose();
        deleteDataFromCookie("brand_id")
      }
    } catch (error) {
      console.error("Failed to update product", error);
    }
  };

  const Id = Number(getDataFromCookie("brand_id"));

  const getData = async () => {
    try {
      const response = await getCategory(100, 1, "");
      if (response && response.status === 200) {
        setCategoryId(response.data.data.categories);
      }
      const response2 = await getBrand(100, 1, "");
      if (response2 && response2.status === 200) {
        setBrandId(response2.data.data.brands);
      }
      const response3 = await getSingleBrand(Id, 100, 1);
      if (response3 && response3.status === 200) {
        setBrandCategoryId(response3?.data?.data?.brandCategories);
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <MuiButton onClick={handleOpen}>
          <EditIcon />
        </MuiButton>
        <Modal
          title="Add New Product"
          visible={open}
          onCancel={handleClose}
          footer={null}
        >
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={postProductSchema}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form className="flex flex-col gap-5">
                <Field
                  name="name"
                  as={Input}
                  placeholder="Product Name"
                  size="large"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-[#ff0000]"
                />
                <Field
                  type="number"
                  name="price"
                  as={Input}
                  placeholder="Price"
                  size="large"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-[#ff0000]"
                />
                <Field name="brand_id">
                  {({ field }: any) => (
                    <Select
                      {...field}
                      onChange={(value) => {
                        setFieldValue("brand_id", value);
                        saveDataToCookie("brand_id", value);
                        console.log(value)
                        setReload(!reload);
                      }}
                      value={values.brand_id || undefined}
                      placeholder="Choose a brand"
                      size="large"
                      allowClear
                      style={{ width: "100%" }}
                    >
                      {brandId?.map((item: any) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Field>
                <ErrorMessage
                  name="brand_id"
                  component="div"
                  className="text-[#ff0000]"
                />
                <Field name="category_id">
                  {({ field }: any) => (
                    <Select
                      {...field}
                      onChange={(value) => setFieldValue("category_id", value)}
                      value={values.category_id || undefined}
                      placeholder="Choose a category"
                      size="large"
                      allowClear
                      style={{ width: "100%" }}
                    >
                      {categoryId.map((item: any) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Field>
                <ErrorMessage
                  name="category_id"
                  component="div"
                  className="text-[#ff0000]"
                />
                <Field name="brand_category_id">
                  {({ field }: any) => (
                    <Select
                      {...field}
                      onChange={(value) =>
                        setFieldValue("brand_category_id", value)
                      }
                      value={values.brand_category_id || undefined}
                      placeholder="Choose a brand category"
                      size="large"
                      allowClear
                      style={{ width: "100%" }}
                    >
                      {brandCategoryId.map((item: any) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Field>
                <ErrorMessage
                  name="brand_category_id"
                  component="div"
                  className="text-[#ff0000]"
                />
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isSubmitting}
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    borderColor: "green",
                  }}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Modal>
      </ThemeProvider>
    </div>
  );
}

export default BasicModal;
