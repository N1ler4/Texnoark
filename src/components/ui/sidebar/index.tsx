import React, { useState } from "react";
import { Button, Drawer, Input, } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { postProductSchema2 } from "@validation";
import { getDataFromCookie } from "@token-service";
import { Notification } from "@ui";
import useProductDetailStore from "../../../store/product-detail";

interface FormValues {
  quantity: number;
  description: string;
  discount: number;
  colors: string;
  product_id: any;
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
    quantity: 0,
    description: "",
    discount: 0,
    colors: "",
    product_id: Number(getDataFromCookie("productId")),
  };

  const handleSubmit = async (values: FormValues) => {
    try {
      const res = await postProductDetail(values);
      if (res && res.status === 201) {
        Notification.success("Success!", "Product added successfully");
        onClose();
        window.location.reload()
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
          {({ isSubmitting }) => (
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
