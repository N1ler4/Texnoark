import { Button, TextField } from "@mui/material";
import { signUpSchema } from "@validation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import useAuthStore from "@store";
import { useNavigate } from "react-router-dom";
import { useMask } from "@react-input/mask";

export default function index() {
  const { signup } = useAuthStore();
  const navigate = useNavigate();

  interface Login {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    password: string;
  }

  const initialValues = {
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password: "",
  };

  const inputRef = useMask({
    mask: "+998 (__) ___-__-__",
    replacement: { _: /\d/ },
  });

  const handleSubmit = async (value: Login) => {
    const formattedphone_number = value.phone_number.replace(/[\s()-]/g, "");
    const formattedValues = {
      ...value,
      phone_number: formattedphone_number,
    };
    const res = await signup(formattedValues);
    if (res && res.status === 201) {
      navigate("/");
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center p-5">
      <h2
        className="absolute left-5 top-5 text-[32px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        Back
      </h2>
      <div className="bg-white flex gap-10 flex-col justify-center  items-center max-w-[600px] w-full max-h-[100vh] h-full">
        <h1 className="text-[46px] font-bold">Create new admin</h1>

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
                style={{ width: "400px" }}
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
                style={{ width: "400px" }}
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
                style={{ width: "400px" }}
                inputRef={inputRef}
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
                style={{ width: "400px" }}
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
                style={{ width: "400px" }}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-[#ff0000]"
              />

              <Button variant="outlined" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
