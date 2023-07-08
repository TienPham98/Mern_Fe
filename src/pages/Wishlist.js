import React, {useEffect} from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import {useDispatch, useSelector} from "react-redux";
import {addProdToCart, getUserProdWishlist} from "../features/user/userSlice";
import {addToWishlist} from "../features/products/productSlice";
import {Link} from "react-router-dom";
import cross from "../assets/images/cross.svg";
import {IoRemove} from "react-icons/io5";
import {BiTrash} from "react-icons/bi";

const Wishlist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getWishlistFromDb = () => {
      dispatch(getUserProdWishlist());
    };
    getWishlistFromDb();
  }, [dispatch]);

  const wishlistState = useSelector((state) => state.auth.wishlist?.wishlist);

  const addToCart = async (id, quantity, price, imageUrl) => {
    const cartItem = {
      productId: id,
      quantity: quantity,
      price: price,
      images: imageUrl,
    };
    await dispatch(addProdToCart(cartItem));
    dispatch(getUserProdWishlist());
  };

  const removeFromWishlist = async (id) => {
    await dispatch(addToWishlist(id));
    dispatch(getUserProdWishlist());
  };

  return (
    <>
      <Meta title={"Danh sách yêu thích"} />
      <BreadCrumb title="Danh sách yêu thích" />
      {/* <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        {wishlistState && wishlistState.length > 0 ? (
          <div className="row">
            {wishlistState?.map((item, index) => {
              return (
                <div className="col-3" key={index}>
                  <div className="wishlist-card position-relative">
                    <img
                      onClick={() => {
                        removeFromWishlist(item?._id);
                      }}
                      src={cross}
                      alt="cross"
                      className="position-absolute cross img-fluid"
                    />
                    <Link to={`/product/${item._id}`}>
                      <div className="wishlist-card-image">
                        <img
                          src={item?.images[0]?.url}
                          className="img-fluid w-100"
                          alt="product"
                        />
                      </div>
                      <div className="py-3 px-3">
                        <h5 className="title">{item?.title}</h5>
                        <h6 className="price">{item?.price}</h6>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>Không có sản phẩm nào trong danh sách yêu thích</div>
        )}
      </Container> */}
      {/* <div className="cart-wrap">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="main-heading mb-10">Các sản phẩm đã thích</div>
              <div className="table-wishlist">
                <table cellpadding="0" cellspacing="0" border="0" width="100%">
                  <thead>
                    <tr>
                      <th width="45%">Sản phẩm</th>
                      <th width="15%">Đơn giá</th>
                      <th width="15%">Trạng thái</th>
                      <th width="15%">Thêm vào giỏ hàng</th>
                      <th width="10%">Xóa sản phẩm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlistState?.map((product, index) => (
                      <tr key={index}>
                        <td width="45%">
                          <div className="display-flex align-center">
                            <div className="img-product">
                              <img
                                src={product?.images[0]?.url}
                                alt="Product"
                                className="mCS_img_loaded"
                              />
                            </div>
                            <div className="name-product">{product?.title}</div>
                          </div>
                        </td>
                        <td width="15%" className="price">
                          {(product?.price).toLocaleString("vi-VN", {
                            // style: "currency",
                            currency: "VND",
                          })}
                        </td>
                        <td width="15%">
                          {product?.quantity > 0 ? (
                            <span className="in-stock-box">Còn hàng</span>
                          ) : (
                            <span className="out-of-stock-box">Hết hàng</span>
                          )}
                        </td>
                        <td width="15%">
                          <button
                            className="round-black-btn small-btn"
                            onClick={() =>
                              addToCart(
                                product?._id,
                                1,
                                product?.price,
                                product?.images[0]?.url
                              )
                            }
                          >
                            Thêm vào giỏ hàng
                          </button>
                        </td>
                        <td width="10%" className="text-center">
                          <button
                            className="trash-icon"
                            onClick={() => removeFromWishlist(product?._id)}
                          >
                            <BiTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <section className="bg-light my-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="card border shadow-0">
                <div className="m-4">
                  <h4 className="card-title mb-4">Danh sách yêu thích</h4>
                  {wishlistState?.map((product, index) => (
                    <div className="row gy-3 mb-4" key={index}>
                      <div className="col-lg-5">
                        <div className="me-lg-5">
                          <div className="d-flex">
                            <a href={`/product/${product?._id}`}>
                              <img
                                src={product?.images[0]?.url}
                                className="border wl-img rounded me-3"
                                alt="Product"
                              />
                            </a>
                            <div className="mt-3">
                              <p>Sản phẩm :</p>
                              <a
                                href={`/product/${product?._id}`}
                                className="nav-link"
                              >
                                <h5> {product?.title}</h5>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column  flex-xl-row text-nowrap">
                        <div className="mt-3">
                          <p>Đơn giá : </p>
                          <text className="h6">
                            {" "}
                            {product?.price.toLocaleString("vi-VN")} đ
                          </text>{" "}
                          <br />
                        </div>
                      </div>
                      <div className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                        <div className="d-flex float-md-end ">
                          <button
                            className="banner-btn mx-4 "
                            onClick={() =>
                              addToCart(
                                product?._id,
                                1,
                                product?.price,
                                product?.image
                              )
                            }
                          >
                            Thêm vào giỏ hàng
                          </button>
                          <button
                            className="trash-icon"
                            onClick={() => removeFromWishlist(product?._id)}
                          >
                            <BiTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Wishlist;
