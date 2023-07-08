import React from "react";
import {Link, useNavigate} from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import {useDispatch} from "react-redux";
import {logoutUser} from "../features/user/userSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:5000/api/user/logout", true);
    xhr.withCredentials = true;
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
      }
    };
    xhr.send();
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <>
      <Meta title={"Đăng xuất"} />
      <BreadCrumb title="Đăng xuất" />

      <Container class1="logout-wrapper py-2 home-wrapper-2">
        <div className="row d-flex justify-content-center">
          <div className="col-12 col-lg-6">
            <div className="auth-card">
              <h3 className="text-center mb-3">Bạn có muốn đăng xuất?</h3>
              <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                <button
                  className="login-btn my-4 py-2 px-2 "
                  onClick={handleLogout}
                >
                  Đăng xuất
                </button>
                <Link to="/" className="login-btn my-4  mx-4 py-2 px-2">
                  Hủy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Logout;
