import { useEffect, useState } from "react";
import { Button, Input, Modal } from "antd";
import { GlobalTable } from "@ui";
import useCategoryStore from "../../store/category";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { postCategorySchema } from "@validation";
import { deleteDataFromCookie } from "@token-service";

export default function Index() {
  const { postCategory, getCategory, deleteCategory } = useCategoryStore();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const theader = [
    { title: "", name: "id" },
    { title: "Category name", name: "name" },
    { title: "Action", name: "action" },
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues = {
    name: "",
  };

  const handleSubmit = async (value: any) => {
    const res = await postCategory(value);
    if (res && res.status === 201) {
      handleClose();
      getData();
    }
  };

  const getData = async () => {
    const res = await getCategory(10 , 1);
    console.log(res)
    if (res && res.status === 200) {
      setData(res.data.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this category?",
      onOk: async () => {
        await deleteCategory(id);
        getData();  
        deleteDataFromCookie("categoryId")
      },
    });
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
          Add Category
        </Button>
      </div>
      <Modal
        title="Add New Category"
        visible={open}
        onCancel={handleClose}
        footer={null}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={postCategorySchema}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-5">
              <Field
                name="name"
                as={Input}
                placeholder="Category Name"
                size="large"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="error"
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
      </Modal>
      <GlobalTable theader={theader} tbody={data} deletIdData={handleDelete} />
    </>
  );
}
