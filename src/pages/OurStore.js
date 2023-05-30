import React, { useState, useEffect, useCallback } from "react";
import ReactPaginate from "react-paginate";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ReactStars from "react-rating-stars-component";
import ProductCard from "../components/ProductCard";
import Color from "../components/Color";
import Container from "../components/Container";
import {
  getAllProducts,
  getProductCategories,
} from "../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import RandomProducts from "../components/RandomProduct";
import { Link } from "react-router-dom";

const OurStore = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state?.product?.products);
  const [grid, setGrid] = useState(4);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  // filter State
  const [tag, setTag] = useState(null);
  const [brand, setBrand] = useState(null);
  const [category, setCategory] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);

  useEffect(() => {
    let newBrands = [];
    let category = [];
    let newTags = [];
    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      newBrands.push(element.brand);
      category.push(element.category);
      newTags.push(element.tags);
    }
    setBrands(newBrands);
    setCategories(category);
    setTags(newTags);
  }, [productState]);

  useEffect(() => {
    getProducts();
  }, [sort, tag, category, brand, minPrice, maxPrice]);
  const getProducts = () => {
    dispatch(
      getAllProducts({ sort, tag, category, brand, minPrice, maxPrice })
    );
  };

  const handleCategoryClick = (item) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === item ? null : item
    );
    setCategory((prevCategory) => (prevCategory === item ? null : item));
  };

  const handleBrandClick = (item) => {
    setSelectedBrand((prevBrand) => (prevBrand === item ? null : item));
    setBrand((prevBrand) => (prevBrand === item ? null : item));
  };

  const handleTagClick = (item) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(item)) {
        return prevTags.filter((tag) => tag !== item);
      } else {
        return [...prevTags, item];
      }
    });

    setTag((prevTag) => (prevTag === item ? null : item));
  };

  return (
    <>
      <Meta title={"Sản phẩm"} />
      <BreadCrumb title="Sản phẩm" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title ">Phân loại sản phẩm</h3>
              <div>
                <ul className="ps-0 text-dark mx-1">
                  {categories &&
                    [...new Set(categories)].map((item, index) => (
                      <li
                        key={index}
                        onClick={() => handleCategoryClick(item)}
                        className={selectedCategory === item ? "active" : ""}
                      >
                        {item}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Bộ lọc</h3>
              <div>
                <h5 className="sub-title">Số lượng </h5>
                <div>
                  <div className="form-check">
                    <div>
                      <h5 className="ps-0 sub-title text-success mx-1">
                        Còn hàng (
                        {
                          productState?.filter(
                            (product) => product.quantity > 0
                          )?.length
                        }
                        )
                      </h5>
                      <ul className="ps-3 text-dark mx-1">
                        {productState
                          ?.filter((product) => product.quantity > 0)
                          ?.map((product) => (
                            <li className="text-dark" key={product._id}>
                              <Link
                                className="text-dark"
                                to={`/product/${product._id}`}
                              >
                                <p>
                                  <strong>{product.title}</strong>&nbsp;(
                                  {product.quantity})
                                </p>
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="sub-title text-danger">
                        Hết hàng (
                        {
                          productState?.filter(
                            (product) => product.quantity === 0
                          )?.length
                        }
                        )
                      </h5>
                      <ul>
                        {productState
                          ?.filter((product) => product.quantity === 0)
                          ?.map((product) => (
                            <li className="text-dark" key={product._id}>
                              <Link
                                className="text-dark"
                                to={`/product/${product._id}`}
                              >
                                <p>
                                  <strong>{product.title}</strong>&nbsp;(
                                  {product.quantity})
                                </p>
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  </div>
                </div>
                {/* <h5 className="sub-title">Giá</h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="From"
                    />
                    <label htmlFor="floatingInput">Từ</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput1"
                      placeholder="To"
                    />
                    <label htmlFor="floatingInput1">Đến</label>
                  </div>
                </div> */}
                {/* <h5 className="sub-title">Màu sắc</h5>
                <div>
                  <Color />
                </div> */}
                {/* <h5 className="sub-title">Kích thước</h5>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="color-1"
                    />
                    <label className="form-check-label" htmlFor="color-1">
                      S (2)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="color-2"
                    />
                    <label className="form-check-label" htmlFor="color-2">
                      M (2)
                    </label>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Thương hiệu </h3>
              <div>
                <ul className="product-tags ps-0 text-dark mx-1">
                  {brands &&
                    [...new Set(brands)].map((item, index) => (
                      <li
                        key={index}
                        onClick={() => handleBrandClick(item)}
                        className={selectedBrand === item ? "active" : ""}
                      >
                        {item}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Tags</h3>
              <div>
                <ul className="product-tags ps-0 text-dark mx-1">
                  {tags &&
                    [...new Set(tags)].map((item, index) => (
                      <li
                        key={index}
                        onClick={() => handleTagClick(item)}
                        className={`text-capitalize badge bg-light text-dark mx-2 ${
                          selectedTags && selectedTags.includes(item)
                            ? "active"
                            : ""
                        }`}
                      >
                        {item}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Sản phẩm gợi ý</h3>
              <div className="random-products mb-3 d-flex">
                <RandomProducts products={productState} amount={2} />
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 d-block" style={{ width: "100px" }}>
                    Sắp xếp :
                  </p>
                  <select
                    name=""
                    defaultValue={"manual"}
                    className="form-control form-select"
                    id=""
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="manual">Tính năng</option>
                    <option value="title">Từ A-Z</option>
                    <option value="-title">Từ Z-A</option>
                    <option value="price">Giá thấp đến cao</option>
                    <option value="-price">Giá cao xuống thấp</option>
                    <option value="createdAt">Mới nhất</option>
                    <option value="-createdAt">Cũ nhất</option>
                  </select>
                </div>
                <div className="d-flex align-items-center gap-10">
                  <p className="totalproducts mb-0">
                    {productState?.length} Sản phẩm
                  </p>
                  <div className="d-flex gap-10 align-items-center grid">
                    <img
                      onClick={() => {
                        setGrid(3);
                      }}
                      src="images/gr4.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(4);
                      }}
                      src="images/gr3.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(6);
                      }}
                      src="images/gr2.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />

                    <img
                      onClick={() => {
                        setGrid(12);
                      }}
                      src="images/gr.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="products-list pb-5">
              <div className="d-flex gap-10 flex-wrap">
                <ProductCard grid={grid} data={productState} amount={16} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
