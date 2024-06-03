import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { Modal } from "@components";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GlobalTable } from "@ui";
import useBrandStore from "../../store/brand";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { postBrandSchema } from "@validation";
import { getDataFromCookie } from "@token-service";

export default function Index() {
  const { postBrand, getBrand, deleteBrand } = useBrandStore();
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);

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
    { title: "Brand name", name: "brand_name" },
    { title: "Brand description", name: "brand_description" },
    { title: "Action", name: "brand action" },
  ];

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues = {
    brand_name: "",
    brand_description: "",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUoKV0B7GXf5IHL2fem9xmVrVdGo9pFBTwWA&s",
    position: 1,
  };

  const handleSubmit = async (value: any) => {
    try {
      const res = await postBrand(value);
      if (res && res.status === 201) {
        handleClose();
        getData();
        setReload(!reload);
      }
    } catch (error) {
      console.error("Failed to post brand:", error);
    }
  };

  const getData = async () => {
    try {
      const res = await getBrand();
      if (res && res.status === 200) {
        setData(res.data.brands);
      }
    } catch (error) {
      console.error("Failed to get brands:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [reload]);

  const deletIdData = async () => {
    try {
      const res = await deleteBrand(getDataFromCookie("BrandId"));
      if (res && res.status === 201) {
        getData();
        setReload(!reload);
      }
    } catch (error) {
      console.error("Failed to delete brand:", error);
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="mb-4">
          <Button variant="contained" onClick={handleOpen} color="primary">
            Add Brand
          </Button>
        </div>
        <Modal open={open} handleClose={handleClose} title="Add New Brand">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={postBrandSchema}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-5">
                <Field
                  type="text"
                  name="brand_name"
                  as={TextField}
                  label="Brand Name"
                  placeholder="Brand Name"
                  size="small"
                  style={{ width: "100%" }}
                />
                <ErrorMessage
                  name="brand_name"
                  component="div"
                  className="error"
                />
                <Field
                  type="text"
                  name="brand_description"
                  as={TextField}
                  label="Brand Description"
                  placeholder="Brand Description"
                  size="small"
                  style={{ width: "100%" }}
                />
                <ErrorMessage
                  name="brand_description"
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
      <GlobalTable theader={theader} tbody={data} deletIdData={deletIdData} />
    </>
  );
}
