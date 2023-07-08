import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import {useFormik} from "formik";
import * as yup from "yup";
import {updateProfile} from "../features/user/userSlice";
import {FiEdit} from "react-icons/fi";
import {Link} from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.auth?.user);
  const [edit, setEdit] = useState(true);

  const profileSchema = yup.object({
    firstname: yup.string().required("firstname is required"),
    lastname: yup.string().required("lastname is required"),
    email: yup.string().nullable().required("email should be valid"),
    mobile: yup.number().required("mobile is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: userState?.firstname,
      lastname: userState?.lastname,
      email: userState?.email,
      mobile: userState?.mobile,
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      dispatch(updateProfile(values));
      setEdit(true);
    },
  });

  return (
    <>
      <BreadCrumb title="Thông tin đăng nhập" />
      <Container class1="cart-wrapper home-wrapper-2 py-5 px-5">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="my-3">Cập nhật thông tin</h3>
              <FiEdit className="my-3" onClick={() => setEdit(false)} />
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3">
                <label htmlFor="example1" className="form-label">
                  Họ
                </label>
                <input
                  type="text"
                  name="firstname"
                  className="form-control"
                  disabled={edit}
                  id="example1"
                  value={formik.values.firstname}
                  onChange={formik.handleChange("firstname")}
                  onBlur={formik.handleBlur("firstname")}
                />
                <div className="error">
                  {formik.touched.firstname && formik.errors.firstname}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="example2" className="form-label">
                  Tên
                </label>
                <input
                  type="text"
                  name="lastname"
                  className="form-control"
                  disabled={edit}
                  id="example2"
                  value={formik.values.lastname}
                  onChange={formik.handleChange("lastname")}
                  onBlur={formik.handleBlur("lastname")}
                />
                <div className="error">
                  {formik.touched.lastname && formik.errors.lastname}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  disabled={edit}
                  id="exampleInputEmail"
                  aria-describedby="emailHelp"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="example2" className="form-label">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  name="lastname"
                  className="form-control"
                  disabled={edit}
                  id="example2"
                  value={formik.values.mobile}
                  onChange={formik.handleChange("mobile")}
                  onBlur={formik.handleBlur("mobile")}
                />
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile}
                </div>
              </div>
              {edit === false && (
                <button type="submit" className="btn btn-primary">
                  Lưu
                </button>
              )}
            </form>
          </div>
        </div>
      </Container>
      <div className=" d-flex justify-content-center align-items-center">
        <Link to="/logout" className="banner-btn mb-4">
          Đăng xuất
        </Link>
      </div>
    </>
  );
};

export default Profile;
