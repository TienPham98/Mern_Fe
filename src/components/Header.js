import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch, BsTelephonePlusFill } from "react-icons/bs";
import compare from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import cartImg from "../images/cart.svg";
import menu from "../images/menu.svg";
import { useSelector, useDispatch } from "react-redux";
import { getUserCart, logoutUser } from "../features/user/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth?.user);
  const products = useSelector((state) => state.product?.products);
  const cartState = useSelector((state) => state?.auth?.cartProducts);
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

  return (
    <>
      <header className="header-top-strip px-3 py-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Sản phẩm chính hãng & Freeship đơn hàng trên 1 triệu
              </p>
            </div>
            <div className="col-6">
              <p className="text-white text-end mb-0">
                Hotline:
                <a className="text-white" href="tel: +84 965273494">
                  <BsTelephonePlusFill className="mx-2" /> 096 527 3494
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <header className="header-upper pt-3 px-3 py-2">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2 logo">
              <h5 className="small-heading">
                <Link to="/" className="text-white text-center">
                  Hòa Lê Authentic
                </Link>
                <p className="phone-mobile text-white text-end mb-0">
                  <a className="text-white" href="tel: +84 965273494">
                    <BsTelephonePlusFill className="mx-2" /> 096 527 3494
                  </a>
                </p>
              </h5>
            </div>
            <div className="col-5 search-group">
              <div className="input-group mb-2">
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
                <span className="input-group-text py-2" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
              {searchValue && isSearchOpen && (
                <div
                  className=" search-product position-absolute bg-white border border-secondary w-80 h-40 z-index-9999"
                  // onMouseLeave={() => setSearchValue("")}
                >
                  {isLoading ? (
                    <div></div>
                  ) : !searchResults.length ? (
                    <div></div>
                  ) : (
                    <ul className="list-group ">
                      {searchResults.map(({ title, images, _id }) => (
                        <Link
                          key={_id}
                          className="list-group-item list-group-item-action"
                          to={`/product/${_id}`}
                        >
                          <div className="d-flex align-items-center">
                            <div
                              className="me-3 flex-shrink-0"
                              style={{ width: 80 }}
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
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                <div>
                  <Link
                    to="/compare-product"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={compare} alt="compare" />
                    <p className="mb-0">
                      So sánh <br /> sản phẩm
                    </p>
                  </Link>
                </div>

                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={wishlist} alt="wishlist" />
                    <p className="mb-0">
                      Danh sách <br /> yêu thích
                    </p>
                  </Link>
                </div>

                <div>
                  {currentUser ? (
                    <div>
                      <Link
                        to="/profile"
                        className="d-flex align-items-center gap-10 text-white"
                      >
                        <img src={user} alt="user" />
                        <p className="mb-0">
                          Tài khoản:
                          <br />
                          {currentUser.lastname}
                        </p>
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <Link
                        to="/login"
                        className="d-flex align-items-center gap-10 text-white"
                      >
                        <img src={user} alt="user" />
                        <p className="mb-0">
                          Đăng nhập <br /> Tài khoản
                        </p>
                      </Link>
                    </div>
                  )}
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={cartImg} alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">
                        {cartState?.length ? cartState?.length : 0}
                      </span>
                      <p className="mb-0 header-total">
                        {total?.toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })
                          ? total?.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })
                          : 0}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-10 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={menu} alt="" />
                      <span className="me-2 d-inline-block">
                        Phân loại sản phẩm
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Another action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Something else here
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">Trang chủ</NavLink>
                    <NavLink to="/product">Sản phẩm</NavLink>
                    <NavLink to="/my-orders">Sản phẩm đã mua</NavLink>
                    <NavLink to="/blogs">Tin tức</NavLink>
                    <NavLink to="/contact">Liên hệ</NavLink>
                    {currentUser ? (
                      <NavLink to="/logout">Đăng Xuất</NavLink>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
