import { useEffect, useState } from "react";
import { createTheme, ThemeProvider, Button as MuiButton } from "@mui/material";
import { stockSchema } from "@validation";
import { ErrorMessage, Field, Formik, Form } from "formik";
import EditIcon from "@mui/icons-material/Edit";
import {
  getDataFromCookie,
  saveDataToCookie,
} from "@token-service";
import useCategoryStore from "../../store/category";
import useBrandStore from "../../store/brand";
import useProductStore from "../../store/product";
import { Input, Select, Button, Modal } from "antd";
import useStockStore from "../../store/stock";
import Notification from "../ui/notification";

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
  quantity: number;
  category_id: number;
  product_id: number;
  brand_id: number;
}

const initialValues: FormValues = {
    category_id: 0,
    brand_id: 0,
    product_id: 0,
    quantity: 0,
};

function BasicModal() {
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState<any[]>([]);
  const [brandId, setBrandId] = useState<any[]>([]);
  const [brandCategoryId, setBrandCategoryId] = useState<any[]>([]);
  const { getCategory } = useCategoryStore();
  const { getBrand } = useBrandStore();
  const {getProduct} = useProductStore();
  const [reload, setReload] = useState(false);
  const { updateStock } = useStockStore();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (values: FormValues) => {
    try {
      const res = await updateStock(values, getDataFromCookie("stockId"));
      if (res && res.status === 200) {
        handleClose();
      Notification.success("Success!", "Successfully added category");
      }
    } catch (error) {
      console.error("Failed to update stock", error);
    }
  };


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
      const response3 = await getProduct(100, 1, "");
      if (response3 && response3.status === 200) {
        console.log(response3);
        setBrandCategoryId(response3?.data?.data?.products);
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
          title="Update Stock"
          visible={open}
          onCancel={handleClose}
          footer={null}
        >
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={stockSchema}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form className="flex flex-col gap-5">
                <Field name="brand_id">
                  {({ field }: any) => (
                    <Select
                      {...field}
                      onChange={(value) => {
                        setFieldValue("brand_id", value);
                        saveDataToCookie("brand_id", value);
                        setReload(!reload);
                      }}
                      value={values.brand_id || undefined}
                      placeholder="Choose a brand"
                      size="large"
                      allowClear
                      style={{ width: "100%" }}
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option && option.children
                          ? option.children
                              .toString()
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) !== -1
                          : false
                      }
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
                  className="text-red-700"
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
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option && option.children
                          ? option.children
                              .toString()
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) !== -1
                          : false
                      }
                    >
                      {categoryId?.map((item: any) => (
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
                  className="text-red-700"
                />
                <Field name="product_id">
                  {({ field }: any) => (
                    <Select
                      {...field}
                      onChange={(value) => setFieldValue("product_id", value)}
                      value={values.product_id || undefined}
                      placeholder="Choose a brand product..."
                      size="large"
                      allowClear
                      style={{ width: "100%" }}
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option && option.children
                          ? option.children
                              .toString()
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) !== -1
                          : false
                      }
                    >
                      {brandCategoryId?.map((item: any) => (
                        <Select.Option key={item.id} value={item.id}>
                          {item.name}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Field>
                <ErrorMessage
                  name="product_id"
                  component="div"
                  className="text-red-700"
                />
                <Field
                  type="number"
                  name="quantity"
                  as={Input}
                  placeholder="Quantity"
                  size="large"
                />
                <ErrorMessage
                  name="quantity"
                  component="div"
                  className="text-red-700"
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
