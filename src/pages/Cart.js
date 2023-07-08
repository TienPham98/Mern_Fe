import React, {useEffect, useState} from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import {useSelector, useDispatch} from "react-redux";
import {
  deleteProdFromCart,
  getUserCart,
  updateProdFromCart,
} from "../features/user/userSlice";
import {BiTrash} from "react-icons/bi";

const Cart = () => {
  const dispatch = useDispatch();

  const [totalAmount, setTotalAmount] = useState(null);
  const [newQuantity, setNewQuantity] = useState("");
  const [quantityMap, setQuantityMap] = useState({});

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

  // const totalInWords = n2words(totalAmount, { lang: "vi" });

  const handleDelete = async (id) => {
    await dispatch(deleteProdFromCart(id));
    dispatch(getUserCart());
  };
  const handleChange = (productId, e) => {
    const newQuantity = e.target.value;
    setQuantityMap((prevMap) => ({
      ...prevMap,
      [productId]: newQuantity,
    }));
  };

  const handleQuantityChange = async (cartItemId, quantity) => {
    await dispatch(updateProdFromCart(cartItemId, quantity));
    dispatch(getUserCart());
  };

  return (
    <>
      <Meta title={"Giỏ hàng"} />
      <BreadCrumb title="Giỏ hàng" />
      <section className="bg-light my-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="card border shadow-0">
                <div className="m-4">
                  <h4 className="card-title mb-2">Giỏ hàng</h4>
                  <div className="border-bottom mb-4">
                    <p className="text-muted"></p>
                  </div>
                  {cartState?.map((item, index) => (
                    <div className="row gy-3 mb-4" key={index}>
                      <div className="col-lg-5">
                        <div className="me-lg-5">
                          <div className="d-flex">
                            <a href={`/product/${item?.productId?._id}`}>
                              <img
                                src={item?.productId?.images[0]?.url}
                                className="border wl-img rounded me-3"
                                alt="Product"
                              />
                            </a>
                            <div className="">
                              <h6 className="mt-1">Sản Phẩm:</h6>
                              <a
                                href={`/product/${item?.productId?._id}`}
                                className="nav-link"
                              >
                                {item?.productId?.title}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                        <div className="">
                          <h6>Số lượng: </h6>
                          <input
                            type="number"
                            className="mt-x me-4 text-center "
                            value={quantityMap[item._id] || item.quantity || ""}
                            onChange={(e) => handleChange(item._id, e)}
                            onBlur={() => {
                              handleQuantityChange({
                                cartItemId: item?._id,
                                quantity: quantityMap[item._id],
                              });
                            }}
                            min="1"
                            step="1"
                          ></input>
                        </div>
                        <div className="d-flex">
                          <div>
                            <h6 className="mx-4">Đơn giá:</h6>
                            <h6 className="text-muted text-nowrap mt-3 mx-4">
                              {item?.price.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}
                            </h6>
                          </div>
                          <div>
                            <h6 className="mx-2">Tổng cộng:</h6>
                            <h6 className="text-muted text-nowrap mt-3 mx-4">
                              {(item?.quantity * item?.price).toLocaleString(
                                "vi-VN",
                                {
                                  style: "currency",
                                  currency: "VND",
                                }
                              )}
                            </h6>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                        <div className="float-md-end">
                          <button
                            className="trash-icon mt-3"
                            onClick={() => handleDelete(item?._id)}
                          >
                            <BiTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-top pt-4 mx-4 mb-4">
                  <p>
                    <i className="fas fa-truck text-muted fa-lg"></i> Vận chuyển
                    hàng ngay trong ngày
                  </p>
                  <p className="text-muted d-flex">
                    Tham gia group{""}
                    <a
                      href="https://www.facebook.com/groups/hoaleauthentic"
                      className="mx-1"
                    >
                      Hòa Lê Authentic
                    </a>
                    {""}
                    để cập nhật những sản phẩm mới nhất với giá cả tốt nhất.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3">
              <div className="card mb-3 border shadow-0">
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label className="form-label">Sử dụng Coupon?</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control border"
                          name=""
                          placeholder="Coupon code"
                        />
                        <button className="btn btn-light border">
                          Áp dụng
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="card shadow-0 border">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Tổng tiền hàng :</p>
                    <p className="mb-2">
                      {" "}
                      {totalAmount?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Discount :</p>
                    <p className="mb-2 text-success">0</p>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Tổng cộng thanh toán :</p>
                    <p className="mb-2 fw-bold">
                      {" "}
                      {totalAmount?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>

                  <div className="mt-3">
                    <a
                      href="/checkout"
                      className="btn btn-success w-100 shadow-0 mb-2"
                    >
                      {" "}
                      Xác nhận đơn hàng
                    </a>
                    <a href="/" className="btn btn-light w-100 border mt-2">
                      {" "}
                      Trở về shop
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
