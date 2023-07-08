import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {NavLink, Link, useNavigate} from "react-router-dom";
import {
  BsCart3,
  BsFillMenuAppFill,
  BsMenuButton,
  BsSearch,
  BsTelephonePlusFill,
} from "react-icons/bs";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaRegUser,
  FaRegHeart,
  FaHome,
} from "react-icons/fa";
import {GiHamburgerMenu} from "react-icons/gi";
import {GrAdd} from "react-icons/gr";
import {MdRemove} from "react-icons/md";
import {AiOutlineClose} from "react-icons/ai";

import {useSelector, useDispatch} from "react-redux";
import {getUserCart, logoutUser} from "../features/user/userSlice";
import {getProductCategories} from "../features/products/productSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth?.user);
  const products = useSelector((state) => state.product?.products);
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const allCategories = useSelector((state) => state.product?.categories);
  const [total, setTotal] = useState(0);
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    if (currentUser) {
      dispatch(getUserCart());
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    let sum = 0;
    let quantity = 0;
    for (let index = 0; index < cartState?.length; index++) {
      quantity += Number(cartState[index]?.quantity);
      sum += Number(cartState[index]?.quantity) * cartState[index]?.price;
    }
    setTotal(sum);
    setCartQuantity(quantity);
  }, [cartState]);
  useEffect(() => {
    dispatch(getProductCategories());
  }, [dispatch]);

  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSearchResultClicked, setIsSearchResultClicked] = useState(false);
  const [closeSearchTimeout, setCloseSearchTimeout] = useState(null);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    const results = products.filter((product) =>
      product.title.toLowerCase().includes(value.toLowerCase())
    );
    setIsLoading(true);
    setTimeout(() => {
      setSearchResults(results);
      setIsLoading(false);
    }, 500);
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (!isSearchResultClicked) {
        setIsSearchOpen(false);
        setSearchValue("");
      }
    }, 200);
    setIsSearchResultClicked(false);
  };
  function handleSearchResultClick() {
    setIsSearchResultClicked(true);
    clearTimeout(closeSearchTimeout);
  }

  useEffect(() => {
    // mobile menu variables
    const mobileMenuOpenBtns = document.querySelectorAll(
      "[data-mobile-menu-open-btn]"
    );
    const mobileMenuCloseBtns = document.querySelectorAll(
      "[data-mobile-menu-close-btn]"
    );
    const mobileMenu = document.querySelector("[data-mobile-menu]");

    // mobile menu open function
    const mobileMenuOpenFunc = function () {
      mobileMenu.classList.add("active");
    };

    // mobile menu close function
    const mobileMenuCloseFunc = function () {
      mobileMenu.classList.remove("active");
    };

    // mobile menu eventListeners
    mobileMenuOpenBtns.forEach(function (btn) {
      btn.addEventListener("click", mobileMenuOpenFunc);
    });

    mobileMenuCloseBtns.forEach(function (btn) {
      btn.addEventListener("click", mobileMenuCloseFunc);
    });

    // accordion variables
    const accordionBtn = document.querySelectorAll("[data-accordion-btn]");
    const accordionContent = document.querySelectorAll("[data-accordion]");

    // accordion function
    const accordionFunc = function () {
      this.classList.toggle("active");
      const accordionContent = this.nextElementSibling;
      accordionContent.classList.toggle("active");
    };

    // accordion eventListeners
    accordionBtn.forEach(function (btn) {
      btn.addEventListener("click", accordionFunc);
    });

    // Clean up event listeners when component unmounts
    return () => {
      mobileMenuOpenBtns.forEach(function (btn) {
        btn.removeEventListener("click", mobileMenuOpenFunc);
      });

      mobileMenuCloseBtns.forEach(function (btn) {
        btn.removeEventListener("click", mobileMenuCloseFunc);
      });

      accordionBtn.forEach(function (btn) {
        btn.removeEventListener("click", accordionFunc);
      });
    };
  }, []);

  return (
    <>
      <header>
        <div className="header-top">
          <div className="container mb-1 ">
            <ul className="header-social-container mb-0">
              <li>
                <a
                  href="https://www.facebook.com/groups/hoaleauthentic"
                  className="social-link"
                >
                  <FaFacebook />
                </a>
              </li>

              <li>
                <a href="/" className="social-link">
                  <FaTwitter />
                </a>
              </li>

              <li>
                <a href="/" className="social-link">
                  <FaInstagram />
                </a>
              </li>

              <li>
                <a href="/" className="social-link">
                  <FaLinkedin></FaLinkedin>
                </a>
              </li>
            </ul>

            <div className="header-alert-news mb-0">
              <p className="mb-0">
                Hòa Lê Authentic - Hàng úc chính hãng giá tốt
              </p>
            </div>

            <div className="header-top-actions">
              <p className="contact d-flex  mb-0">
                Hotline:
                <a className="mx-2" href="tel: +84 965273494">
                  <BsTelephonePlusFill className="" /> 096 527 3494
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="header-main">
          <div className="container">
            <a href="/" className="header-logo">
              <h3>Hòa Lê Authentic</h3>
            </a>

            <div className="header-search-container">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control "
                  placeholder="Tìm kiếm sản phẩm"
                  aria-label="Tìm kiếm sản phẩm"
                  autoComplete="off"
                  aria-describedby="basic-addon2"
                  onChange={handleSearch}
                  value={searchValue}
                  onFocus={() => setIsSearchOpen(true)}
                  onBlur={handleBlur}
                />
                <span className="input-group-text" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
              {searchValue && isSearchOpen && (
                <div
                  className=" search-product position-absolute bg-white border border-secondary h-40 "
                  // onMouseLeave={() => setSearchValue("")}
                >
                  {isLoading ? (
                    <div></div>
                  ) : !searchResults.length ? (
                    <div></div>
                  ) : (
                    <ul className="list-group ">
                      {searchResults.map(({title, images, _id}) => (
                        <Link
                          key={_id}
                          className="list-group-item list-group-item-action"
                          to={`/product/${_id}`}
                        >
                          <div className="d-flex align-items-center">
                            <div
                              className="me-3 flex-shrink-0"
                              style={{width: 80}}
                            >
                              <img
                                src={images[0]?.url}
                                alt={title}
                                className="img-fluid rounded"
                              />
                            </div>
                            <div className="flex-grow-1">
                              <div className="fw-bold">{title}</div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            <div className="header-user-actions">
              <div>
                <Link to="/wishlist">
                  <button className="action-btn">
                    <FaRegHeart />
                  </button>
                </Link>
              </div>

              <div>
                {currentUser ? (
                  <div>
                    <Link to="/profile">
                      <button className="action-btn">
                        <FaRegUser />
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div>
                    <Link to="/login">
                      <button className="action-btn">
                        <FaRegUser />
                      </button>
                    </Link>
                  </div>
                )}
              </div>
              <div>
                <Link to="/cart">
                  <button className="action-btn">
                    <BsCart3 />
                    <span className="count">
                      {cartState?.length ? cartState?.length : 0}
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <nav className="desktop-navigation-menu">
          <div className="container">
            <ul className="desktop-menu-category-list">
              <li className="menu-category">
                <a href="/" className="menu-title">
                  Trang chủ
                </a>
              </li>

              <li className="menu-category">
                <a href="/" className="menu-title">
                  Phân loại
                </a>

                <div className="dropdown-panel">
                  <ul className="dropdown-panel-list">
                    <li className="menu-title">
                      <a href="/">Thực phẩm chức năng</a>
                    </li>

                    {/* <li className="panel-list-item">
                      <a href={`/product?category=Vitamin}`}>Vitamin</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="/">Collagen</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="/">Omega</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="/">Phân loại 4</a>
                    </li>*/}
                  </ul>

                  <ul className="dropdown-panel-list">
                    <li className="menu-title">
                      <a href="/">Mỹ Phẩm</a>
                    </li>

                    {/* <li className="panel-list-item">
                      <a href="/">Phân loại 1</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="/">Phân loại 2</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="/">Phân loại 3</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="/">Phân loại 4</a>
                    </li> */}
                  </ul>

                  <ul className="dropdown-panel-list">
                    <li className="menu-title">
                      <a href="/">Hàng tiêu dùng</a>
                    </li>

                    {/* <li className="panel-list-item">
                      <a href="/">Phân loại 1</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="/">Phân loại 2</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="/">Phân loại 3</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="/">Phân loại 4</a>
                    </li> */}
                  </ul>

                  <ul className="dropdown-panel-list">
                    <li className="menu-title">
                      <a href="/">Hỗ trợ làm đẹp</a>
                    </li>

                    {/* <li className="panel-list-item">
                      <a href="/">Phân loại 1</a>
                    </li> */}

                    {/* <li className="panel-list-item">
                      <a href="/">Phân loại 2</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="/">Phân loại 3</a>
                    </li>

                    <li className="panel-list-item">
                      <a href="/">Phân loại 4</a>
                    </li> */}
                  </ul>
                </div>
              </li>

              <li className="menu-category">
                <a href="/product" className="menu-title">
                  Tất cả sản phẩm
                </a>
                {/* 
                <ul className="dropdown-list">
                  <li className="dropdown-item">
                    <a href="/">sản phẩm 1</a>
                  </li>

                  <li className="dropdown-item">
                    <a href="/">sản phẩm 2</a>
                  </li>

                  <li className="dropdown-item">
                    <a href="/">sản phẩm 3</a>
                  </li>

                  <li className="dropdown-item">
                    <a href="/">sản phẩm 4</a>
                  </li>
                </ul> */}
              </li>

              <li className="menu-category">
                <a href="/contact" className="menu-title">
                  Liên hệ
                </a>

                {/* <ul className="dropdown-list">
                  <li className="dropdown-item">
                    <a href="/">sản phẩm 1</a>
                  </li>

                  <li className="dropdown-item">
                    <a href="/">sản phẩm 2</a>
                  </li>

                  <li className="dropdown-item">
                    <a href="/">sản phẩm 3</a>
                  </li>

                  <li className="dropdown-item">
                    <a href="/">sản phẩm 4</a>
                  </li>
                </ul> */}
              </li>

              {/* <li className="menu-category">
                <a href="/" className="menu-title">
                  Dành cho người già
                </a>

                <ul className="dropdown-list">
                  <li className="dropdown-item">
                    <a href="/">sản phẩm 1</a>
                  </li>

                  <li className="dropdown-item">
                    <a href="/">sản phẩm 2</a>
                  </li>

                  <li className="dropdown-item">
                    <a href="/">sản phẩm 3</a>
                  </li>

                  <li className="dropdown-item">
                    <a href="/">sản phẩm 4</a>
                  </li>
                </ul>
              </li> */}

              <li className="menu-category">
                <a href="/blogs" className="menu-title">
                  Tin tức
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Mobile menu start */}

        <div className="mobile-bottom-navigation">
          <button className="action-btn" data-mobile-menu-open-btn>
            <GiHamburgerMenu />
          </button>

          <button className="action-btn">
            <a href="/cart" className="user-cart">
              <BsCart3 fs="6" />
            </a>
          </button>

          <button className="action-btn">
            <a href="/" className="user-home">
              <FaHome />
            </a>
          </button>

          <button className="action-btn">
            <a href="/wishlist" className="user-wishlist">
              <FaRegHeart />
            </a>
          </button>

          <button className="action-btn" data-mobile-menu-open-btn>
            <a href="/profile" className="user-profile">
              <FaRegUser />
            </a>
          </button>
        </div>

        <nav className="mobile-navigation-menu  has-scrollbar" data-mobile-menu>
          <div className="menu-top">
            <h2 className="menu-title">Menu</h2>

            <button className="menu-close-btn" data-mobile-menu-close-btn>
              <AiOutlineClose />
            </button>
          </div>

          <ul className="mobile-menu-category-list">
            <li className="menu-category">
              <a href="/" className="menu-title">
                Home
              </a>
            </li>

            <li className="menu-category">
              <button className="accordion-menu" data-accordion-btn>
                <a href="/product" className="menu-title">
                  Tất cả sản phẩm
                </a>

                {/* <div>
                  <GrAdd name="add-outline" className="add-icon" />
                  <MdRemove name="remove-outline" className="remove-icon" />
                </div> */}
              </button>

              {/* <ul className="submenu-category-list" data-accordion>
                <li className="submenu-category">
                  <a href="/" className="submenu-title">
                    Shirt
                  </a>
                </li>

                <li className="submenu-category">
                  <a href="/" className="submenu-title">
                    Shorts & Jeans
                  </a>
                </li>

                <li className="submenu-category">
                  <a href="/" className="submenu-title">
                    Safety Shoes
                  </a>
                </li>

                <li className="submenu-category">
                  <a href="/" className="submenu-title">
                    Wallet
                  </a>
                </li>
              </ul> */}
            </li>

            <li className="menu-category">
              <button className="accordion-menu" data-accordion-btn>
                <p className="menu-title">Phân loại</p>

                <div>
                  <GrAdd name="add-outline" className="add-icon" />
                  <MdRemove name="remove-outline" className="remove-icon" />
                </div>
              </button>

              <ul className="submenu-category-list" data-accordion>
                {allCategories.map((category, index) => (
                  <li className="submenu-category">
                    <a
                      href={`/product?category=${category.title}`}
                      className="submenu-title"
                    >
                      {category.title}
                    </a>
                  </li>
                ))}
              </ul>
            </li>

            <li className="menu-category">
              <a href="/blogs" className="menu-title">
                Blog
              </a>
            </li>
          </ul>

          <div className="menu-bottom">
            <ul className="menu-category-list">
              <li className="menu-category">
                <button className="accordion-menu" data-accordion-btn>
                  <a href="/logout" className="menu-title">
                    Đăng xuất
                  </a>
                </button>
              </li>
            </ul>

            <ul className="menu-social-container">
              <li>
                <a
                  href="https://www.facebook.com/groups/hoaleauthentic"
                  className="social-link"
                >
                  <FaFacebook />
                </a>
              </li>

              <li>
                <a href="/" className="social-link">
                  <FaTwitter />
                </a>
              </li>

              <li>
                <a href="/" className="social-link">
                  <FaInstagram />
                </a>
              </li>

              <li>
                <a href="/" className="social-link">
                  <FaLinkedin />
                </a>
              </li>
            </ul>
          </div>
        </nav>
        {/* Mobile menu end */}
      </header>
    </>
  );
};

export default Header;
