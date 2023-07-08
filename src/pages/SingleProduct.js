import React, {useState, useEffect} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import Container from "../components/Container";
import Color from "../components/Color";
import {TbGitCompare} from "react-icons/tb";
import {AiOutlineHeart} from "react-icons/ai";
import {useDispatch, useSelector} from "react-redux";
import {
  addToCompare,
  addToWishlist,
  getProductById,
  rateProduct,
} from "../features/products/productSlice";
import {FaCopy} from "react-icons/fa";
import {toast} from "react-toastify";
import {addProdToCart, getUserCart} from "../features/user/userSlice";
import RandomProducts from "../components/RandomProduct";
import RecommendProd from "../components/RecommendProd";

const SingleProduct = (item) => {
  const {title, price, description} = item;
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

  const {id} = useParams();
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
        title: productState?.title,
        images: productState?.images[0]?.url,
        quantity: selectedQuantity,
        price: productState?.price,
      })
    );
    dispatch(getUserCart());
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
      dispatch(rateProduct({star: star, comment: comment, prodId: id}));
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
      <section className="py-5">
        <div className="container">
          <div className="row gx-5">
            <aside className="col-lg-6 ">
              <div className="border rounded-4 mb-3 d-flex justify-content-center">
                <img
                  width="400"
                  height="400"
                  src={
                    productState?.images[imageIndex]?.url ||
                    "https://via.placeholder.com/250"
                  }
                  className="rounded-4 fit"
                  alt={productState?.title}
                />
              </div>
              <div className="d-flex justify-content-center mb-3">
                <div onClick={() => setImageIndex(0)}>
                  <img
                    width="60"
                    height="60"
                    className="rounded-2"
                    src={
                      productState?.images[0]?.url ||
                      "https://via.placeholder.com/250"
                    }
                    alt={productState?.name}
                  />
                </div>
                <div onClick={() => setImageIndex(1)}>
                  <img
                    width="60"
                    height="60"
                    className="rounded-2"
                    src={
                      productState?.images[1]?.url ||
                      "https://via.placeholder.com/250"
                    }
                    alt={productState?.name}
                  />
                </div>
                <div onClick={() => setImageIndex(2)}>
                  <img
                    width="60"
                    height="60"
                    className="rounded-2"
                    src={
                      productState?.images[2]?.url ||
                      "https://via.placeholder.com/250"
                    }
                    alt={productState?.name}
                  />
                </div>
                <div onClick={() => setImageIndex(3)}>
                  <img
                    width="60"
                    height="60"
                    className="rounded-2"
                    src={
                      productState?.images[3]?.url ||
                      "https://via.placeholder.com/250"
                    }
                    alt={productState?.name}
                  />
                </div>
              </div>
            </aside>
            <main className="col-lg-6">
              <div className="ps-lg-3">
                <h4 className="title text-dark">{productState?.title}</h4>
                <div className="d-flex flex-row my-3">
                  {/* <div className="text-warning mb-1 me-2">
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fas fa-star-half-alt"></i>
                    <span className="ms-1">5</span>
                  </div> */}

                  <span className="text-dark">Tình trạng :</span>
                  <span className="text-success ms-2">Còn hàng</span>
                </div>

                <div className="mb-3 d-flex">
                  <h6>Đơn giá :</h6>
                  {productState?.price && (
                    <h6 className="mx-2">
                      {productState.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </h6>
                  )}
                </div>

                <div
                  dangerouslySetInnerHTML={{
                    __html: productState?.description,
                  }}
                ></div>

                <div className="row">
                  <dt className="col-3">Phân loại :</dt>
                  <dd className="col-9">{productState?.category}</dd>

                  <dt className="col-3">Thương hiệu :</dt>
                  <dd className="col-9">{productState?.brand}</dd>
                </div>

                <hr />

                <div className="row mb-4 d-flex">
                  <div className="col-md-12 col-6 mb-3 d-flex">
                    <label className=" mt-2 d-block">Số lượng mua : </label>
                    <input
                      type="number"
                      className="form-small mx-2 mt-2 me-4 text-center "
                      value={selectedQuantity}
                      onChange={(e) => setSelectedQuantity(e.target.value)}
                      min="1"
                      step="1"
                    ></input>
                  </div>
                  <button
                    className="banner-btn mx-4 col-md-12 col-6 "
                    onClick={() =>
                      handleAddToCart(
                        productState?._id,
                        selectedQuantity,
                        productState?.price,
                        productState?.image
                      )
                    }
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      <Container className1="reviews-wrapper home-wrapper-2">
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
      <Container className1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Sản phẩm tương tự</h3>
          </div>
        </div>
        <div className="row">
          <RecommendProd data={topSoldProducts} amount={6} />
        </div>
      </Container>
    </>
  );
};

export default SingleProduct;
