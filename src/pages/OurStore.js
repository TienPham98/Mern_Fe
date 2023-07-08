import React, {useState, useEffect} from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import {
  getAllProducts,
  getProductCategories,
  getProductsByCat,
} from "../features/products/productSlice";
import {useDispatch, useSelector} from "react-redux";
import BlogCard2 from "../components/BlogCard2";
import {getAllBlogs} from "../features/blogs/blogSlice";
import BestSeller from "../components/BestSeller";
import RecommendProd from "../components/RecommendProd";
import NewShowcase from "../components/NewShowcase";
import AllProduct from "../components/AllProduct";
import {Link} from "react-router-dom";

const OurStore = () => {
  const dispatch = useDispatch();

  const productState = useSelector((state) => state?.product?.products);
  const productByCatState = useSelector(
    (state) => state?.product?.productsByCat
  );
  const allCategories = useSelector((state) => state.product?.categories);
  const allBlogs = useSelector((state) => state.blog?.blogs);

  const queryParams = new URLSearchParams(window.location.search);
  const selectedCategory = queryParams.get("category");

  useEffect(() => {
    dispatch(getProductsByCat({category: selectedCategory}));
    dispatch(getAllBlogs());
  }, [dispatch]);

  const topSoldProducts = productState
    ?.slice()
    ?.sort((a, b) => b?.sold - a?.sold)
    ?.slice(0, 8);

  const latestBlogs = allBlogs
    ?.slice()
    ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    ?.slice(0, 4);

  const [grid, setGrid] = useState(4);

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  // filter State
  const [tag, setTag] = useState(null);
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);

  useEffect(() => {
    let newBrands = [];
    let category = [];
    let newTags = [];
    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      newBrands.push(element.brand);
      category.push(element.category);
      newTags.push(element.tags);
    }
    setBrands(newBrands);
    setCategories(category);
    setTags(newTags);
  }, [productState]);

  useEffect(() => {
    getProducts();
  }, [sort, tag, category, brand, minPrice, maxPrice]);
  const getProducts = () => {
    dispatch(getAllProducts({sort, tag, category, brand, minPrice, maxPrice}));
  };

  return (
    <>
      <Meta title={"Sản phẩm"} />
      <BreadCrumb title="Sản phẩm" />

      <div className="product-container my-4">
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
                        <a href={`/product?category=${category.title}`}>
                          <p className="menu-title">{category.title}</p>
                        </a>
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

            <div className="product-main">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="title">Tất cả sản phẩm</h2>
                <div className="d-flex align-items-center ">
                  <p className="mb-4 d-block">Sắp xếp :</p>
                  <select
                    name=""
                    defaultValue={"manual"}
                    className="form-control-filter mb-4 mx-2"
                    id=""
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="manual">Mặc định</option>
                    <option value="title">Từ A-Z</option>
                    <option value="-title">Từ Z-A</option>
                    <option value="price">Giá thấp đến cao</option>
                    <option value="-price">Giá cao xuống thấp</option>
                    <option value="createdAt">Mới nhất</option>
                    <option value="-createdAt">Cũ nhất</option>
                  </select>
                </div>
              </div>

              <AllProduct
                product={productByCatState || productState}
                productCount={999}
              />
            </div>
          </div>
        </div>
        <div className="product-box">
          <h6 className="text-center my-4">Sản phẩm gợi ý</h6>
          <RecommendProd amount={10} />
        </div>

        {/* <div>
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
        </div> */}

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
      </div>
    </>
  );
};

export default OurStore;
