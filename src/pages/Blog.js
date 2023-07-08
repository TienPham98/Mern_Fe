import React, {useEffect} from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import BlogCard from "../components/BlogCard";
import Container from "../components/Container";
import {useDispatch, useSelector} from "react-redux";
import {getCategories, getAllBlogs} from "../features/blogs/blogSlice";
import BlogCard2 from "../components/BlogCard2";

const Blog = () => {
  const dispatch = useDispatch();
  const blogCategories = useSelector((state) => state.blog.bCategories);
  const allBlogs = useSelector((state) => state.blog.blogs);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAllBlogs());
  }, [dispatch]);

  return (
    <>
      <Meta title={"Tin tức"} />
      <BreadCrumb title="Tin tức" />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12 col-md-3  border-end border-right">
            <div className=" mb-3">
              <h5 className="">Phân loại</h5>
              <div>
                <ul className="ps-0 mx-2">
                  {blogCategories?.map((category) => (
                    <li key={category._id}>{category.title}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-9">
            <h5 className="d-flex justify-content-center">Tin tức</h5>
            <div className="col-12 mb-3 d-flex flex-wrap">
              <BlogCard2 blogs={allBlogs} amount={8} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Blog;
