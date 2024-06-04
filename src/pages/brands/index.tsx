import { useState, useEffect } from "react";
import { Button, Input, Modal } from "antd";
import { GlobalTable } from "@ui";
import useBrandStore from "../../store/brand";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { postBrandSchema } from "@validation";
import { deleteDataFromCookie, getDataFromCookie } from "@token-service";
import { ConfirmModal } from "@components";

export default function Index() {
  const { postBrand, getBrand, deleteBrand } = useBrandStore();
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

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
        setReload(!reload); // Trigger reload
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

  const handleDelete = async () => {
    try {
      const res = await deleteBrand(getDataFromCookie("Id"));
      if (res && res.status === 200) {
        setReload(!reload);
        setConfirmOpen(false);
        deleteDataFromCookie("BrandId");
      }
    } catch (error) {
      console.error("Failed to delete brand:", error);
    }
  };

  return (
    <>
      <div className="mb-4">
        <Button
          type="primary"
          style={{
            backgroundColor: "green",
            color: "white",
            borderColor: "green",
          }}
          onClick={handleOpen}
        >
          Add Brand
        </Button>
      </div>
      <Modal
        title="Add New Brand"
        visible={open}
        onCancel={handleClose}
        footer={null}
      >
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
                as={Input}
                placeholder="Brand Name"
                size="large"
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
                as={Input}
                placeholder="Brand Description"
                size="large"
                style={{ width: "100%" }}
              />
              <ErrorMessage
                name="brand_description"
                component="div"
                className="error"
              />
              <Button type="primary" htmlType="submit" loading={isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>
      <ConfirmModal
        visible={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete brand?"
      />
      <GlobalTable
        theader={theader}
        tbody={data}
        deletIdData={() => setConfirmOpen(true)}
      />
    </>
  );
}
