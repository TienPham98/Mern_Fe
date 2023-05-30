import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProducts } from "../features/products/productSlice";

function RandomProducts(props) {
  const { products = [], amount } = props;
  const dispatch = useDispatch();
  const allProduct = useSelector((state) => state.product.products);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const list = [...allProduct]
    ?.sort(() => 0.5 - Math.random())
    .filter((_, i) => i < amount);

  return (
    <>
      {list && list.length > 0 && (
        <>
          <div>
            {list?.map((product) => (
              <div key={product._id} className="random-products mb-3">
                <Link to={`/product/${product._id}`} className="">
                  <div className="w-150">
                    <img
                      src={product?.images[0]?.url}
                      className="img-fluid"
                      alt={product?.title}
                    />
                  </div>
                  <div className="w-50">
                    <h5>{product?.title}</h5>
                    <ReactStars
                      count={5}
                      size={24}
                      value={product?.rating}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <b>{product?.price} đ</b>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default RandomProducts;
