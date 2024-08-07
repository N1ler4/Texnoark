import { useEffect, useState } from "react";
import { Button, Input, Modal, Pagination } from "antd";
import { GlobalTable, Notification } from "@ui";
import useSubCategoryStore from "../../store/sub-category";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { postCategorySchema } from "@validation";
import { deleteDataFromCookie, getDataFromCookie } from "@token-service";
import { useLocation, useNavigate } from "react-router-dom";
import "../style.css"


const { Search } = Input;

export default function Index() {
  const navigate = useNavigate();
  const { postSubCategory, getSubCategory, deleteSubCategory } =
    useSubCategoryStore();
  const [data, setData] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const theader = [
    { title: "", name: "id" },
    { title: "Sub Category name", name: "name" },
    { title: "Action", name: "sub action" },
  ];

  interface postData {
    name: string;
    parent_category_id: any;
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues = {
    name: "",
    parent_category_id: Number(getDataFromCookie("Id")),
  };

  const handleSubmit = async (value: postData) => {
    const res = await postSubCategory(value);
    if (res && res.status === 201) {
      handleClose();
      Notification.success("Success!", "Successfully added category");
      getData(page, searchTerm);
    }
  };

  const getData = async (page: number, search: string) => {
    searchParams.set("page", String(page));
    navigate(`?${searchParams.toString()}`);
    const res = await getSubCategory(10, page, search, getDataFromCookie("Id"));
    console.log(res);
    if (res && res.status === 200) {
      setData(res.data.data.subcategories);
      setTotalItems(res.data.data.count);
    }
  };

  useEffect(() => {
    getData(page, searchTerm);
  }, [page, searchTerm]);

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this sub-category?",
      onOk: async () => {
        await deleteSubCategory(id);
        getData(page, searchTerm);
        deleteDataFromCookie("categoryId");
      },
    });
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <>
      <div className="mb-4 flex justify-between">
        <Button
          type="primary"
          style={{
            backgroundColor: "green",
            color: "white",
            borderColor: "green",
          }}
          onClick={handleOpen}
        >
          Add Sub Category
        </Button>
        <Search
          placeholder="Search sub-categories"
          enterButton="Search"
          size="large"
          style={{ maxWidth: 300, marginBottom: 16 }}
          onSearch={handleSearch}
        />
      </div>
      <Modal
        title="Add New Sub Category"
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
                placeholder="Sub Category Name"
                size="large"
              />
              <ErrorMessage name="name" component="div" className="text-[#ff0000]" />
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

      {totalItems > 10 ? (
        <Pagination
          current={page}
          pageSize={10}
          total={totalItems}
          onChange={handlePageChange}
        />
      ) : (
        console.log("No brands found")
      )}
    </>
  );
}
