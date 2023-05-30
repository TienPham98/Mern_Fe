import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { FaPlus, FaMinus } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useSelector, useDispatch } from "react-redux";

import {
  deleteProdFromCart,
  getUserCart,
  updateProdFromCart,
} from "../features/user/userSlice";
import n2words from "n2words";

const Cart = () => {
  const dispatch = useDispatch();
  const [productUpdateDetail, setProductUpdateDetail] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const cartState = useSelector((state) => state?.auth?.cartProducts);

  useEffect(() => {
    dispatch(getUserCart());
  }, [dispatch]);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index].quantity) * cartState[index].price;
    }
    setTotalAmount(sum);
  }, [cartState]);

  useEffect(() => {
    if (productUpdateDetail !== null) {
      const updateCart = async () => {
        await dispatch(
          updateProdFromCart({
            cartItemId: productUpdateDetail?.cartItemId,
            quantity: productUpdateDetail?.quantity,
          })
        );
        dispatch(getUserCart());
      };
      updateCart();
    }
  }, [productUpdateDetail]);

  // const totalInWords = n2words(totalAmount, { lang: "vi" });

  const handleDelete = async (id) => {
    await dispatch(deleteProdFromCart(id));
    dispatch(getUserCart());
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      dispatch(deleteProdFromCart(productId));
    } else {
      clearTimeout(timeoutId);
      const productToUpdate = cartState.find(
        (product) => product.cartItemId === productId
      );
      setProductUpdateDetail({
        cartItemId: productId,
        quantity: newQuantity,
        price: productToUpdate?.price,
      });
      const timeout = setTimeout(() => {
        setProductUpdateDetail(null);
      }, 1000);
      setTimeoutId(timeout);
    }
  };

  return (
    <>
      <Meta title={"Giỏ hàng"} />
      <BreadCrumb title="Giỏ hàng" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
              <div className="cart-col-1">
                <h6>Tên sản phẩm</h6>
              </div>
              <div className="cart-col-2">
                <h6>Đơn giá</h6>
              </div>
              <div className="cart-col-3">
                <h6>Số lượng</h6>
              </div>
              <div className="cart-col-4">
                <h6>Thành tiền</h6>
              </div>
            </div>
            {cartState?.map((item) => (
              <div
                key={item?._id}
                className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center"
              >
                <div className="cart-col-1 gap-15  d-flex align-items-center">
                  <div className="w-25 ">
                    <img
                      src={item?.productId?.images[0]?.url}
                      className="img-fluid"
                      alt={item?.title}
                    />
                  </div>
                  <div className="w-75">
                    <p>{item?.productId?.title}</p>
                    {/* <p>Size: {item.size}</p>
            <p>Color: {item.color}</p> */}
                  </div>
                </div>
                <div className="cart-col-2">
                  <h5 className="price">
                    {item?.price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </h5>
                </div>
                <div className="cart-col-3 d-flex align-items-center gap-10">
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => {
                      const newQuantity = item.quantity - 1;
                      handleQuantityChange(item._id, newQuantity);
                      setProductUpdateDetail({
                        cartItemId: item?._id,
                        quantity: newQuantity,
                      });
                    }}
                  >
                    <FaMinus className="text-center align-items-center" />
                  </button>
                  <div className="justify-content-center align-items-center mx-1">
                    {productUpdateDetail?.quantity
                      ? productUpdateDetail?.quantity
                      : item?.quantity}
                  </div>

                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => {
                      const newQuantity = item.quantity + 1;
                      handleQuantityChange(item._id, newQuantity);
                      setProductUpdateDetail({
                        cartItemId: item?._id,
                        quantity: newQuantity,
                      });
                    }}
                  >
                    <FaPlus className="text-center align-items-center" />
                  </button>
                  <div onClick={() => handleDelete(item?._id)}>
                    <AiFillDelete className="text-danger " />
                  </div>
                </div>
                <div className="cart-col-4">
                  <h5 className="price">
                    {(item?.price * item?.quantity).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </h5>
                </div>
              </div>
            ))}
            <div className="cart-data py-3 mb-2 d-flex justify-content-end align-items-center">
              <div className="cart-col-1">
                <h5>Tổng cộng:</h5>
                {/* <p>{totalInWords} đồng</p> */}
              </div>
              <div className="cart-col-4">
                <h5>
                  {totalAmount?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </h5>
              </div>
            </div>
            <div className="cart-data py-3 mb-2 d-flex justify-content-end align-items-center">
              <div className="cart-col-1 ">
                <Link to="/product" className="primary-button">
                  Tiếp tục mua sắm
                </Link>
              </div>
              <div className="cart-col-4">
                <Link to="/checkout" className="primary-button">
                  Thanh toán
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
