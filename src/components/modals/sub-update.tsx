import { useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { postCategorySchema } from "@validation";
import { ErrorMessage, Field, Formik, Form } from "formik";
import EditIcon from "@mui/icons-material/Edit";
import useSubCategoryStore from "../../store/sub-category";
import { getDataFromCookie } from "@token-service";
import Notification from "../ui/notification";

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
          color: "#00",
        },
      },
    },
  },
});

function BasicModal() {
  const { updateSubCategory } = useSubCategoryStore();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues = {
    name: "",
  };
  const handleSubmit = async (value: any) => {
    const res = await updateSubCategory(value, getDataFromCookie("subId"));
    if (res && res.status === 200) {
      handleClose();
      Notification.success("Success!", "Successfully added category");
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
              validationSchema={postCategorySchema}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-5">
                  <Field
                    type="text"
                    name="name"
                    as={TextField}
                    label="Sub Category Name"
                    placeholder="Sub Category Name"
                    size="small"
                    style={{ width: "100%" }}
                  />
                  <ErrorMessage name="name" component="div" className="text-[#ff0000]" />
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
