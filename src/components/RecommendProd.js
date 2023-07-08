import React, {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {getAllProducts} from "../features/products/productSlice";
import {addProdToCart} from "../features/user/userSlice";
import {toast} from "react-toastify";

const RecommendProd = (props) => {
  const {products = [], amount} = props;
  const dispatch = useDispatch();
  const allProduct = useSelector((state) => state.product.products);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const addProductToCart = (id, title, quantity, price, imageUrl) => {
    const cartItem = {
      productId: id,
      title: title,
      quantity: quantity,
      price: price,
      images: imageUrl,
    };
    dispatch(addProdToCart(cartItem));
    toast.success("Đã thêm vào giỏ hàng!", {
      autoClose: 500,
    });
  };

  const list = [...allProduct]
    ?.sort(() => 0.5 - Math.random())
    .filter((_, i) => i < amount);

  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let scrollInterval = null;

    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        if (
          container.scrollLeft + container.offsetWidth >=
          container.scrollWidth
        ) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += 1; // Tốc độ cuộn, có thể điều chỉnh
        }
      }, 20); // Thời gian cuộn, có thể điều chỉnh
    };

    const stopAutoScroll = () => {
      clearInterval(scrollInterval);
    };

    container.addEventListener("mouseenter", stopAutoScroll);
    container.addEventListener("mouseleave", startAutoScroll);

    startAutoScroll();

    return () => {
      container.removeEventListener("mouseenter", stopAutoScroll);
      container.removeEventListener("mouseleave", startAutoScroll);
      stopAutoScroll();
    };
  }, []);

  return (
    <section>
      <div className="container my-2">
        <div className=" overflow-container " ref={containerRef}>
          {list.map((product) => (
            <div key={product._id} className="col-lg-3 col-md-6 col-sm-6">
              <div className="recommend-card px-4 border shadow-0 mb-4 mb-lg-0">
                <div className="mask px-2">
                  <div className="d-flex justify-content-between">
                    <h6>
                      <span className="badge bg-danger pt-1 mt-3 ms-2">
                        Hot
                      </span>
                    </h6>
                    <a href="/">
                      <i className="fas fa-heart text-primary fa-lg float-end pt-3 m-2"></i>
                    </a>
                  </div>
                </div>
                <a href={`/product/${product._id}`} className="">
                  <img
                    src={product?.images[0]?.url}
                    className="card-img-top rounded-2"
                    alt="product"
                    width="150"
                  />
                </a>
                <div className="card-body d-flex flex-column pt-3 border-top">
                  <a href={`/product/${product._id}`} className="blog-title">
                    {product?.title}
                  </a>
                  <div className="price-wrap mb-2">
                    <p className="showcase-title">
                      {" "}
                      {product?.price.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </p>
                  </div>
                  <div className=" d-flex align-items-center justify-content-center py-2 pb-0 mt-auto">
                    <button
                      className="banner-btn-sm"
                      onClick={() =>
                        addProductToCart(
                          product?._id,
                          product?.title,
                          1,
                          product?.price,
                          product?.images[0]?.url
                        )
                      }
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendProd;
