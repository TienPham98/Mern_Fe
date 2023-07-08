import React, {useEffect, useRef} from "react";
import b1 from "../assets/images/b-1.png";
import b2 from "../assets/images/b-2.png";

const ProductDeal = () => {
  const sliderRef = useRef(null);

  const scrollToNextSlide = () => {
    const slider = sliderRef.current;
    const currentSlideIndex = Math.floor(
      slider.scrollLeft / slider.offsetWidth
    );
    const nextSlideIndex = (currentSlideIndex + 1) % slider.children.length;
    const nextSlideLeft = nextSlideIndex * slider.offsetWidth;
    slider.scrollTo({
      left: nextSlideLeft,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const interval = setInterval(scrollToNextSlide, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="product-featured">
      <h2 className="title">Deal of the day</h2>

      <div className="showcase-wrapper has-scrollbar" ref={sliderRef}>
        <div className="showcase-container">
          <div className="showcase">
            <div className="showcase-banner">
              <img
                src={b1}
                alt="shampoo, conditioner & facewash packs"
                className="showcase-img"
              />
            </div>

            <div className="showcase-content">
              <div className="showcase-rating">{/* star rating */}</div>

              <a href="/">
                <h3 className="showcase-title">
                  Vitamin E Kirkland Signature{" "}
                </h3>
              </a>

              <p className="showcase-desc">
                Kirkland Signature Vitamin E hỗ trợ tăng đề kháng, làm đẹp
              </p>

              <div className="price-box">
                <p className="price">$150.00</p>

                <del>$200.00</del>
              </div>

              <button className="add-cart-btn">add to cart</button>

              <div className="showcase-status">
                <div className="wrapper">
                  <p>
                    already sold: <b>20</b>
                  </p>

                  <p>
                    available: <b>40</b>
                  </p>
                </div>

                <div className="showcase-status-bar"></div>
              </div>

              <div className="countdown-box">
                <p className="countdown-desc">Hurry Up! Offer ends in:</p>

                <div className="countdown">
                  <div className="countdown-content">
                    <p className="display-number">360</p>

                    <p className="display-text">Days</p>
                  </div>

                  <div className="countdown-content">
                    <p className="display-number">24</p>
                    <p className="display-text">Hours</p>
                  </div>

                  <div className="countdown-content">
                    <p className="display-number">59</p>
                    <p className="display-text">Min</p>
                  </div>

                  <div className="countdown-content">
                    <p className="display-number">00</p>
                    <p className="display-text">Sec</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="showcase-container">
          <div className="showcase">
            <div className="showcase-banner">
              <img
                src={b2}
                alt="Rose Gold diamonds Earring"
                className="showcase-img"
              />
            </div>

            <div className="showcase-content">
              <div className="showcase-rating">
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star-outline"></ion-icon>
                <ion-icon name="star-outline"></ion-icon>
              </div>

              <h3 className="showcase-title">
                <a href="/" className="showcase-title">
                  Vitamin tổng hợp kết hợp tảo biển
                </a>
              </h3>

              <p className="showcase-desc">
                Bổ sung đầy đủ vitamin tăng cường sức khỏe và đề kháng cơ thể
              </p>

              <div className="price-box">
                <p className="price">$1990.00</p>
                <del>$2000.00</del>
              </div>

              <button className="add-cart-btn">add to cart</button>

              <div className="showcase-status">
                <div className="wrapper">
                  <p>
                    {" "}
                    already sold: <b>15</b>{" "}
                  </p>

                  <p>
                    {" "}
                    available: <b>40</b>{" "}
                  </p>
                </div>

                <div className="showcase-status-bar"></div>
              </div>

              <div className="countdown-box">
                <p className="countdown-desc">Hurry Up! Offer ends in:</p>

                <div className="countdown">
                  <div className="countdown-content">
                    <p className="display-number">360</p>
                    <p className="display-text">Days</p>
                  </div>

                  <div className="countdown-content">
                    <p className="display-number">24</p>
                    <p className="display-text">Hours</p>
                  </div>

                  <div className="countdown-content">
                    <p className="display-number">59</p>
                    <p className="display-text">Min</p>
                  </div>

                  <div className="countdown-content">
                    <p className="display-number">00</p>
                    <p className="display-text">Sec</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDeal;
