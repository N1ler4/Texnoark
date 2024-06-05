import { useState, useEffect } from "react";
import { Button, Input, Modal, Select, Upload, message } from "antd";
import { GlobalTable } from "@ui";  
import useBrandStore from "../../store/brand";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { postBrandSchema } from "@validation";
import { deleteDataFromCookie, getDataFromCookie } from "@token-service";
import { ConfirmModal } from "@components"; 
import useCategoryStore from "../../store/category";
import { UploadOutlined } from "@ant-design/icons";

export default function Index() {
  const { postBrand, getBrand, deleteBrand } = useBrandStore();
  const [data, setData] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState<any[]>([]);
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
    file: null,
    category_id: null,
  };

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("category_id", values.category_id);
    
    console.log("File field:", values.file);
  
    if (values.file) {
      formData.append("file", values.file);
    }
  
    try {
      console.log("FormData:", formData);
      const res = await postBrand(formData);
      if (res && res.status === 201) {
        handleClose();
        setReload(!reload);
        message.success("Brand added successfully");
      }
    } catch (error) {
      console.error("Failed to post brand:", error);
      message.error("Failed to add brand");
    }
  };

  const getCategoryId = async () => {
    try {
      const res = await getCategory(10, 1);
      if (res && res.status === 200) {
        setCategoryId(res.data.data);
      }
    } catch (error) {
      console.error("Failed to get categories:", error);
    }
  };

  const getData = async () => {
    try {
      const res = await getBrand(10, 1);
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
      const res = await deleteBrand(getDataFromCookie("BrandId"));
      if (res && res.status === 200) {
        setReload(!reload);
        setConfirmOpen(false);
        deleteDataFromCookie("BrandId");
        message.success("Brand deleted successfully");
      }
    } catch (error) {
      console.error("Failed to delete brand:", error);
      message.error("Failed to delete brand");
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
          {({ isSubmitting, setFieldValue }) => (
            <Form className="flex flex-col gap-5">
              <Field
                type="text"
                name="name"
                as={Input}
                placeholder="Brand Name"
                size="large"
                style={{ width: "100%" }}
              />
              <ErrorMessage name="name" component="div" className="error" />
              <Field
                type="text"
                name="description"
                as={Input}
                placeholder="Brand Description"
                size="large"
                style={{ width: "100%" }}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="error"
              />
              <Field name="category_id">
                {({ field }: any) => (
                  <Select
                    {...field}
                    onChange={(value) => setFieldValue("category_id", value)}
                    placeholder="Choose a category"
                    size="large"
                    style={{ width: "100%" }}
                  >
                    {categoryId.map((item: any) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Field>
              <ErrorMessage
                name="category_id"
                component="div"
                className="error"
              />
              <Field name="file">
                {({ field }: any) => (
                  <Upload
                    {...field}
                    beforeUpload={(file) => {
                      setFieldValue("file", file);
                      return false;
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                )}
              </Field>
              <ErrorMessage name="file" component="div" className="error" />
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
        message="Are you sure you want to delete this brand?"
      />
      <GlobalTable
        theader={theader}
        tbody={data}
        deletIdData={() => setConfirmOpen(true)}
      />
    </>
  );
}
