import React, { useState } from "react";
import { Button, Drawer, Input, Upload } from "antd";
import { PlusCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { postProductSchema2 } from "@validation";
import { getDataFromCookie } from "@token-service";
import { Notification } from "@ui";
import useProductDetailStore from "../../../store/product-detail";

interface FormValues {
  quantity: string;
  description: string;
  discount: string;
  colors: string;
  product_id: any;
  files: File[];
}

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { postProductDetail } = useProductDetailStore();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const initialValues: FormValues = {
    quantity: "",
    description: "",
    discount: "",
    colors: "",
    product_id: getDataFromCookie("productId") || "",
    files: [],
  };

  const handleSubmit = async (values: FormValues) => {
    const productId = getDataFromCookie("productId") || "";
    const formData = new FormData();
    formData.append("quantity", values.quantity);
    formData.append("description", values.description);
    formData.append("discount", values.discount);
    formData.append("colors", values.colors);
    formData.append("product_id", productId);

    values.files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const res = await postProductDetail(formData);
      if (res && res.status === 201) {
        Notification.success("Success!", "Product added successfully");
        onClose();
      }
    } catch (error) {
      Notification.error("Error!", `${error}`);
    }
  };

  return (
    <>
      <Button onClick={showDrawer}>
        <PlusCircleOutlined className="text-[24px] border-none" />
      </Button>
      <Drawer
        title="Add Product Details"
        onClose={onClose}
        open={open}
        className="pt-[60px]"
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={postProductSchema2}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="flex flex-col gap-5">
              <Field
                type="number"
                name="quantity"
                as={Input}
                placeholder="Quantity"
              />
              <ErrorMessage
                name="quantity"
                component="div"
                className="text-[#ff0000] mt-0"
              />
              <Field
                type="text"
                name="description"
                as={Input}
                placeholder="Description"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-[#ff0000]"
              />
              <Field
                type="number"
                name="discount"
                as={Input}
                placeholder="Discount"
              />
              <ErrorMessage
                name="discount"
                component="div"
                className="text-[#ff0000]"
              />
              <Field type="text" name="colors" as={Input} placeholder="Color" />
              <ErrorMessage
                name="colors"
                component="div"
                className="text-[#ff0000]"
              />
              <Field name="files">
                {({ field }: any) => (
                  <Upload
                    {...field}
                    multiple
                    beforeUpload={(file) => {
                      setFieldValue(
                        "files",
                        field.value ? [...field.value, file] : [file]
                      );
                      return false;
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                )}
              </Field>
              <ErrorMessage
                name="files"
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
      </Drawer>
    </>
  );
};

export default App;
