import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { createAnOrder, getUserCart } from "../features/user/userSlice";
import { useFormik } from "formik";
import * as yup from "yup";

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
  const authState = useSelector((state) => state.auth);
  const currentUser = useSelector((state) => state.auth.user);
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
          navigate("/my-orders");
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
        product: cartState[index].productId._id,
        quantity: cartState[index].quantity,
        price: cartState[index].price,
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
          style={{ width: "50px", height: "50px" }}
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
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">
                {currentUser.firstname} {currentUser.lastname}
              </h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Giỏ hàng
                    </Link>
                  </li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-ite total-price active"
                    aria-current="page"
                  >
                    Thông tin
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Vận chuyển
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Thanh toán
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Thông tin liên hệ</h4>
              <p className="user-details total">
                {currentUser.firstname} {currentUser.lastname}
              </p>
              <h4 className="mb-3">Địa chỉ nhận hàng</h4>
              <form
                onSubmit={formik.handleSubmit}
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="flex-grow-1">
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
                <div className="flex-grow-1">
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
                <div className="w-100">
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
                {/* <div className="w-100">
                  <input
                    type="text"
                    placeholder="Địa chỉ nhà"
                    className="form-control"
                  />
                </div> */}
                <div className="flex-grow-1">
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
                <div className="flex-grow-1">
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
                <div className="flex-grow-1">
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
                <div className="form-group">
                  <label htmlFor="paymentMethod">Phương thức thanh toán:</label>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="cash"
                      name="paymentMethod"
                      value="cash"
                      checked={formik.values.paymentMethod === "cash"}
                      onChange={formik.handleChange("paymentMethod")}
                      onBlur={formik.handleBlur("paymentMethod")}
                    />
                    <label className="form-check-label" htmlFor="cash">
                      Tiền mặt
                    </label>
                    <div className="error ms-2 my-1">
                      {formik.touched.paymentMethod &&
                        formik.errors.paymentMethod}
                    </div>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="bankTransfer"
                      name="paymentMethod"
                      value="bankTransfer"
                      checked={formik.values.paymentMethod === "bankTransfer"}
                      onChange={formik.handleChange("paymentMethod")}
                      onBlur={formik.handleBlur("paymentMethod")}
                    />
                    <label className="form-check-label" htmlFor="bankTransfer">
                      Chuyển khoản
                    </label>
                    <div className="error ms-2 my-1">
                      {formik.touched.paymentMethod &&
                        formik.errors.paymentMethod}
                    </div>
                  </div>
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Trở về giỏ hàng
                    </Link>
                    <button className="primary-button" type="submit">
                      Xác nhận đặt mua
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            {/* <div className="border-bottom py-4">
              <div className="d-flex gap-10 mb-2 align-align-items-center">
                <div className="w-75 d-flex gap-10">
                  {cart?.map((item, index) => (
                    <div key={index} className="w-25 position-relative">
                      <span
                        style={{ top: "-10px", right: "2px" }}
                        className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                      >
                        {item?.quantity}
                      </span>
                      <img
                        className="img-fluid"
                        src={item?.images[0]?.url}
                        alt={item?.title}
                      />
                    </div>
                  ))}
                  <div>
                    <h5 className="total-price">tiền hàng</h5>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="total">{total} vnđ</h5>
                </div>
              </div>
            </div> */}
            <div className="border-bottom py-4">
              {renderCartSummary()}
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Tổng tiền hàng</p>
                <p className="total">
                  {total?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}{" "}
                </p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Phí ship</p>
                <p className="mb-0 total">
                  {shippingFee.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}{" "}
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bootom py-4">
              <h4 className="total">Tổng cộng thanh toán</h4>
              <h5 className="total">
                {totalPriceAndShip.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}{" "}
              </h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
