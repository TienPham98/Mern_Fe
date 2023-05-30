import React, { useEffect } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import BlogCard from "../components/BlogCard";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getAllBlogs } from "../features/blogs/blogSlice";

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
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Tìm kiếm theo</h3>
              <div>
                <ul className="ps-0">
                  {blogCategories?.map((category) => (
                    <li key={category._id}>{category.title}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="row">
              <div className="col-12 mb-3">
                <BlogCard blogs={allBlogs} amount={8} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Blog;
