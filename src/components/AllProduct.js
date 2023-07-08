import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addToWishlist, getAllProducts} from "../features/products/productSlice";
import {BsCart3, BsEye, BsHeart} from "react-icons/bs";
import {toast} from "react-toastify";
import {addProdToCart} from "../features/user/userSlice";

const AllProduct = ({product, productCount}) => {
  const dispatch = useDispatch();

  // Giới hạn số lượng sản phẩm hiển thị
  const limitedProducts = product?.slice(0, productCount);

  const addProdToWish = (id) => {
    dispatch(addToWishlist(id));
    toast.success("Đã thêm vào danh sách yêu thích!", {
      autoClose: 500,
    });
  };

  const addProductToCart = (id, title, quantity, price, imageUrl) => {
    const cartItem = {
      productId: id,
      title: title,
      quantity: quantity,
      price: price,
      images: imageUrl,
    };
    dispatch(addProdToCart(cartItem));
    toast.success("Đã thêm vào giỏ hàng!", {
      autoClose: 500,
    });
  };

  return (
    <div className="product-grid">
      {limitedProducts?.map((product, index) => (
        <div className="showcase" key={index}>
          <div className="showcase-banner">
            <a href={`/product/${product?._id}`}>
              <img
                src={product?.images[0]?.url}
                alt={product.alt}
                width="300"
                className="product-img"
              />
            </a>

            <p className="showcase-badge">15%</p>

            <div className="showcase-actions">
              <button
                className="btn-action"
                onClick={() => addProdToWish(product?._id)}
              >
                <BsHeart fs={8} />
              </button>

              <button className="btn-action">
                <a href={`/product/${product?._id}`}>
                  <BsEye />
                </a>
              </button>

              <button
                className="btn-action"
                onClick={() =>
                  addProductToCart(
                    product?._id,
                    product?.title,
                    1,
                    product?.price,
                    product?.images[0]?.url
                  )
                }
              >
                <BsCart3 />
              </button>
            </div>
          </div>

          <div className="showcase-content">
            <a href={`/product/${product?._id}`} className="showcase-category">
              {product.category}
            </a>

            <a href={`/product/${product?._id}`}>
              <h3 className="showcase-title">{product?.title}</h3>
            </a>

            {/* <div className="showcase-rating">
              {product.rating.map((rating, index) => (
                <ion-icon name="star" key={index}></ion-icon>
              ))}
              {product.rating.length < 5 && (
                <ion-icon name="star-outline"></ion-icon>
              )}
            </div> */}

            <div className="price-box">
              <p className="price">
                {product?.price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
              {/* <del>{product?.price}</del> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProduct;
