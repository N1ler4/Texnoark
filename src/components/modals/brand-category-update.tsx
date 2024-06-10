import { useEffect, useState } from "react";
import { createTheme, ThemeProvider, Button as MuiButton } from "@mui/material";
import { postCategorySchema } from "@validation";
import { ErrorMessage, Field, Formik, Form } from "formik";
import EditIcon from "@mui/icons-material/Edit";
import useBrandCategoryStore from "../../store/brand-category";
import { getDataFromCookie } from "@token-service";
import useBrandStore from "../../store/brand";
import { Select, Modal, Input, Button } from "antd";

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

function BasicModal() {
  const { updateBrandCategory } = useBrandCategoryStore();
  const { getBrand } = useBrandStore();
  const [brands, setBrands] = useState([]);
  console.log(brands);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues = {
    name: "",
    brand_id: "",
  };

  const handleSubmit = async (values: any) => {
    const res = await updateBrandCategory(
      values,
      getDataFromCookie("brandCategoryId")
    );
    if (res && res.status === 200) {
      handleClose();
    }
  };

  const fetchBrands = async () => {
    const res = await getBrand(100, 1, "");
    if (res && res.status === 200) {
      setBrands(res.data.data.brands);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <MuiButton onClick={handleOpen}>
          <EditIcon />
        </MuiButton>
        <Modal
          title="Update Brand"
          visible={open}
          onCancel={handleClose}
          footer={null}
        >
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={postCategorySchema}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="flex flex-col gap-5">
                <Field
                  type="text"
                  name="name"
                  as={Input}
                  placeholder="Brand Name"
                  size="large"
                  style={{ width: "100%" }}
                />
                <ErrorMessage name="name" component="div" className="text-[#ff0000]" />
                <Field name="brand_id">
                  {({ field }: any) => (
                    <Select
                      {...field}
                      onChange={(value) => setFieldValue("brand_id", value)}
                      placeholder="Choose a brand"
                      size="large"
                      style={{ width: "100%" }}
                    >
                      {brands.map((item: any) => (
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
