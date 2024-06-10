import { useEffect, useState } from "react";
import {
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { postBrandSchema } from "@validation";
import { ErrorMessage, Field, Formik, Form } from "formik";
import EditIcon from "@mui/icons-material/Edit";
import useBrandStore from "../../store/brand";
import { getDataFromCookie } from "@token-service";
import { Select, Button, Input, Modal } from "antd";
import { Button as MuiButton } from "@mui/material";
import useCategoryStore from "../../store/category";




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
  const [reload, setReload] = useState(false);
  const { updateBrand } = useBrandStore();
  const { getCategory } = useCategoryStore();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState([]);
  console.log(category);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues = {
    name: "",
    description: "",
    category_id: null,
  };

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("category_id", values.category_id);
    try {
      console.log("FormData:", formData);
      const res = await updateBrand(formData, getDataFromCookie("brandId"));
      if (res && res.status === 201) {
        handleClose();
        setReload(!reload);
      }
    } catch (error) {
      console.error("Failed to post brand:", error);
    }
  };

  const getCategoryId = async () => {
    try {
      const res = await getCategory(100, 1, "");
      if (res && res.status === 200) {
        setCategory(res.data.data.categories);
      }
    } catch (error) {
      console.error("Failed to get categories:", error);
    }
  };
  useEffect(() => {
    getCategoryId();
  }, [reload]);

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
            validationSchema={postBrandSchema}
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
                <Field
                  type="text"
                  name="description"
                  as={Input}
                  placeholder="Brand Description"
                  size="large"
                  style={{ width: "100%" }}
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-[#ff0000]"
                />
                <Field name="category_id">
                  {({ field }: any) => (
                    <Select
                      {...field}
                      onChange={(value) => setFieldValue("category_id", value)}
                      placeholder="Choose a category"
                      size="large"
                      style={{ width: "100%" }}
                    >
                      {category.map((item: any) => (
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
