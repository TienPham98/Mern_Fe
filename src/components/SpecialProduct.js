import React from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addProdToCart } from "../features/user/userSlice";

const SpecialProduct = (props) => {
  const { id, title, brand, price, quantity, images } = props;
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(
      addProdToCart({
        productId: id,
        images: images[0]?.url,
        quantity: 1,
        price: price,
      })
    );
  };
  return (
    <>
      <div className="col-3 mb-3">
        <div className="special-product-card">
          <Link to={`/product/${id}`}>
            <div className="justify-content-center">
              <div className="special-product-images">
                <img src={images[0]?.url} className="img-fluid" alt="watch" />
              </div>
              <div className="special-product-content mt-4">
                <h6 className="brand">Thương hiệu: {brand}</h6>
                <h6 className="title">Sản phẩm: {title}</h6>
                <ReactStars
                  count={5}
                  size={24}
                  value={5}
                  edit={false}
                  activeColor="#ffd700"
                />
                <p className="price">
                  <span className="red-p">
                    Giá:{" "}
                    {price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </span>{" "}
                  &nbsp;{" "}
                  <strike>
                    {(price * 1.2).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </strike>
                </p>
                {/* <div className="discount-till d-flex align-items-center gap-10">
                  <p className="mb-0">
                    <b>5</b>ngày
                  </p>
                  <div className="d-flex gap-10 align-items-center">
                    <span className="badge rounded-circle p-1 bg-danger">1</span>:
                    <span className="badge rounded-circle p-1 bg-danger">11</span>
                    :
                    <span className="badge rounded-circle p-1 bg-danger">22</span>
                  </div>
                </div> */}
                <div className="prod-count my-2">
                  <p>Số lượng: {quantity}</p>
                  {/* <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "25%" }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div> */}
                </div>
                <div className="mt-4">
                  <button
                    onClick={() => {
                      handleAddToCart(id);
                    }}
                    className="primary-button"
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SpecialProduct;
