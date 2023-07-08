import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts} from "../features/products/productSlice";

const ProductShowcase = ({title, productCount}) => {
  const dispatch = useDispatch();

  // const addProdToWish = (id) => {
  //   dispatch(addToWishlist(id));
  //   toast.success("Đã thêm vào danh sách yêu thích!", {
  //     autoClose: 500,
  //   });
  // };

  // const addProdToCompare = (id) => {
  //   dispatch(addToCompare(id));
  //   toast.success("Đã thêm vào so sánh!", {
  //     autoClose: 500,
  //   });
  // };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const allProduct = useSelector((state) => state.product?.products);

  // Giới hạn số lượng sản phẩm hiển thị
  const limitedProducts = allProduct.slice(0, productCount);

  return (
    <div className="product-showcase">
      <h2 className="title">{title}</h2>

      <div className="showcase-wrapper has-scrollbar">
        {limitedProducts.map((product, index) => (
          <div className="showcase-container" key={index}>
            <div className="showcase">
              <a href={`/product/${product._id}`} className="showcase-img-box">
                <img
                  src={product?.images[0]?.url}
                  alt={product?.title}
                  width="70"
                  className="showcase-img"
                />
              </a>

              <div className="showcase-content">
                <a href={`/product/${product._id}`}>
                  <h4 className="showcase-title">{product?.title}</h4>
                </a>

                <a
                  href={`/product/${product._id}`}
                  className="showcase-category"
                >
                  {product?.category}
                </a>

                <div className="price-box">
                  <p className="price">
                    {product?.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}{" "}
                  </p>
                  {/* <del>{product.discountPrice}</del> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductShowcase;
