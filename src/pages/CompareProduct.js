import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Color from "../components/Color";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getUserCompareList } from "../features/user/userSlice";
import { addToCompare } from "../features/products/productSlice";
import { Link } from "react-router-dom";

const CompareProduct = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getWishlistFromDb = () => {
      dispatch(getUserCompareList());
    };
    getWishlistFromDb();
  }, [dispatch]);

  const compareState = useSelector((state) => state.auth.compare?.compare);
  // const removeFromCompare = (id) => {
  //   dispatch(addToCompare(id));
  //   setTimeout(() => {
  //     dispatch(getUserCompareList());
  //   }, 100);
  // };

  const removeFromCompare = async (id) => {
    await dispatch(addToCompare(id));
    dispatch(getUserCompareList());
  };

  return (
    <>
      <Meta title={"So sánh sản phẩm"} />
      <BreadCrumb title="So sánh sản phẩm" />
      <Container class1="compare-product-wrapper py-5 home-wrapper-2">
        {compareState && compareState.length > 0 ? (
          <div className="row">
            {compareState.map((item, index) => {
              return (
                <div className="col-3" key={index}>
                  <div className="compare-product-card position-relative">
                    <img
                      onClick={() => {
                        removeFromCompare(item?._id);
                      }}
                      src="images/cross.svg"
                      alt="cross"
                      className="position-absolute cross img-fluid"
                    />
                    <Link to={`/product/${item._id}`}>
                      <div className="product-card-image">
                        <img
                          className="img-fluid"
                          src={item?.images[0]?.url}
                          alt="product"
                        />
                      </div>
                      <div className="compare-product-details">
                        <h5 className="title">{item?.title}</h5>
                        <h6 className="price mb-3  mt-3">{item?.price}</h6>
                        <div>
                          <div className="product-detail">
                            <h5 className="title">Thương hiệu:</h5>
                            <p className="title">{item?.brand}</p>
                          </div>
                          <div className="product-detail">
                            <h5 className="title">Loại:</h5>
                            <p className="title">{item?.category}</p>
                          </div>
                          <div className="product-detail">
                            <h5 className="title">Có sẵn:</h5>
                            <p className="title">
                              {item?.quantity > 0 ? "Trong kho" : "Hết hàng"}
                            </p>
                          </div>
                          {/* <div className="product-detail">
                            <h5>Màu sắc:</h5>
                            <Color colors={item?.colors} />
                          </div> */}
                          {/* <div className="product-detail">
                            <h5>Size:</h5>
                            <div className="d-flex gap-10">
                              {item?.sizes.map((size, index) => (
                                <p key={index}>{size}</p>
                              ))}
                            </div>
                          </div> */}
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>Không có sản phẩm nào trong danh sách so sánh</div>
        )}
      </Container>
    </>
  );
};

export default CompareProduct;
