import { useEffect, useState } from "react";
import { Button, Input, Modal, Pagination, Select } from "antd";
import { GlobalTable, Notification } from "@ui";
import useProductStore from "../../store/product";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { postProductSchema } from "@validation";
import {
  deleteDataFromCookie,
  getDataFromCookie,
  saveDataToCookie,
} from "@token-service";
import { useLocation, useNavigate } from "react-router-dom";
import useCategoryStore from "../../store/category";
import useBrandStore from "../../store/brand";

const { Search } = Input;

export default function Index() {
  const navigate = useNavigate();
  const { getCategory } = useCategoryStore();
  const { getBrand, getSingleBrand } = useBrandStore();
  const { postProduct, getProduct, deleteProduct } = useProductStore();
  const [data, setData] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState<any[]>([]);
  const [brandId, setBrandId] = useState<any[]>([]);
  const [brandCategoryId, setBrandCategoryId] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [reload, setReload] = useState(false); // Add reload state

  const theader = [
    { title: "", name: "id" },
    { title: "Product name", name: "name" },
    { title: "Price", name: "price" },
    { title: "Action", name: "product action" },
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues = {
    name: "",
    price: "",
    category_id: "",
    brand_category_id: "",
    brand_id: "",
  };

  const handleSubmit = async (value: any) => {
    const res = await postProduct(value);
    if (res && res.status === 201) {
      handleClose();
      getData(page, searchTerm);
      Notification.success("Success!", "Successfully added Product");
    }
  };

  const Id = Number(getDataFromCookie("brand_id"));

  const getData = async (page: number, search: string) => {
    searchParams.set("page", String(page));
    navigate(`?${searchParams.toString()}`);
    const res = await getProduct(10, page, search);
    if (res && res.status === 200) {
      setData(res.data.data.products);
      setTotalItems(res.data.data.count);
    }
    const response = await getCategory(10, page, "");
    if (response && response.status === 200) {
      setCategoryId(response?.data?.data?.categories);
    }
    const response2 = await getBrand(10, page, "");
    if (response2 && response2.status === 200) {
      setBrandId(response2?.data?.data?.brands);
    }
    const response3 = await getSingleBrand(Id, 100, page);
    if (response3 && response3.status === 200) {
      console.log(response3)
      setBrandCategoryId(response3?.data?.data?.brandCategories);
    }
  };

  useEffect(() => {
    getData(page, searchTerm);
  }, [page, searchTerm, reload]); 
  
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Product?",
      onOk: async () => {
        await deleteProduct(id);
        getData(page, searchTerm);
        deleteDataFromCookie("ProductId");
        Notification.success("Success!", "Successfully deleted Product");
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
          Add Product
        </Button>
        <Search
          placeholder="Search products..."
          enterButton="Search"
          size="large"
          style={{ maxWidth: 300, marginBottom: 16 }}
          onSearch={handleSearch}
        />
      </div>
      <Modal
        title="Add New Product"
        visible={open}
        onCancel={handleClose}
        footer={null}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={postProductSchema}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="flex flex-col gap-5">
              <Field
                name="name"
                as={Input}
                placeholder="Product Name"
                size="large"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-700"
              />
              <Field
                type="number"
                name="price"
                as={Input}
                placeholder="Price"
                size="large"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-700"
              />
              <Field name="brand_id">
                {({ field }: any) => (
                  <Select
                    {...field}
                    onChange={(value) => {
                      setFieldValue("brand_id", value);
                      saveDataToCookie("brand_id", value);
                      setReload(!reload); 
                    }}
                    value={values.brand_id || undefined}
                    placeholder="Choose a brand"
                    size="large"
                    allowClear
                    style={{ width: "100%" }}
                  >
                    {brandId?.map((item: any) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Field>
              <ErrorMessage
                name="brand_id"
                component="div"
                className="text-red-700"
              />
              <Field name="category_id">
                {({ field }: any) => (
                  <Select
                    {...field}
                    onChange={(value) => setFieldValue("category_id", value)}
                    value={values.category_id || undefined}
                    placeholder="Choose a category"
                    size="large"
                    allowClear
                    style={{ width: "100%" }}
                  >
                    {categoryId?.map((item: any) => (
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
                className="text-red-700"
              />
              <Field name="brand_category_id">
                {({ field }: any) => (
                  <Select
                    {...field}
                    onChange={(value) =>
                      setFieldValue("brand_category_id", value)
                    }
                    value={values.brand_category_id || undefined}
                    placeholder="Choose a brand category"
                    size="large"
                    allowClear
                    style={{ width: "100%" }}
                  >
                    {brandCategoryId?.map((item: any) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Field>
              <ErrorMessage
                name="brand_category_id"
                component="div"
                className="text-red-700"
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
