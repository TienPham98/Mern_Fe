import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAllBlogs} from "../features/blogs/blogSlice";
import moment from "moment";

const BlogCard2 = (props) => {
  const {blogs = [], amount} = props;

  if (!Array.isArray(blogs)) {
    return <div>Loading...</div>;
  }

  if (blogs.length === 0) {
    return <div>No data found</div>;
  }

  const list = blogs.filter((_, i) => i < amount);

  return (
    <div className="blog-container">
      {list.map((blog, index) => (
        <div className="blog-card" key={index}>
          <a href={`/blog/${blog?.id}`}>
            <img
              src={blog?.images[0]?.url}
              alt={blog?.title}
              width="200"
              className="blog-banner d-flex justify-content-center"
            />
          </a>

          <div className="blog-content mx-3">
            <a href={`/blog/${blog?.id}`} className="blog-category">
              {blog?.category}
            </a>

            <a href={`/blog/${blog?.id}`}>
              <h3 className="blog-title ">{blog.title}</h3>
            </a>

            <div className="blog-meta d-flex">
              By <cite className="mx-1">Admin</cite>
              <p className="date mx-2">
                {moment(blog.createdAt).format("DD/MM/YYYY")}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogCard2;
