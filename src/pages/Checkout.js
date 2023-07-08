import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createAnOrder, getUserCart} from "../features/user/userSlice";
import {useFormik} from "formik";
import * as yup from "yup";
import BreadCrumb from "../components/BreadCrumb";

const shippingSchema = yup.object({
  name: yup.string().required("Tên là trường bắt buộc"),
  phone: yup.string().required("Số điện thoại là trường bắt buộc"),
  address: yup.string().required("Địa chỉ là trường bắt buộc"),
  city: yup.string().required("Thành phố là trường bắt buộc"),
  district: yup.string().required("Quận/Huyện là trường bắt buộc"),
  ward: yup.string().required("Phường/Xã là trường bắt buộc"),
  paymentMethod: yup.string().required("Vui lòng chọn phương thức thanh toán"),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const [total, setTotal] = useState(null);
  const [cartProductsState, setCartProductsState] = useState([]);
  const [shippingInfo, setShippingInfo] = useState(null);
  const shippingFee = total > 2000000 ? 0 : 30000;
  const totalPriceAndShip = total + shippingFee;
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      address: "",
      city: "",
      district: "",
      ward: "",
      paymentMethod: "",
    },
    validationSchema: shippingSchema,
    onSubmit: async (values) => {
      let isShippingInfoUpdated = false;

      await setShippingInfo(values);
      if (
        shippingInfo.paymentMethod &&
        shippingInfo.ward &&
        shippingInfo.district &&
        shippingInfo.city &&
        shippingInfo.address &&
        shippingInfo.phone &&
        shippingInfo.name
      ) {
        isShippingInfoUpdated = true;
      }

      if (isShippingInfoUpdated) {
        try {
          await dispatch(
            createAnOrder({
              totalPrice: total,
              totalPriceAndShippingFee: totalPriceAndShip,
              orderItems: cartProductsState,
              shippingInfo: shippingInfo,
            })
          );
          navigate("/success");
        } catch (error) {
          console.log("Error creating order: ", error);
        }
      }
    },
  });

  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  useEffect(() => {
    let items = [];
    for (let index = 0; index < cartState?.length; index++) {
      items.push({
        product: cartState[index]?.productId?._id,
        title: cartState[index]?.productId?.title,
        quantity: cartState[index]?.quantity,
        price: cartState[index]?.price,
      });
    }
    setCartProductsState(items);
  }, [cartState]);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index].quantity) * cartState[index].price;
    }
    setTotal(sum);
  }, [cartState]);

  const renderCartSummary = () => {
    return cartState?.map((item) => (
      <div key={item?._id} className="d-flex align-items-center gap-10 mb-2">
        <img
          src={item?.productId?.images[0]?.url}
          className="img-fluid"
          alt={item?.title}
        />
        <div className="w-100">
          <p className="mb-0 text-sm">{item?.productId.title}</p>
          <div className="d-flex align-items-center justify-content-between">
            <p className="mb-0 total">
              Đơn giá:&nbsp;
              {item.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
            <p className="mb-0 total">Số lượng:&nbsp; {item.quantity}</p>
            <p className="mb-0 total">
              Tổng tiền:&nbsp;
              {(item.price * item.quantity).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </div>
        </div>
      </div>
    ));
  };
  return (
    <>
      <BreadCrumb title="Xác nhận đặt hàng" />
      <div className="">
        <div className="row mx-4">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Giỏ hàng</span>
              <span className="badge badge-secondary badge-pill">3</span>
            </h4>
            <ul className="list-group mb-3">
              {cartState?.map((item, index) => (
                <li
                  className="list-group-item d-flex justify-content-between lh-condensed"
                  key={index}
                >
                  <div>
                    <p className="my-0">{item?.productId?.title}</p>
                    <small className="text-muted">
                      số lượng: {item?.quantity}
                    </small>
                  </div>
                  <p className="">
                    {(item?.price * item?.quantity).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </li>
              ))}
            </ul>
            <div className="card shadow-0 border">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <p className="mb-2">Tổng tiền hàng :</p>
                  <p className="mb-2">
                    {" "}
                    {total?.toLocaleString("vi-VN", {
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
                    {total?.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Thông tin người mua hàng</h4>
            <form
              className="needs-validation"
              onSubmit={formik.handleSubmit}
              action=""
            >
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName">Tên người nhận:</label>
                  <input
                    type="text"
                    placeholder="Tên người nhận"
                    className="form-control"
                    value={formik.values.name}
                    onChange={formik.handleChange("name")}
                    onBlur={formik.handleBlur("name")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.name && formik.errors.name}
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName">Số điện thoại</label>
                  <input
                    type="text"
                    placeholder="Số điện thoại"
                    className="form-control"
                    value={formik.values.phone}
                    onChange={formik.handleChange("phone")}
                    onBlur={formik.handleBlur("phone")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.phone && formik.errors.phone}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="username">Địa chỉ nhà:</label>
                  <input
                    type="text"
                    placeholder="Địa chỉ nhà"
                    className="form-control"
                    value={formik.values.address}
                    onChange={formik.handleChange("address")}
                    onBlur={formik.handleBlur("address")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="city">Phường / Xã</label>
                  <input
                    type="text"
                    placeholder="Phường/Xã"
                    className="form-control"
                    value={formik.values.ward}
                    onChange={formik.handleChange("ward")}
                    onBlur={formik.handleBlur("ward")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.ward && formik.errors.ward}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="city">Quận / Huyện</label>
                  <input
                    type="text"
                    placeholder="Quận/Huyện"
                    className="form-control"
                    value={formik.values.district}
                    onChange={formik.handleChange("district")}
                    onBlur={formik.handleBlur("district")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.district && formik.errors.district}
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="city">Thành Phố</label>
                  <input
                    type="text"
                    placeholder="Thành phố"
                    className="form-control"
                    value={formik.values.city}
                    onChange={formik.handleChange("city")}
                    onBlur={formik.handleBlur("city")}
                  />
                  <div className="error ms-2 my-1">
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>
              </div>

              <h4 className="mb-3">Phương thức thanh toán</h4>
              <div className="d-block my-3">
                <div className="d-flex align-items-center">
                  <input
                    id="cash"
                    name="paymentMethod"
                    type="radio"
                    value="cash"
                    className="payment-radio mx-2"
                    checked={formik.values.paymentMethod === "cash"}
                    onChange={formik.handleChange("paymentMethod")}
                    onBlur={formik.handleBlur("paymentMethod")}
                  />
                  <h6 className="mx-2" htmlFor="cash">
                    Tiền mặt
                  </h6>
                </div>
                <div className="d-flex align-items-center ">
                  <input
                    id="bankTransfer"
                    value="bankTransfer"
                    name="paymentMethod"
                    type="radio"
                    className="payment-radio mx-2"
                    checked={formik.values.paymentMethod === "bankTransfer"}
                    onChange={formik.handleChange("paymentMethod")}
                    onBlur={formik.handleBlur("paymentMethod")}
                  />
                  <h6 className="mx-2" htmlFor="credit">
                    chuyển khoản
                  </h6>
                </div>
                <div className="mt-3 col-md-6 mb-3">
                  <button
                    type="submit"
                    className="btn btn-success w-100 shadow-0 mb-2"
                  >
                    Xác nhận đặt hàng
                  </button>
                  <a href="/cart" className="btn btn-light w-100 border mt-2">
                    {" "}
                    Trở về giỏ hàng
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
