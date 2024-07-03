import { useEffect, useState } from "react";
import { Button, Input, Modal, Pagination } from "antd";
import { GlobalTable, Notification } from "@ui";
import useBrandCategoryStore from "../../store/brand-category";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { postCategorySchema } from "@validation";
import { deleteDataFromCookie, getDataFromCookie } from "@token-service";
import { useSearchParams } from "react-router-dom";
const { Search } = Input;
import "../style.css"


interface PostData {
  name: string;
  brand_id: number;
}

const Index: React.FC = () => {
  const { postBrandCategory, getBrandCategory, deleteBrandCategory } =
    useBrandCategoryStore();
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const theader = [
    { title: "", name: "id" },
    { title: "Brand Category name", name: "name" },
    { title: "Action", name: "brandcategory action" },
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues: PostData = {
    name: "",
    brand_id: Number(getDataFromCookie("BrandId")) || 0,
  };

  const handleSubmit = async (values: PostData, { resetForm }: any) => {
    try {
      const res = await postBrandCategory(values);
      if (res && res.status === 201) {
        handleClose();
        Notification.success("Success!", "Successfully added category");
        fetchData();
        resetForm();
      }
    } catch (error) {
      console.error("Failed to submit the form:", error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await getBrandCategory(1000, 1, getDataFromCookie("BrandId"));
      if (res && res.status === 200) {
        setData(res.data.data.brandCategories);
        setTotalItems(res.data.data.count);
        filterData(res.data.data.brandCategories, searchTerm);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const filterData = (data: any[], search: string) => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
    setTotalItems(filtered.length);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData(data, searchTerm);
  }, [searchTerm, data]);

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Brand-category?",
      onOk: async () => {
        try {
          await deleteBrandCategory(id);
          fetchData();
          deleteDataFromCookie("categoryId");
        } catch (error) {
          console.error("Failed to delete the brand category:", error);
        }
      },
    });
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setSearchParams({ page: "1", search: value });
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ page: String(page), search: searchTerm });
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
          Add Brand Category
        </Button>
        <Search
          placeholder="Search brands categories"
          enterButton="Search"
          size="large"
          style={{ maxWidth: 300, marginBottom: 16 }}
          onSearch={handleSearch}
        />
      </div>
      <Modal
        title="Add New Brand Category"
        open={open}
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
                placeholder="Brand Category Name"
                size="large"
              />
              <ErrorMessage
                name="name"
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
      </Modal>
      <GlobalTable
        theader={theader}
        tbody={filteredData}
        deletIdData={handleDelete}
      />

      {totalItems > 10 && (
        <Pagination
          current={page}
          pageSize={10}
          total={totalItems}
          onChange={handlePageChange}
        />
      )}
    </>
  );
};

export default Index;
