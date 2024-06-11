import { Button, TextField } from "@mui/material";
import { loginSchema } from "@validation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import useAuthStore from "@store";
import { useNavigate } from "react-router-dom";
import { useMask } from "@react-input/mask";

export default function index() {
  const { signin } = useAuthStore();
  const navigate = useNavigate();

  interface Login {
    phone_number: string;
    password: string;
  }

  const inputRef = useMask({
    mask: "+998 (__) ___-__-__",
    replacement: { _: /\d/ },
  });

  const initialValues = {
    phone_number: "",
    password: "",
  };

  const handleSubmit = async (value: Login) => {
    const formattedphone_number = value.phone_number.replace(/[\s()-]/g, "");
    const formattedValues = {
      ...value,
      phone_number: formattedphone_number,
    };
    const res = await signin(formattedValues);
    if (res && res.status === 201) {
      navigate("/main");
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center p-5">
      <div className="bg-white flex gap-10 flex-col justify-center  items-center max-w-[600px] w-full max-h-[400px] h-full">
        <h1 className="text-[46px] font-bold">Login</h1>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={loginSchema}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-5">
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
        <span
          className="text-blue-700 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Add new admin
        </span>
      </div>
    </div>
  );
}
