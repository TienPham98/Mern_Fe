import React from "react";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch } from "react-redux";
import { logoutUser } from "../features/user/userSlice";

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

      <Container class1="logout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Bạn có muốn đăng xuất?</h3>
              <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                <button
                  className="primary-button border-0"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </button>
                <Link to="/" className="primary-button signup">
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
