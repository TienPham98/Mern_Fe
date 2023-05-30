import React, { useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useDispatch } from "react-redux";
import {
  getAllProducts,
  addToWishlist,
  addToCompare,
} from "../features/products/productSlice";
import { toast } from "react-toastify";

const ProductCard = (props) => {
  const { grid, data, amount } = props;

  let location = useLocation();

  const dispatch = useDispatch();

  const addProdToWish = (id) => {
    dispatch(addToWishlist(id));
    toast.success("Đã thêm vào danh sách yêu thích!", {
      autoClose: 500,
    });
  };

  const addProdToCompare = (id) => {
    dispatch(addToCompare(id));
    toast.success("Đã thêm vào so sánh!", {
      autoClose: 500,
    });
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (!Array.isArray(data)) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return <div>No data found</div>;
  }

  const list = data.filter((_, i) => i < amount);

  return (
    <>
      {list.map((product) => (
        <div
          key={product._id}
          className={` ${
            location.pathname === "/product" ? `gr-${grid}` : "col-3"
          } `}
        >
          <div className="product-card position-relative my-2">
            <div className="wishlist-icon position-absolute z-111">
              <button className="border-0 bg-transparent ">
                <img
                  src={wish}
                  alt="wishlist"
                  onClick={() => addProdToWish(product?._id)}
                />
              </button>
            </div>
            <Link to={`/product/${product._id}`}>
              <div className="product-image">
                <img
                  src={product?.images[0]?.url}
                  className="img-fluid"
                  alt="product-img"
                />
                <img
                  src={product?.images[1]?.url}
                  className="img-fluid"
                  alt="product-img"
                />
              </div>
              <div className="product-details">
                <h6 className="brand">{product?.brand}</h6>
                <h5 className="product-title">{product?.title}</h5>
                <ReactStars
                  count={5}
                  size={24}
                  value={product?.rating}
                  edit={false}
                  activeColor="#ffd700"
                />
                <p
                  className={`description ${
                    grid === 12 ? "d-block" : "d-none"
                  }`}
                  dangerouslySetInnerHTML={{ __html: product?.description }}
                ></p>
                <p className="price">
                  {(product?.price).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>
            </Link>
            <div className="action-bar position-absolute">
              <div className="d-flex flex-column gap-15">
                <button className="border-0 bg-transparent">
                  <img
                    src={prodcompare}
                    alt="compare"
                    onClick={() => addProdToCompare(product?._id)}
                  />
                </button>
                <button className="border-0 bg-transparent">
                  <img src={view} alt="view" />
                </button>
                <button className="border-0 bg-transparent">
                  <img src={addcart} alt="addcart" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCard;
