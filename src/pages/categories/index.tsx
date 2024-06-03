import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { Modal } from "@components";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GlobalTable } from "@ui";
import useCategoryStore from "../../store/category";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { postCategorySchema } from "@validation";
import { getDataFromCookie } from "@token-service";

export default function Index() {
  const { postCategory, getCategory , deleteCategory} = useCategoryStore();
  const [data, setData] = useState([]);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#008000",
        light: "#E9DB5D",
        dark: "#355E3B",
        contrastText: "#000",
      },
      secondary: {
        main: "#355E3B",
        light: "#E9DB5D",
        dark: "#D55200",
        contrastText: "#000",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            color: "#FFFFFF",
          },
        },
      },
    },
  });

  const theader = [
    { title: "", name: "id" },
    { title: "Category name", name: "category_name" },
    { title: "action", name: "action" },

  ];

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues = {
    category_name: "",
  };

  const handleSubmit = async (value: any) => {
    const res = await postCategory(value);
    if (res && res.status === 201) {
      handleClose();
    }
  };

  const getData = async () => {
    const res = await getCategory();
    if (res && res.status === 200) {
      setData(res.data.categories);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const deletIdData = async()=>{
    await deleteCategory(getDataFromCookie("categoryId"))

  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="mb-4">
          <Button variant="contained" onClick={handleOpen} color="primary">
            Add Category
          </Button>
        </div>
        <Modal open={open} handleClose={handleClose} title="Add New Category">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={postCategorySchema}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-5">
                <Field
                  type="text"
                  name="category_name"
                  as={TextField}
                  label="Category Name"
                  placeholder="Category Name"
                  size="small"
                  style={{ width: "100%" }}
                />
                <ErrorMessage
                  name="category_name"
                  component="div"
                  className="error"
                />
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Modal>
      </ThemeProvider>
      <GlobalTable theader={theader} tbody={data} deletIdData={deletIdData}/>
    </>
  );
}
