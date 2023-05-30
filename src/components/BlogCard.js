import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blogs/blogSlice";
import moment from "moment";

const BlogCard = (props) => {
  const { blogs = [], amount } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  if (!Array.isArray(blogs)) {
    return <div>Loading...</div>;
  }

  if (blogs.length === 0) {
    return <div>No data found</div>;
  }

  const list = blogs.filter((_, i) => i < amount);

  return (
    <div className="blog-card-container">
      {list.map((blog) => (
        <div key={blog._id} className="blog-card">
          <div className="blog-card-wrapper">
            <div className="blog-card-img">
              <img
                src={blog.images[0].url}
                className="img-fluid w-100"
                alt={blog.title}
              />
            </div>
            <div className="blog-content">
              <p className="date">
                {moment(blog.createdAt).format("DD/MM/YYYY HH:mm:ss")}
              </p>
              <h5 className="title">{blog.title}</h5>
              <p className="desc">{blog.description}</p>
              <Link to={`/blog/${blog.id}`} className="button">
                Đọc thêm
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogCard;
