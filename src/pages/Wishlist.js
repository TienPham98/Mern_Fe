import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getUserProdWishlist } from "../features/user/userSlice";
import { addToWishlist } from "../features/products/productSlice";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getWishlistFromDb = () => {
      dispatch(getUserProdWishlist());
    };
    getWishlistFromDb();
  }, [dispatch]);

  const wishlistState = useSelector((state) => state.auth.wishlist?.wishlist);

  const removeFromWishlist = async (id) => {
    await dispatch(addToWishlist(id));
    dispatch(getUserProdWishlist());
  };

  return (
    <>
      <Meta title={"Danh sách yêu thích"} />
      <BreadCrumb title="Danh sách yêu thích" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
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
                      src="images/cross.svg"
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
      </Container>
    </>
  );
};

export default Wishlist;
