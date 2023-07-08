import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import {Link, useNavigate} from "react-router-dom";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import * as yup from "yup";
import {forgotPWToken} from "../features/user/userSlice";

const Forgotpassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailSchema = yup.object({
    email: yup
      .string()
      .email("email phải hợp lệ")
      .required("email phải bắt buộc"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: emailSchema,
    onSubmit: (values) => {
      dispatch(forgotPWToken(values));
    },
  });

  return (
    <>
      <Meta title={"Quên mật khẩu"} />
      <BreadCrumb title="Quên mật khẩu" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-lg-6">
            <div className="auth-card">
              <h3 className="text-center mb-3">Lấy lại mật khẩu</h3>
              <p className="text-center mt-2 mb-3">
                Chúng tôi sẽ gửi mật khẩu tới email của bạn
              </p>
              <form
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15 "
              >
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                />
                <div className="error text-white my-3 mx-3">
                  {formik.touched.email && formik.errors.email}
                </div>

                <div>
                  <div className="mt-3 d-flex justify-content-center flex-column gap-15 align-items-center">
                    <button className="login-btn " type="submit">
                      Xác nhận
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Forgotpassword;
