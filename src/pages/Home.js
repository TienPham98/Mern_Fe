import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProduct from "../components/SpecialProduct";
import Container from "../components/Container";
import { services } from "../utils/Data";
import Meta from "../components/Meta";
import {
  getAllProducts,
  getProductCategories,
} from "../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";

const Home = () => {
  const dispatch = useDispatch();

  const allProduct = useSelector((state) => state.product?.products);
  const allBlogs = useSelector((state) => state.blog?.blogs);

  useEffect(() => {
    dispatch(getProductCategories());
    dispatch(getAllProducts());
    dispatch(getAllBlogs());
  }, [dispatch]);

  const topSoldProducts = allProduct
    ?.slice()
    ?.sort((a, b) => b?.sold - a?.sold)
    ?.slice(0, 8);

  const latestBlogs = allBlogs
    ?.slice()
    ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    ?.slice(0, 4);

  return (
    <>
      <Meta title={"Hoà Lê Authentic"} />
      <Container class1="home-wrapper-1 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <div className="main-banner position-relative ">
                <img
                  src="images/main-banner-1.png"
                  className="img-fluid rounded-3"
                  alt="main-banner"
                />
                <div className="main-banner-content position-absolute">
                  <Link to="/product" className="primary-button">
                    Xem thêm
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex flex-wrap gap-20 justify-content-between align-items-center">
                <div className="small-banner position-relative">
                  <div class="card">
                    <img
                      className="card-image"
                      src="images/b-1.png"
                      alt="brand"
                    />
                    <div class="category"> Best seller </div>
                    <div class="heading">Vitamin e krikland</div>
                    <button class="btn">Xem ngay</button>
                  </div>
                </div>
                <div className="small-banner position-relative">
                  <div class="card">
                    <img
                      className="card-image"
                      src="images/b-2.png"
                      alt="brand"
                    />
                    <div class="category"> Best seller </div>
                    <div class="heading">Vitamin tổng hợp</div>
                    <button class="btn">Xem ngay</button>
                  </div>
                </div>
                <div className="small-banner position-relative ">
                  <div class="card">
                    <img
                      className="card-image"
                      src="images/b-3.png"
                      alt="brand"
                    />
                    <div class="category"> Best seller </div>
                    <div class="heading">Canxi D3 tổng hợp</div>
                    <button class="btn">Xem ngay</button>
                  </div>
                </div>
                <div className="small-banner position-relative ">
                  <div class="card">
                    <img
                      className="card-image"
                      src="images/b-4.png"
                      alt="brand"
                    />
                    <div class="category"> Best seller </div>
                    <div class="heading">Dầu cá BlackMores</div>
                    <button class="btn">Xem ngay</button>
                  </div>
                </div>
                <div className="small-banner position-relative ">
                  <div class="card">
                    <img
                      className="card-image"
                      src="images/b-5.png"
                      alt="brand"
                    />
                    <div class="category"> Best seller </div>
                    <div class="heading">Bổ xương khớp</div>
                    <button class="btn">Xem ngay</button>
                  </div>
                </div>
                <div className="small-banner position-relative ">
                  <div class="card">
                    <img
                      className="card-image"
                      src="images/b-6.png"
                      alt="brand"
                    />
                    <div class="category"> Best seller </div>
                    <div class="heading">Omega 3-6-9</div>
                    <button class="btn">Xem ngay</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-3 px-3">
        <div className="row">
          <div className="col-12">
            <div className="servies d-flex align-items-center justify-content-between">
              {services?.map((i, j) => {
                return (
                  <div className="d-flex align-items-center gap-15" key={j}>
                    <img src={i.image} alt="services" />
                    <div>
                      <h6>{i.title}</h6>
                      <p className="mb-0">{i.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
      {/* <Container class1="home-wrapper-2 py-3">
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex justify-content-between flex-wrap align-items-center">
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Máy ảnh</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Camera</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart Tv</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/tv.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Headphone</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Máy ảnh</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Camera</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart Tv</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/tv.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Headphone</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>
            </div>
          </div>
        </div>
      </Container> */}
      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Sản phẩm nổi bật</h3>
          </div>
          <ProductCard data={topSoldProducts} amount={20} />
        </div>
      </Container>

      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Sản phẩm đặc biệt</h3>
          </div>
        </div>
        <div className="row">
          {allProduct &&
            allProduct
              .filter((item) => item.tags === "special")
              .map((item, index) => (
                <SpecialProduct
                  key={index}
                  title={item?.title}
                  brand={item?.brand}
                  price={item?.price}
                  quantity={item?.quantity}
                  images={item?.images}
                  id={item?._id}
                />
              ))}
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Sản phẩm phổ biến </h3>
          </div>
        </div>
        <div className="row">
          <ProductCard data={allProduct} amount={24} title="popular" />
        </div>
      </Container>
      <Container class1="marque-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper d-flex card-wrapper ">
              <Marquee className="d-flex align-items-center">
                <div className="d-flex mx-4 justify-content-center align-items-center">
                  <img
                    className="img-fluid"
                    src="images/brand-01.png"
                    alt="brand"
                  />
                </div>
                <div className="d-flex mx-4 justify-content-center align-items-center">
                  <img
                    className="img-fluid"
                    src="images/brand-02.png"
                    alt="brand"
                  />
                </div>
                <div className="d-flex mx-4 justify-content-center align-items-center">
                  <img
                    className="img-fluid"
                    src="images/brand-03.png"
                    alt="brand"
                  />
                </div>
                <div className="d-flex mx-4 justify-content-center align-items-center">
                  <img
                    className="img-fluid"
                    src="images/brand-04.png"
                    alt="brand"
                  />
                </div>
                <div className="d-flex mx-4 justify-content-center align-items-center">
                  <img
                    className="img-fluid mt-5"
                    src="images/brand-05.png"
                    alt="brand"
                  />
                </div>
                <div className="d-flex mx-4 justify-content-center align-items-center">
                  <img
                    className="img-fluid mt-2"
                    src="images/brand-06.png"
                    alt="brand"
                  />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="btn-container mb-4">
              <a className="btn-content" href="blogs">
                <span className="btn-title">Tin tức</span>
                <span className="icon-arrow">
                  <svg
                    width="66px"
                    height="43px"
                    viewBox="0 0 66 43"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      id="arrow"
                      stroke="none"
                      strokeWidth="1"
                      fill="none"
                      fillRule="evenodd"
                    >
                      <path
                        id="arrow-icon-one"
                        d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                        fill="#FFFFFF"
                      ></path>
                      <path
                        id="arrow-icon-two"
                        d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                        fill="#FFFFFF"
                      ></path>
                      <path
                        id="arrow-icon-three"
                        d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                        fill="#FFFFFF"
                      ></path>
                    </g>
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <BlogCard blogs={latestBlogs} amount={4} />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
