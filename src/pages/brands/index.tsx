import { useState, useEffect } from "react";
import { Button, Input, Modal, Select } from "antd";
import { GlobalTable } from "@ui";
import useBrandStore from "../../store/brand";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { postBrandSchema } from "@validation";
import { deleteDataFromCookie, getDataFromCookie } from "@token-service";
import { ConfirmModal } from "@components";
import useCategoryStore from "../../store/category";

export default function Index() {
  const { postBrand, getBrand, deleteBrand } = useBrandStore();
  const [data, setData] = useState([]);
  const [categoryId, setCategoryId] = useState<any>([]);
  console.log(categoryId);
  const [reload, setReload] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { getCategory } = useCategoryStore();

  const theader = [
    { title: "", name: "id" },
    { title: "Brand name", name: "name" },
    { title: "Brand description", name: "description" },
    { title: "Action", name: "brand action" },
  ];

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues = {
    name: "",
    description: "",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUoKV0B7GXf5IHL2fem9xmVrVdGo9pFBTwWA&s",
    category_id : ""
  };

  const handleSubmit = async (value: any) => {
    try {
      const res = await postBrand(value);
      if (res && res.status === 201) {
        handleClose();
        setReload(!reload);
      }
    } catch (error) {
      console.error("Failed to post brand:", error);
    }
  };

  const getCategoryId = async () => {
    const res = await getCategory(10, 1);
    console.log(res);
    if (res && res.status === 200) {
      setCategoryId(res.data.data);
    }
  };

  const getData = async () => {
    try {
      const res = await getBrand(10, 1);
      console.log(res);
      if (res && res.status === 200) {
        setData(res.data.data);
      }
    } catch (error) {
      console.error("Failed to get brands:", error);
    }
  };

  useEffect(() => {
    getData();
    getCategoryId();
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
              <Field
                type="text"
                name="category_id"
                as={Select}
                placeholder="Choose a category"
                size="large"
                style={{ width: "100%" }}
              >
                {
                  categoryId.map((item:any) => (
                    <Select.Option value={item.id}>{item.name}</Select.Option>
                  ))
                }
              </Field>
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
