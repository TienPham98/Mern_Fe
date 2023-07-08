import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import {getOrders} from "../features/user/userSlice";

const Order = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.auth.getUserOrders?.orders);
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return (
    <>
      <BreadCrumb title="Sản phẩm đã mua" />
      <Container class1="cart-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="row">
              <div className="col-3">
                <h5>Order Id:</h5>
              </div>
              <div className="col-3">
                <h5>Tổng cộng tiền hàng:</h5>
              </div>
              <div className="col-3">
                <h5>Tổng cộng thanh toán:</h5>
              </div>
              <div className="col-3">
                <h5>Tình trạng đơn hàng:</h5>
              </div>
            </div>
          </div>
          <div className="col-12 mt-3">
            {orderState &&
              orderState?.map((item, index) => {
                return (
                  <div
                    style={{backgroundColor: "#febd69"}}
                    className="row my-5 pt-3"
                    key={index}
                  >
                    <div className="col-3">
                      <p>Order: {item?._id}</p>
                    </div>
                    <div className="col-3">
                      <p>
                        Tiền hàng:{" "}
                        {(item?.totalPrice).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </p>
                    </div>
                    <div className="col-3">
                      <p>
                        Tổng cộng :{" "}
                        {(item?.totalPriceAndShippingFee).toLocaleString(
                          "vi-VN",
                          {
                            style: "currency",
                            currency: "VND",
                          }
                        )}
                      </p>
                    </div>
                    <div className="col-3">
                      <p>Trạng thái: {item?.orderStatus}</p>
                    </div>
                    <div className="col-12">
                      <div
                        style={{backgroundColor: "#0ECC7E"}}
                        className="row py-3"
                      >
                        <div className="col-3">
                          <h6 className="text-white">Sản phẩm:</h6>
                        </div>
                        <div className="col-3">
                          <h6 className="text-white">Số lượng:</h6>
                        </div>
                        <div className="col-3">
                          <h6 className="text-white">Đơn giá:</h6>
                        </div>
                        <div className="col-3">
                          <h6 className="text-white">Thành tiền:</h6>
                        </div>
                        {item?.orderItems?.map((i, index) => {
                          return (
                            <div className="col-12 " key={index}>
                              <div className="row py-3">
                                <div className="col-3">
                                  <h6 className="text-white">
                                    {i?.product?.title}
                                  </h6>
                                </div>
                                <div className="col-3">
                                  <h6 className="text-white">{i?.quantity}</h6>
                                </div>
                                <div className="col-3">
                                  <h6 className="text-white">
                                    {(i?.price).toLocaleString("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                    })}
                                  </h6>
                                </div>
                                <div className="col-3">
                                  <h6 className="text-white">
                                    {(i?.quantity && i?.price
                                      ? i.quantity * i.price
                                      : 0
                                    ).toLocaleString("vi-VN", {
                                      style: "currency",
                                      currency: "VND",
                                    })}
                                  </h6>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Order;
