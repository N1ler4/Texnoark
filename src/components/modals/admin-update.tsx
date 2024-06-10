import { useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { signUpSchema } from "@validation";
import { ErrorMessage, Field, Formik, Form } from "formik";
import EditIcon from "@mui/icons-material/Edit";
import useAuthStore from "@store";
import { getDataFromCookie } from "@token-service";
import {Notification} from "@ui";

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
      main: "#00800",
      light: "#E9DB5D",
      dark: "#355E3B",
      contrastText: "#fff",
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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {updateadmin} = useAuthStore()

  interface update {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    password: string;
  }

  const initialValues : update = {
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
  };
  const handleSubmit = async (value: any) => {
    console.log(value.id)
    const res = await updateadmin(value, Number(getDataFromCookie("admin-id")));
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
              validationSchema={signUpSchema}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-5">
                  <Field
                    type="text"
                    name="first_name"
                    as={TextField}
                    label="Name"
                    placeholder="Name"
                    size="small"
                  />
                  <ErrorMessage
                    name="first_name"
                    component="div"
                    className="text-[#ff0000]"
                  />
                  <Field
                    type="text"
                    name="last_name"
                    as={TextField}
                    label="Surname"
                    placeholder="Surname"
                    size="small"
                  />
                  <ErrorMessage
                    name="last_name"
                    component="div"
                    className="text-[#ff0000]"
                  />
                  <Field
                    type="text"
                    name="phone_number"
                    as={TextField}
                    label="Phone Number"
                    placeholder="Phone Number"
                    size="small"
                  />
                  <ErrorMessage
                    name="phone_number"
                    component="div"
                    className="text-[#ff0000]"
                  />
                  <Field
                    type="email"
                    name="email"
                    as={TextField}
                    label="Email"
                    placeholder="Email"
                    size="small"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-[#ff0000]"
                  />

                  <Field
                    type="password"
                    name="password"
                    as={TextField}
                    label="Password"
                    placeholder="Password"
                    size="small"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-[#ff0000]"
                  />

                  <Button
                    variant="outlined"
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
