import React, { useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Meta from "../components/Meta";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getBlogById } from "../features/blogs/blogSlice";

const SingleBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const blog1 = useSelector((state) => state.blog.getblogbyid);

  useEffect(() => {
    dispatch(getBlogById(id));
  }, [dispatch, id]);

  return (
    <>
      <Meta title={blog1?.title} />
      <BreadCrumb title={blog1?.title} />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="single-blog-card">
              <Link to="/blogs" className="d-flex align-items-center gap-10">
                <HiOutlineArrowLeft className="fs-4" /> Trở lại tin tức
              </Link>
              <h3 className="title">{blog1?.title}</h3>
              <img
                src={blog1?.images[0].url}
                className="img-fluid w-100 my-4"
                alt="blog"
              />
              <p>{blog1?.description}</p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleBlog;
