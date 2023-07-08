import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";
import {useFormik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../features/user/userSlice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);

  const loginSchema = yup.object({
    email: yup.string().nullable().required("Email không hợp lệ"),
    password: yup.string().required("Mật khẩu không hợp lệ"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      dispatch(loginUser(values));
    },
  });

  useEffect(() => {
    if (authState.user !== null && authState.isError === false) {
      navigate("/");
    }
  }, [authState]);

  return (
    <>
      <Meta title={"Đăng nhập"} />
      <BreadCrumb title="Đăng nhập" />

      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row d-flex justify-content-center">
          <div className=" col-12 col-lg-6">
            <div className="auth-card">
              <h3 className="text-center mb-3">Đăng nhập</h3>
              <form
                action=""
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
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

                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Mật khẩu"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                />
                <div className="error  text-white mt-3 mx-3">
                  {formik.touched.password && formik.errors.password}
                </div>

                <div className="mt-1">
                  <div className="d-flex justify-content-between">
                    <Link to="/forgot-password ">Quên mật khẩu ?</Link>
                    <Link to="/signup">Đăng kí tài khoản ?</Link>
                  </div>
                  <div className="mt-2 d-flex justify-content-center gap-15 align-items-center">
                    <button className="login-btn my-4 py-2 px-2" type="submit">
                      Đăng nhập
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

export default Login;
