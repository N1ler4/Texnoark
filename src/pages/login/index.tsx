import { Button, TextField } from "@mui/material";
import { loginSchema } from "@validation";
import { ErrorMessage, Field, Form, Formik } from "formik";

export default function index() {
  const initialValues = {};
  const handleSubmit = () => {};

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
                type="email"
                name="email"
                as={TextField}
                label="Email"
                placeholder="Email"
                size="small"
                style={{ width: "400px" }}
              />
              <ErrorMessage name="email" component="div" className="error" />

              <Field
                type="password"
                name="password"
                as={TextField}
                label="Password"
                placeholder="Password"
                size="small"
                style={{ width: "400px" }}
              />
              <ErrorMessage name="password" component="div" className="error" />

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
