import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import Container from "../components/Container";
import Color from "../components/Color";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCompare,
  addToWishlist,
  getProductById,
  rateProduct,
} from "../features/products/productSlice";
import { FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import { addProdToCart, getUserCart } from "../features/user/userSlice";

const SingleProduct = (item) => {
  const { title, price, description } = item;
  const location = useLocation();
  const productLink = window.location.href;
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [copied, setCopied] = useState(false);
  const [orderedProduct, setOrderedProduct] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);
  const [numReviewsToShow, setNumReviewsToShow] = useState(2);

  const addProdToWish = (id) => {
    dispatch(addToWishlist(id));
    toast.success("Đã thêm vào danh sách yêu thích!", {
      autoClose: 500,
    });
  };

  const addProdToCompare = (id) => {
    dispatch(addToCompare(id));
    toast.success("Đã thêm vào so sánh!", {
      autoClose: 500,
    });
  };

  const { id } = useParams();
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product.getProduct);
  const allProduct = useSelector((state) => state.product.products);
  const topSoldProducts = allProduct
    ?.slice()
    ?.sort((a, b) => b?.sold - a?.sold)
    ?.slice(0, 4);

  useEffect(() => {
    dispatch(getProductById(id));
  }, []);

  const handleAddToCart = async () => {
    await dispatch(
      addProdToCart({
        productId: productState?._id,
        images: productState?.images[0]?.url,
        quantity: selectedQuantity,
        price: productState?.price,
      })
    );
    dispatch(getUserCart());
  };

  const handleQuantityChange = (event) => {
    setSelectedQuantity(event.target.value);
  };

  function copyToClipboard() {
    navigator.clipboard.writeText(productLink);
    setCopied(true);
    toast.success("Copy link thành công!");
  }

  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);
  const addRatingToProduct = () => {
    if (star === null) {
      toast.error("Vui lòng chọn sao");
      return false;
    } else if (comment === null) {
      toast.error("Vui lòng viết đánh giá");
      return false;
    } else {
      dispatch(rateProduct({ star: star, comment: comment, prodId: id }));
      setTimeout(() => {
        dispatch(getProductById(id));
      }, 200);
    }
    return false;
  };

  return (
    <>
      <Meta title={productState?.title} />
      <BreadCrumb title={productState?.title} />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div onClick={() => setImageIndex(0)}>
                <img
                  src={
                    productState?.images[imageIndex]?.url ||
                    "https://via.placeholder.com/250"
                  }
                  className="img-fluid"
                  alt={productState?.name}
                />
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
              <div onClick={() => setImageIndex(0)}>
                <img
                  src={
                    productState?.images[0]?.url ||
                    "https://via.placeholder.com/250"
                  }
                  className="img-fluid"
                  alt={productState?.name}
                />
              </div>
              <div onClick={() => setImageIndex(1)}>
                <img
                  src={
                    productState?.images[1]?.url ||
                    "https://via.placeholder.com/250"
                  }
                  className="img-fluid"
                  alt={productState?.name}
                />
              </div>
              <div onClick={() => setImageIndex(2)}>
                <img
                  src={
                    productState?.images[2]?.url ||
                    "https://via.placeholder.com/250"
                  }
                  className="img-fluid"
                  alt={productState?.name}
                />
              </div>
              <div onClick={() => setImageIndex(3)}>
                <img
                  src={
                    productState?.images[3]?.url ||
                    "https://via.placeholder.com/250"
                  }
                  className="img-fluid"
                  alt={productState?.name}
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">{productState?.title}</h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">
                  {productState?.price.toLocaleString("vi-VN")} đ
                </p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={productState?.totalRating}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">
                    ( {productState?.ratings?.length} bình luận )
                  </p>
                </div>
                <a className="review-btn" href="#review">
                  Xem bình luận
                </a>
              </div>
              <div className=" py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Loại :</h3>
                  <p className="product-data">{productState?.category}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Thương hiệu :</h3>
                  <p className="product-data">{productState?.brand}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Phân loại :</h3>
                  <p className="product-data">{productState?.category}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Tags :</h3>
                  <p className="product-data">{productState?.tags}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Còn hàng :</h3>
                  <p className="product-data">{productState?.quantity}</p>
                </div>
                {/* <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Size :</h3>
                  <div className="d-flex flex-wrap gap-15">
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      S
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      M
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      XL
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      XXL
                    </span>
                  </div>
                </div> */}
                {/* <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Màu :</h3>
                  <Color />
                </div> */}
                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                  <h3 className="product-heading">Số lượng :</h3>
                  <div className="">
                    <input
                      type="number"
                      name=""
                      value={selectedQuantity}
                      onChange={handleQuantityChange}
                      min={1}
                      max={50}
                      className="form-control"
                      style={{ width: "70px" }}
                      id="quantityInput"
                    />
                  </div>
                  <div className="d-flex align-items-center gap-30 ms-5">
                    <button
                      className="primary-button border-0"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      type="button"
                      onClick={() => {
                        handleAddToCart(productState?._id);
                      }}
                    >
                      Thêm vào giỏ hàng
                    </button>
                    <Link to="/cart">
                      <button className="primary-button signup">
                        Mua ngay
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <div>
                    <button
                      className="btn"
                      onClick={() => addProdToCompare(productState?._id)}
                    >
                      <TbGitCompare className="fs-5 me-2" /> Thêm vào so sánh
                    </button>
                  </div>
                  <div>
                    <button
                      className="btn"
                      onClick={() => addProdToWish(productState?._id)}
                    >
                      <AiOutlineHeart className="fs-5 me-2" /> Thêm vào yêu
                      thích
                    </button>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column  my-3">
                  <h3 className="product-heading">Vận chuyển và hoàn trả :</h3>
                  <p className="product-data">
                    Free shipping cho tất cả các đơn hàng trên 2.000.000 đ<br />{" "}
                    Thời gian ship chỉ từ
                    <b> 2-3 ngày</b>
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center my-3">
                  <h3 className="product-heading">Link sản phẩm:</h3>
                  <p className="product-heading">{productLink}</p>
                  <button
                    className="btn border-0"
                    type="button"
                    onClick={copyToClipboard}
                    disabled={copied}
                  >
                    <FaCopy />
                  </button>

                  {/* <a
                    href="javascript:void(0);"
                    onClick={() => {
                      copyToClipboard(
                        "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
                      );
                    }}
                  >
                    Copy Link sản phẩm
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Mô tả sản phẩm</h4>
            <div
              className="bg-white p-3"
              dangerouslySetInnerHTML={{ __html: productState?.description }}
            >
              {/* {productState?.description.replace(/<\/?p>/gi, "")} */}
            </div>
          </div>
        </div>
      </Container>
      <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Khách hàng phản hồi</h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={productState?.totalRating}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">
                      Tổng cộng {productState?.ratings?.length} bình luận
                    </p>
                  </div>
                </div>
                {orderedProduct && <div></div>}
              </div>
              <div className="review-form py-4">
                <h4>Viết bình luận</h4>
                <div>
                  <ReactStars
                    count={5}
                    size={24}
                    value={5}
                    edit={true}
                    activeColor="#ffd700"
                    onChange={(e) => {
                      setStar(e);
                    }}
                  />
                </div>
                <div>
                  <textarea
                    name=""
                    id=""
                    className="w-100 form-control"
                    cols="30"
                    rows="4"
                    placeholder="Bình luận"
                    onChange={(e) => {
                      setComment(e.target.value);
                    }}
                  ></textarea>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    onClick={addRatingToProduct}
                    className="primary-button mt-1"
                    type="button "
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
              <div className="reviews mt-4">
                {productState &&
                  productState.ratings
                    ?.slice(0, numReviewsToShow)
                    .map((item, index) => {
                      return (
                        <div key={index} className="review">
                          <div className="d-flex gap-10 align-items-center">
                            <h6 className="mb-0">Bình luận </h6>
                            <ReactStars
                              count={5}
                              size={24}
                              value={item?.star}
                              edit={false}
                              activeColor="#ffd700"
                            />
                          </div>
                          <p className="mt-3">{item?.comment}</p>
                        </div>
                      );
                    })}
                {productState &&
                  productState.ratings?.length > numReviewsToShow && (
                    <button
                      onClick={() => setNumReviewsToShow(numReviewsToShow + 2)}
                    >
                      Xem thêm
                    </button>
                  )}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Sản phẩm phổ biến</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard data={topSoldProducts} amount={4} />
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;
