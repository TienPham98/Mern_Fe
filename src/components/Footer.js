import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <footer className="py-4 px-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer-top-data d-flex mx-4 gap-30 align-items-center">
                {/* <img src="images/newsletter.png" alt="newsletter" /> */}
                <h3 className="text-white mb-0 ">Đăng kí để xem các ưu đãi</h3>
              </div>
            </div>
            <div className="col-2"></div>
            <div className="col-5">
              <div className="input-group mb-2">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Địa chỉ email của bạn"
                  aria-label="Địa chỉ email của bạn"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text px-3" id="basic-addon2">
                  Đăng kí
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4 px-5 d-flex">
        <div className="container-xxl">
          <div className="row">
            <div className="col-3">
              <h4 className="text-white mb-4 ">Liên hệ</h4>
              <div>
                <address className="text-white d-flex">
                  123 Nhật Tiến
                  <br /> Hoàng Mai, Hà Nội
                </address>
                <a
                  href="tel:+84 965273494 "
                  className="mt-2 d-block text-white"
                >
                  +84 96527 3494
                </a>
                <a
                  href="mailto:nhattien.ee@gmail.com"
                  className="mt-2 d-block text-white"
                >
                  Nhattien.ee@gmail.com
                </a>
                <div className="social icons d-flex align-items-center gap-15 mt-2">
                  <a
                    className="text-white"
                    href="https://linkedin.com/in/tienpham198"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <BsLinkedin />
                  </a>
                  <a
                    className="text-white"
                    href="https://github.com/tienpham98"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <BsGithub />
                  </a>

                  <a
                    className="text-white"
                    href="https://instagram.com/shiro_260298"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <BsInstagram />
                  </a>

                  <a
                    className="text-white"
                    href="https://youtube.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <BsYoutube />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Thông tin</h4>
              <div className="footer-link d-flex flex-column">
                <Link className="text-white py-2">Chính sách hoàn trả</Link>
                <Link className="text-white py-2">Chính sách vận chuyển</Link>
                <Link className="text-white py-2">Chất lượng sản phẩm </Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Tài khoản</h4>
              <div className="footer-link d-flex flex-column">
                <Link className="text-white py-2">Về chúng tôi</Link>
                <Link className="text-white py-2">Faq</Link>
                <Link className="text-white py-2">Liên hệ</Link>
                <Link className="text-white py-2">Chăm sóc khách hàng</Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Truy cập nhanh</h4>
              <div className="footer-link d-flex flex-column">
                <Link className="text-white py-2">Laptops</Link>
                <Link className="text-white py-2">HeadPhone</Link>
                <Link className="text-white py-2">Tablets</Link>
                <Link className="text-white py-2">Watch</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-3 ">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white ">
                &copy; {new Date().getFullYear()}: Powered by TienPham
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
