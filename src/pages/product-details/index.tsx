import useProductDetailStore from "../../store/product-detail";
import { useEffect, useState } from "react";
import { getDataFromCookie } from "@token-service";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { SideBar } from "@ui";
import { useNavigate } from "react-router-dom";
import "../style.css";

const ProductDetail = () => {
  const [productDetail, setProductDetail] = useState<any>(null);
  const [product, setProduct] = useState<any>([]);
  console.log(product);
  console.log(productDetail);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  const { getProductDetail } = useProductDetailStore();

  const Id = getDataFromCookie("productId");

  const getData = async () => {
    const res = await getProductDetail(Id);
    console.log(res);
    if (res && res.status === 200) {
      setProduct(res?.data?.data.product);
      setProductDetail(res.data.data.product_detail);
      if (res?.data?.data?.product) {
        const imgArray = res.data.data.product.images.map(
          (url: string) => ({
            original: url,
            thumbnail: url,
          })
        );
        console.log(imgArray);
        setImages(imgArray);
      }
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {productDetail && product ? (
        <div className="mt-[60px] flex items-center justify-around">
          <div className="w-[600px]">
            <ImageGallery items={images} />
          </div>
          <div>
            <h2
              style={{
                marginBottom: "10px",
                fontSize: "32px",
                color: "#444",
              }}
            >
              {product.name}
            </h2>
            <p>
              <strong style={{ color: "#9388" }}>Description:</strong>{" "}
              <div className=" max-w-[400px]">
                {productDetail.description}
              </div>
            </p>
            <p className="w-[400px] flex justify-between border-b-2 border-gray-500 mt-3">
              <strong style={{ color: "#9388" }}>Colors:</strong>{" "}
              <div className=" max-w-[400px] flex gap-2">
                {productDetail.colors.length > 1 ? (
                  productDetail.colors.map((color:any, index:any) => (
                    <p key={index}>{color},</p>
                  ))
                ) : (
                  <p key={0}>{productDetail.colors[0]}</p>
                )}
              </div>
            </p>
            <p className="w-[400px] flex justify-between border-b-2 border-gray-500 mt-3">
              <strong style={{ color: "#9388" }}>Quantity:</strong>{" "}
              <div className=" max-w-[400px]">
                {productDetail.quantity}
              </div>
            </p>
            <p className="w-[400px] flex justify-between border-b-2 border-gray-500 items-center mt-3">
              <strong style={{ color: "#9388" }}>Count:</strong>
              <br />
              <div>{productDetail.quantity}</div>
            </p>
            <p className="mt-3">
              <strong style={{ color: "#9388" }}>Price:</strong>
              <br />
              <div className="text-[24px] flex gap-5 items-center">
                {Math.floor(product.price / productDetail.discount) + "$"}{" "}
                <p className="text-[16px] line-through text-[#6b6b6b]">
                  {product.price}$
                </p>
              </div>
            </p>
          </div>
          <button
            onClick={() => navigate(`/main/product`)}
            className="absolute left-[260px] top-[70px] text-[32px]"
          >
            Back
          </button>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <button className="text-[32px]" onClick={() => window.history.back()}>
            Back
          </button>
          <h1>Please Enter Product Details</h1>
          {<SideBar />}
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
