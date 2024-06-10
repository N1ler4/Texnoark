import { useEffect, useState } from "react";
import { Button, Input, Modal, Pagination, Select } from "antd";
import { GlobalTable, Notification } from "@ui";
import useStockStore from "../../store/stock";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { stockSchema } from "@validation";
import { deleteDataFromCookie, saveDataToCookie } from "@token-service";
import { useLocation, useNavigate } from "react-router-dom";
import useCategoryStore from "../../store/category";
import useBrandStore from "../../store/brand";
import useProductStore from "../../store/product";

export default function Index() {
  const navigate = useNavigate();
  const { getCategory } = useCategoryStore();
  const { getBrand } = useBrandStore();
  const { getProduct } = useProductStore();
  const { postStock, getStock, deleteStock } = useStockStore();
  const [data, setData] = useState<any[]>([]);
  const [categoryId, setCategoryId] = useState<any[]>([]);
  const [brandId, setBrandId] = useState<any[]>([]);
  const [brandCategoryId, setBrandCategoryId] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [reload, setReload] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const theader = [
    { title: "", name: "id" },
    { title: "Brand ID", name: "brand_id" },
    { title: "Created At", name: "createdAt" },
    { title: "Quantity", name: "quantity" },
    { title: "Action", name: "stock action" },
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const initialValues = {
    category_id: 0,
    brand_id: 0,
    product_id: 0,
    quantity: 0,
  };

  const handleSubmit = async (value: any) => {
    const res = await postStock(value);
    if (res && res.status === 201) {
      handleClose();
      getData(page);
      deleteDataFromCookie("brand_id");
      Notification.success("Success!", "Successfully added on Stock");
    }
  };

  const getData = async (page: number) => {
    searchParams.set("page", String(page));
    navigate(`?${searchParams.toString()}`);
    const res = await getStock(10, page);
    if (res && res.status === 200) {
      let filteredData = res.data.data.stocks;
      if (searchTerm) {
        filteredData = filteredData.filter((item:any) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      setData(filteredData);
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
    const response3 = await getProduct(10, page, "");
    if (response3 && response3.status === 200) {
      setBrandCategoryId(response3?.data?.data?.products);
    }
  };

  useEffect(() => {
    getData(page);
  }, [page, reload]);

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Stock?",
      onOk: async () => {
        await deleteStock(id);
        getData(page);
        deleteDataFromCookie("ProductId");
        Notification.success("Success!", "Successfully deleted Product");
      },
    });
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
        <Input.Search
          placeholder="Search products..."
          enterButton="Search"
          size="large"
          style={{ maxWidth: 300, marginBottom: 16 }}
          onSearch={(value) => {
            setSearchTerm(value);
            setPage(1);
          }}
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
          validationSchema={stockSchema}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="flex flex-col gap-5">
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
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option && option.children
                        ? option.children
                            .toString()
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) !== -1
                        : false
                    }
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
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option && option.children
                        ? option.children
                            .toString()
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) !== -1
                        : false
                    }
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
              <Field name="product_id">
                {({ field }: any) => (
                  <Select
                    {...field}
                    onChange={(value) => setFieldValue("product_id", value)}
                    value={values.product_id || undefined}
                    placeholder="Choose a brand product..."
                    size="large"
                    allowClear
                    style={{ width: "100%" }}
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option && option.children
                        ? option.children
                            .toString()
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) !== -1
                        : false
                    }
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
                name="product_id"
                component="div"
                className="text-red-700"
              />
              <Field
                type="number"
                name="quantity"
                as={Input}
                placeholder="Quantity"
                size="large"
              />
              <ErrorMessage
                name="quantity"
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
