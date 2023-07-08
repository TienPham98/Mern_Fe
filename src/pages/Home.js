import React, {useEffect} from "react";
import Meta from "../components/Meta";
import {
  getAllProducts,
  getProductCategories,
} from "../features/products/productSlice";
import {useDispatch, useSelector} from "react-redux";
import {getAllBlogs} from "../features/blogs/blogSlice";

import wishlist from "../assets/images/wishlist.svg";
import GrFb from "../assets/images/gr-fb.png";
import quotes from "../assets/images/icons/quotes.svg";
import ctaBanner from "../assets/images/cta-banner.jpg";
import ProductShowcase from "../components/ProductShowcase";
import NewShowcase from "../components/NewShowcase";
import BlogCard2 from "../components/BlogCard2";
import BannerSlider from "../components/BannerSlider";
import ProductDeal from "../components/ProductDeal";
import {FaMoneyCheckAlt} from "react-icons/fa";
import {IoArrowUndoOutline} from "react-icons/io5";
import {MdLocalShipping} from "react-icons/md";
import BestSeller from "../components/BestSeller";
import {BiPhoneCall} from "react-icons/bi";
import {BsFillRocketFill} from "react-icons/bs";

const Home = () => {
  const dispatch = useDispatch();

  const allProduct = useSelector((state) => state.product?.products);
  const allBlogs = useSelector((state) => state.blog?.blogs);
  const allCategories = useSelector((state) => state.product?.categories);

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

      <div className="banner">
        <BannerSlider />
      </div>
      {/* Banner end */}

      {/* Categories start */}
      <div className="category">
        <div className="container">
          {/* <div className="category-item-container has-scrollbar">
            <div className="category-item">
              <div className="category-img-box">
                <img src={wishlist} alt="dress & frock" width="30" />
              </div>

              <div className="category-content-box">
                <div className="category-content-flex">
                  <h3 className="category-item-title">Vitamin</h3>

                  <p className="category-item-amount">(53)</p>
                </div>

                <a href={`/product?category=Vitamin`} className="category-btn">
                  xem thêm
                </a>
              </div>
            </div>

            <div className="category-item">
              <div className="category-img-box">
                <img src={wishlist} alt="winter wear" width="30" />
              </div>

              <div className="category-content-box">
                <div className="category-content-flex">
                  <h3 className="category-item-title">Collagen</h3>

                  <p className="category-item-amount">(58)</p>
                </div>

                <a href={`/product?category=Collagen`} className="category-btn">
                  xem thêm
                </a>
              </div>
            </div>

            <div className="category-item">
              <div className="category-img-box">
                <img src={wishlist} alt="glasses & lens" width="30" />
              </div>

              <div className="category-content-box">
                <div className="category-content-flex">
                  <h3 className="category-item-title">Omega</h3>

                  <p className="category-item-amount">(68)</p>
                </div>

                <a href={`/product?category=Omega`} className="category-btn">
                  xem thêm
                </a>
              </div>
            </div>

            <div className="category-item">
              <div className="category-img-box">
                <img src={wishlist} alt="shorts & jeans" width="30" />
              </div>

              <div className="category-content-box">
                <div className="category-content-flex">
                  <h3 className="category-item-title">Sắt & Kẽm</h3>

                  <p className="category-item-amount">(84)</p>
                </div>

                <a href={`/product?category=Sat`} className="category-btn">
                  xem thêm
                </a>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* categories end */}

      {/* Product Container */}
      <div className="product-container">
        <div className="container">
          {/*  SIDEBAR */}

          <div className="sidebar  has-scrollbar" data-mobile-menu>
            <div className="sidebar-category">
              <div className="sidebar-top">
                <h2 className="sidebar-title">Category</h2>
                <button
                  className="sidebar-close-btn"
                  data-mobile-menu-close-btn
                >
                  <ion-icon name="close-outline"></ion-icon>
                </button>
              </div>

              <ul className="sidebar-menu-category-list">
                {allCategories.map((category, index) => (
                  <li className="sidebar-menu-category" key={index}>
                    <button
                      className="sidebar-accordion-menu"
                      data-accordion-btn
                    >
                      <div className="menu-title-flex">
                        <p className="menu-title">{category.title}</p>
                      </div>
                      {/* <div>
                        <MdOutlineAdd className="menu-add-icon" />
                      </div> */}
                    </button>

                    {/* <ul className="sidebar-submenu-category-list" data-accordion>
                    <li className="sidebar-submenu-category">
                      <a href="/" className="sidebar-submenu-title">
                        <p className="product-name">Shirt</p>
                        <data
                          value="300"
                          className="stock"
                          title="Available Stock"
                        >
                          300
                        </data>
                      </a>
                    </li>

                    <li className="sidebar-submenu-category">
                      <a href="/" className="sidebar-submenu-title">
                        <p className="product-name">shorts & jeans</p>
                        <data
                          value="60"
                          className="stock"
                          title="Available Stock"
                        >
                          60
                        </data>
                      </a>
                    </li>

                    <li className="sidebar-submenu-category">
                      <a href="/" className="sidebar-submenu-title">
                        <p className="product-name">jacket</p>
                        <data
                          value="50"
                          className="stock"
                          title="Available Stock"
                        >
                          50
                        </data>
                      </a>
                    </li>

                    <li className="sidebar-submenu-category">
                      <a href="/" className="sidebar-submenu-title">
                        <p className="product-name">dress & frock</p>
                        <data
                          value="87"
                          className="stock"
                          title="Available Stock"
                        >
                          87
                        </data>
                      </a>
                    </li>
                  </ul> */}
                  </li>
                ))}
              </ul>
            </div>

            <div className="product-showcase">
              <h3 className="showcase-heading">best sellers</h3>

              <div className="showcase-wrapper">
                <BestSeller count={4} data={topSoldProducts} />
              </div>
            </div>
          </div>

          <div className="product-box">
            {/* PRODUCT MINIMAL */}

            <div className="product-minimal">
              <ProductShowcase title="Sản phẩm mới" productCount={6} />
              <ProductShowcase title="Bán chạy" productCount={6} />
              <ProductShowcase title="Đánh giá tốt" productCount={6} />
            </div>

            {/* PRODUCT FEATURED */}

            <ProductDeal />

            {/* PRODUCT GRID */}

            <div className="product-main">
              <h2 className="title">New Products</h2>

              <NewShowcase productCount={12} />
            </div>
          </div>
        </div>

        <div>
          <div className="container">
            <div className="testimonials-box">
              <div className="testimonial">
                <h2 className="title">Group Bán Hàng</h2>

                <div className="testimonial-card">
                  <img
                    src={GrFb}
                    alt="Group-fb"
                    className="testimonial-banner"
                  />

                  <p className="testimonial-name">Hòa Lê Authentic</p>

                  <p className="testimonial-title">Chuyên hàng chính hãng</p>

                  <a
                    href=" https://www.facebook.com/groups/hoaleauthentic"
                    className="banner-btn mb-2 w-100"
                  >
                    Click để tham gia nhóm
                  </a>

                  <img
                    src={quotes}
                    alt="quotation"
                    className="quotation-img"
                    width="26"
                  />

                  <p className="testimonial-desc">
                    Chúng tôi cung cấp các sản phẩm chính hãng của các nước: Úc,
                    Anh, Mỹ, Đức, Hàn, Nhật
                  </p>
                </div>
              </div>

              <div className="cta-container">
                <img
                  src={ctaBanner}
                  alt="summer collection"
                  className="cta-banner"
                />

                <a href="/product" className="cta-content">
                  <p className="discount">25% Discount</p>

                  <h2 className="cta-title">Summer collection</h2>

                  <p className="cta-text">Starting 200.000 đ</p>

                  <button className="cta-btn">Shop now</button>
                </a>
              </div>

              <div className="service">
                <h2 className="title">Our Services</h2>

                <div className="service-container">
                  <a href="#" className="service-item">
                    <div className="service-icon">
                      <MdLocalShipping className="service-icon-logo mb-4" />
                    </div>

                    <div className="service-content">
                      <h3 className="service-title">Vận chuyển nhanh</h3>
                      <p className="service-desc">Gửi hàng ngay trong ngày</p>
                    </div>
                  </a>

                  <a href="#" className="service-item">
                    <div className="service-icon">
                      <BsFillRocketFill className="service-icon-logo mb-4" />
                    </div>
                    <div className="service-content">
                      <h3 className="service-title">Ship nhanh nội thành</h3>
                      <p className="service-desc">Ship nhanh Hà Nội</p>
                    </div>
                  </a>

                  <a href="#" className="service-item">
                    <div className="service-icon">
                      <BiPhoneCall className="service-icon-logo mb-4" />
                    </div>

                    <div className="service-content">
                      <h3 className="service-title">Hỗ trợ nhanh chóng</h3>
                      <p className="service-desc">Hours: 8AM - 11PM</p>
                    </div>
                  </a>

                  <a href="#" className="service-item">
                    <div className="service-icon">
                      <IoArrowUndoOutline className="service-icon-logo mb-4" />
                    </div>

                    <div className="service-content">
                      <h3 className="service-title">Hỗ trợ đổi trả</h3>
                      <p className="service-desc">Hỗ trợ đổi trả nhanh, gọn</p>
                    </div>
                  </a>

                  <a href="#" className="service-item">
                    <div className="service-icon">
                      <FaMoneyCheckAlt className="service-icon-logo mb-4" />
                    </div>

                    <div className="service-content">
                      <h3 className="service-title">Ưu đãi liên tục</h3>
                      <p className="service-desc">Ưu đãi hàng tuần</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blogs */}
        <div className="blog">
          <h2 className="title d-flex justify-content-center mt-2 ">
            <a href="/blogs" className="title mb-0">
              Tin tức
            </a>
          </h2>
          <div className="mx-3">
            <BlogCard2 amount={4} blogs={allBlogs} />
          </div>
          <a
            href="/blogs"
            className="blog-title d-flex justify-content-center mt-2"
          >
            Xem thêm
          </a>
        </div>
        {/* Blogs end here */}
      </div>
    </>
  );
};

export default Home;
