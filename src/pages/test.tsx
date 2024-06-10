import { useState, useEffect } from "react";
import {
  Button,
  Input,
  Modal,
  Pagination,
  Select,
  Upload,
  message,
} from "antd";
import { GlobalTable } from "@ui";
import useBrandStore from "../store/brand";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { postBrandSchema } from "@validation";
import { deleteDataFromCookie, getDataFromCookie } from "@token-service";
import { ConfirmModal } from "@components";
import useCategoryStore from "../store/category";
import { UploadOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
const { Search } = Input;

export default function Index() {
  const { postBrand, getBrand, deleteBrand } = useBrandStore();
  const [data, setData] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState<any[]>([]);
  const [reload, setReload] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { getCategory } = useCategoryStore();
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const navigate = useNavigate();

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
    files: [], 
    category_id: null,
  };

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("category_id", values.category_id);

    console.log("Files field:", values.files);

    if (values.files && values.files.length > 0) {
      values.files.forEach((file: any) => {
        formData.append("files", file);
      });
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
      const res = await getCategory(10, 1, "");
      if (res && res.status === 200) {
        setCategoryId(res.data.data.categories);
      }
    } catch (error) {
      console.error("Failed to get categories:", error);
    }
  };

  const getData = async () => {
    searchParams.set("page", String(page));
    navigate(`?${searchParams.toString()}`);
    try {
      const res = await getBrand(10, page, searchTerm);
      console.log(res);
      if (res && res.status === 200) {
        setData(res.data.data.brands);
        setTotalItems(res.data.data.count);
      }
    } catch (error) {
      console.error("Failed to get brands:", error);
    }
  };

  useEffect(() => {
    getData();
    getCategoryId();
  }, [page, searchTerm, reload]);

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
          Add Brand
        </Button>
        <Search
          placeholder="Search brands"
          enterButton="Search"
          size="large"
          style={{ maxWidth: 300, marginBottom: 16 }}
          onSearch={handleSearch}
        />
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
              <ErrorMessage name="name" component="div" className="text-[#ff0000]" />
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
                className="text-[#ff0000]"
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
                className="text-[#ff0000]"
              />
              <Field name="files">
                {({ field }: any) => (
                  <Upload
                    {...field}
                    beforeUpload={(file) => {
                      setFieldValue("files", [...field.value, file]);
                      return false;
                    }}
                    multiple
                  >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                )}
              </Field>
              <ErrorMessage name="files" component="div" className="text-[#ff0000]" />
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
