import React from "react";

const BestSeller = ({count, data}) => {
  return (
    <div className="showcase-container">
      {data.slice(0, count).map((product, index) => (
        <div className="showcase" key={index}>
          <a href={`/product/${product?._id}`} className="showcase-img-box">
            <img
              src={product?.images[0]?.url}
              alt={product?.title}
              width="75"
              height="75"
              className="showcase-img"
            />
          </a>

          <div className="showcase-content">
            <a href={`/product/${product?._id}`}>
              <h4 className="showcase-title ">{product?.title}</h4>
            </a>
            <a href={`/product/${product?._id}`}>
              <h4 className="showcase-seller">{product?.category}</h4>
            </a>

            {/* <div className="showcase-rating">
              {[...Array(product.rating)].map((_, index) => (
                <ion-icon name="star" key={index}></ion-icon>
              ))}
            </div> */}

            <div className="price-box">
              {/* {product.previousPrice && <del>{product.previousPrice}</del>} */}
              <p className="price">
                {product?.price.toLocaleString("vi-VN")} đ
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BestSeller;
