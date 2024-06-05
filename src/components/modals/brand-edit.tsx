import { useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { postBrandSchema } from "@validation";
import { ErrorMessage, Field, Formik, Form } from "formik";
import EditIcon from "@mui/icons-material/Edit";
import useBrandStore from "../../store/brand";
import { getDataFromCookie } from "@token-service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
          color: "#000",
        },
      },
    },
  },
});

interface FormValues {
  brand_name: string;
  brand_description: string;
  image: string;
  position: number;
}

function BasicModal() {
  const [reload, setReload] = useState(false);
  const { updateBrand } = useBrandStore();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues: FormValues = {
    brand_name: "",
    brand_description: "",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUoKV0B7GXf5IHL2fem9xmVrVdGo9pFBTwWA&s",
    position: 1,
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      const res = await updateBrand(values, getDataFromCookie("Id"));
      if (res && res.status === 200) {
        handleClose();
        setReload(!reload);
      }
    } catch (error) {
      console.error("Failed to update brand:", error);
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button onClick={handleOpen}>
          <EditIcon />
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
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
                    fullWidth
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
                    label="Description"
                    placeholder="Description"
                    size="small"
                    fullWidth
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
          </Box>
        </Modal>
      </ThemeProvider>
    </div>
  );
}

export default BasicModal;
