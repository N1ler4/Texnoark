import useProductDetailStore from "../../store/product-detail";
import { useEffect, useState } from "react";
import { getDataFromCookie } from "@token-service";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ProductDetail = () => {
  const [product, setProduct] = useState<any>(null);
  console.log(product)
  const [images, setImages] = useState([]);

  const { getProductDetail } = useProductDetailStore();

  const Id = getDataFromCookie("productId");

  const getData = async () => {
    const res = await getProductDetail(Id);
    console.log(res);
    if (res && res.status === 200) {
      setProduct(res.data.data);
      if (res?.data?.image_url) {
        const imgArray = res.data.images.map((url: string) => ({
          original: url,
          thumbnail: url,
        }));
        setImages(imgArray);
      }
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      {product && (
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
              {product.product_name}
            </h2>
            <div className="flex gap-3">
              <p>
                <strong style={{ color: "#9388" }}>Available Age:</strong>{" "}
                <div className="flex items-center text-[24px]">
                  {" "}
                  <div className="text-purple-600">
                    {product.age_min}
                    <span>-</span>
                    {product.age_max}
                  </div>
                </div>
              </p>
            </div>
            <div className="flex gap-3">
              <p>
                <strong style={{ color: "#9388" }}>Size:</strong>
                <div className="text-purple-600">{product.size}</div>
              </p>
              <p>
                <strong style={{ color: "#9388" }}>Gender:</strong>{" "}
                <div className="text-purple-600">{product.for_gender}</div>
              </p>
            </div>
            <div className="flex gap-3">
              <p>
                <strong style={{ color: "#9388" }}>Color:</strong>{" "}
                <div className="text-purple-600">{product.color}</div>
              </p>
              <p>
                <strong style={{ color: "#9388" }}>Made In:</strong>{" "}
                <div className="text-purple-600">{product.made_in}</div>
              </p>
            </div>

            <p>
              <strong style={{ color: "#9388" }}>Description:</strong>{" "}
              <div className="text-purple-600 max-w-[400px]">
                {product.description}
              </div>
            </p>
            <p>
              <strong style={{ color: "#9388" }}>Count:</strong>
              <br />
              <div className="text-green-400 text-[24px]">{product.count}</div>
            </p>
            <p>
              <strong style={{ color: "#9388" }}>Price:</strong>
              <br />
              <div className="text-[24px] flex gap-5 items-center">
                {Math.floor(product.cost / product.discount) + "$"}{" "}
                <p className="text-[16px] line-through text-[#6b6b6b]">
                  {product.cost}$
                </p>
              </div>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
