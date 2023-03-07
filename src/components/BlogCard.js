import React from "react";
import { Link } from "react-router-dom";

const BlogCard = () => {
  return (
    <div className="blog-card">
      <div className="card-image">
        <img src="images/blog-1.jpg" className="img-fluid w-100" alt="blog" />
      </div>
      <div className="blog-content">
        <p className="date">1 Dec, 2022</p>
        <h5 className="title">Công nghệ kính thực tế ảo</h5>
        <p className="desc">
          Mới đây một công nghệ mới ra mắt đã khiến cho cộng đồng công nghệ bàn
          tán sôi nổi về nó
        </p>
        <Link to="/blog/:id" className="button">
          Đọc thêm
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
