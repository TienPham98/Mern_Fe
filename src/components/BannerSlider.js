import React, {useEffect, useRef} from "react";
import banner1 from "../assets/images/banner-1.png";
import banner2 from "../assets/images/banner-2.png";

const BannerSlider = () => {
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

  // const scrollToPrevSlide = () => {
  //   const slider = sliderRef.current;
  //   const currentSlideIndex = Math.floor(
  //     slider.scrollLeft / slider.offsetWidth
  //   );
  //   const prevSlideIndex =
  //     (currentSlideIndex - 1 + slider.children.length) % slider.children.length;
  //   const prevSlideLeft = prevSlideIndex * slider.offsetWidth;
  //   slider.scrollTo({
  //     left: prevSlideLeft,
  //     behavior: "smooth",
  //   });
  // };
  useEffect(() => {
    const interval = setInterval(scrollToNextSlide, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="container">
      <div className="slider-container" ref={sliderRef}>
        <div className="slider-item">
          <img
            src={banner1}
            alt="women's latest fashion sale"
            className="banner-img"
          />

          <div className="banner-content">
            <p className="banner-subtitle">Trending item</p>

            <h2 className="banner-title">Vitamin tổng hợp</h2>

            <p className="banner-text">Khuyến mại tới 15%</p>

            <a href="/" className="banner-btn">
              Mua ngay
            </a>
          </div>
        </div>

        <div className="slider-item">
          <img src={banner2} alt="modern sunglasses" className="banner-img" />

          <div className="banner-content">
            <p className="banner-subtitle">Sản phẩm bán chạy</p>

            <h2 className="banner-title">Combo chống lão hóa da</h2>

            <p className="banner-text">Khuyến mại tới 20%</p>

            <a href="/" className="banner-btn">
              Mua ngay
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;
