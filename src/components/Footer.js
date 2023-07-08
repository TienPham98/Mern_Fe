import React from "react";
import {Link} from "react-router-dom";
import {
  BsLinkedin,
  BsGithub,
  BsYoutube,
  BsInstagram,
  BsMailbox,
  BsMailbox2,
  BsEnvelope,
  BsPhoneFlip,
  BsPhone,
  BsMap,
} from "react-icons/bs";
import payment from "../assets/images/payment.png";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer-category">
          <div className="container">
            <h2 className="footer-category-title">Product directory</h2>

            <div className="footer-category-box">
              <h3 className="category-box-title">Chăm sóc sức khỏe :</h3>

              <a href="/" className="footer-category-link">
                Vitamin
              </a>
              <a href="/" className="footer-category-link">
                Bổ não
              </a>
              <a href="/" className="footer-category-link">
                Bổ mắt
              </a>
              <a href="/" className="footer-category-link">
                DHA
              </a>
              <a href="/" className="footer-category-link">
                Dầu cá
              </a>
              <a href="/" className="footer-category-link">
                Tinh dầu hoa anh thảo
              </a>
            </div>

            <div className="footer-category-box">
              <h3 className="category-box-title">Chăm sóc sắc đẹp :</h3>

              <a href="/" className="footer-category-link">
                Collagen
              </a>
              <a href="/" className="footer-category-link">
                Vitamin E
              </a>
              <a href="/" className="footer-category-link">
                Vitamin E
              </a>
              <a href="/" className="footer-category-link">
                Vitamin E
              </a>
              <a href="/" className="footer-category-link">
                Vitamin E
              </a>
              <a href="/" className="footer-category-link">
                Vitamin E
              </a>
              <a href="/" className="footer-category-link">
                Vitamin E
              </a>
              <a href="/" className="footer-category-link">
                Vitamin E
              </a>
              <a href="/" className="footer-category-link">
                Vitamin E
              </a>
              <a href="/" className="footer-category-link">
                Vitamin E
              </a>
            </div>

            <div className="footer-category-box">
              <h3 className="category-box-title">Dành cho trẻ nhỏ :</h3>

              <a href="/" className="footer-category-link">
                DHA
              </a>
              <a href="/" className="footer-category-link">
                Sữa
              </a>
              <a href="/" className="footer-category-link">
                Vitamin
              </a>
              <a href="/" className="footer-category-link">
                Kẹo gummy
              </a>
              <a href="/" className="footer-category-link">
                Dầu cá
              </a>
              <a href="/" className="footer-category-link">
                Vitamin D3
              </a>
              <a href="/" className="footer-category-link">
                Kẽm
              </a>
              <a href="/" className="footer-category-link">
                Vitamin C
              </a>
              <a href="/" className="footer-category-link">
                Vitamin C
              </a>
              <a href="/" className="footer-category-link">
                Vitamin C
              </a>
              <a href="/" className="footer-category-link">
                Vitamin C
              </a>
            </div>

            <div className="footer-category-box">
              <h3 className="category-box-title">Dành cho người lớn tuổi:</h3>

              <a href="/" className="footer-category-link">
                Bổ não
              </a>
              <a href="/" className="footer-category-link">
                Viên uống xương khớp
              </a>
              <a href="/" className="footer-category-link">
                Sữa
              </a>
              <a href="/" className="footer-category-link">
                Vitamin
              </a>
              <a href="/" className="footer-category-link">
                Vitamin
              </a>
              <a href="/" className="footer-category-link">
                Vitamin
              </a>
              <a href="/" className="footer-category-link">
                Vitamin
              </a>
            </div>
          </div>
        </div>

        <div className="footer-nav">
          <div className="container">
            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <h2 className="nav-title">Popular Categories</h2>
              </li>

              <li className="footer-nav-item">
                <a href="/" className="footer-nav-link">
                  Fashion
                </a>
              </li>

              <li className="footer-nav-item">
                <a href="/" className="footer-nav-link">
                  Electronic
                </a>
              </li>

              <li className="footer-nav-item">
                <a href="/" className="footer-nav-link">
                  Cosmetic
                </a>
              </li>

              <li className="footer-nav-item">
                <a href="/" className="footer-nav-link">
                  Health
                </a>
              </li>

              <li className="footer-nav-item">
                <a href="/" className="footer-nav-link">
                  Watches
                </a>
              </li>
            </ul>

            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <h2 className="nav-title">Products</h2>
              </li>

              <li className="footer-nav-item">
                <a href="/" className="footer-nav-link">
                  Prices drop
                </a>
              </li>

              <li className="footer-nav-item">
                <a href="/" className="footer-nav-link">
                  New products
                </a>
              </li>

              <li className="footer-nav-item">
                <a href="/" className="footer-nav-link">
                  Best sales
                </a>
              </li>

              <li className="footer-nav-item">
                <a href="/contact" className="footer-nav-link">
                  Contact us
                </a>
              </li>

              <li className="footer-nav-item">
                <a href="/contact" className="footer-nav-link">
                  Sitemap
                </a>
              </li>
            </ul>

            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <h2 className="nav-title">Our Company</h2>
              </li>

              <li className="footer-nav-item">
                <a href="/" className="footer-nav-link">
                  Delivery
                </a>
              </li>

              <li className="footer-nav-item">
                <a href="/" className="footer-nav-link">
                  Legal Notice
                </a>
              </li>

              <li className="footer-nav-item">
                <a href="/" className="footer-nav-link">
                  Terms and conditions
                </a>
              </li>

              <li className="footer-nav-item">
                <a href="/" className="footer-nav-link">
                  About us
                </a>
              </li>

              <li className="footer-nav-item">
                <a href="/" className="footer-nav-link">
                  Secure payment
                </a>
              </li>
            </ul>

            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <h2 className="nav-title">Services</h2>
              </li>

              <li className="footer-nav-item">
                <a href="/" className="footer-nav-link">
                  Prices drop
                </a>
              </li>

              <li className="footer-nav-item">
                <a href="/" className="footer-nav-link">
                  New products
                </a>
              </li>

              <li className="footer-nav-item">
                <a href="/" className="footer-nav-link">
                  Best sales
                </a>
              </li>

              <li className="footer-nav-item">
                <a href="/" className="footer-nav-link">
                  Contact us
                </a>
              </li>

              <li className="footer-nav-item">
                <a href="/" className="footer-nav-link">
                  Sitemap
                </a>
              </li>
            </ul>

            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <h2 className="nav-title">Contact</h2>
              </li>

              <li className="footer-nav-item flex">
                <div className="icon-box">
                  <BsMap />
                </div>

                <address className="content">
                  Số 1 Đại lộ Chu Văn An, Hoàng Mai, HN
                </address>
              </li>

              <li className="footer-nav-item flex">
                <div className="icon-box">
                  <BsPhone />
                </div>

                <a href="tel:+ 849.2555.246" className="footer-nav-link mt-2 ">
                  039.2555.246
                </a>
              </li>

              <li className="footer-nav-item flex">
                <div className="icon-box">
                  <BsEnvelope />
                </div>

                <a
                  href="mailto:hoale@gmail.com"
                  className="footer-nav-link mt-2"
                >
                  hoale@gmail.com
                </a>
              </li>
            </ul>

            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <h2 className="nav-title">Follow Us</h2>
              </li>

              <li>
                <ul className="social-link">
                  <li className="footer-nav-item">
                    <a href="/" className="footer-nav-link">
                      <ion-icon name="logo-facebook"></ion-icon>
                    </a>
                  </li>

                  <li className="footer-nav-item">
                    <a href="/" className="footer-nav-link">
                      <ion-icon name="logo-twitter"></ion-icon>
                    </a>
                  </li>

                  <li className="footer-nav-item">
                    <a href="/" className="footer-nav-link">
                      <ion-icon name="logo-linkedin"></ion-icon>
                    </a>
                  </li>

                  <li className="footer-nav-item">
                    <a href="/" className="footer-nav-link">
                      <ion-icon name="logo-instagram"></ion-icon>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="container">
            <img src={payment} alt="payment method" className="payment-img" />

            <p className="copyright">
              Copyright &copy;{" "}
              <a href="https://nhattien.vercel.app/" className="text-white">
                NhatTien98
              </a>{" "}
              all rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
