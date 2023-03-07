import React from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Meta from "../components/Meta";
import blog from "../images/blog-1.jpg";
import Container from "../components/Container";

const SingleBlog = () => {
  return (
    <>
      <Meta title={"Dynamic Blog Name"} />
      <BreadCrumb title="Dynamic Blog Name" />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="single-blog-card">
              <Link to="/blogs" className="d-flex align-items-center gap-10">
                <HiOutlineArrowLeft className="fs-4" /> Trở lại tin tức
              </Link>
              <h3 className="title">Công nghệ kính thực tế ảo</h3>
              <img src={blog} className="img-fluid w-100 my-4" alt="blog" />
              <p>
                Mới đây một công nghệ mới ra mắt đã khiến cho cộng đồng công
                nghệ bàn tán sôi nổi về nó
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleBlog;
