import React, {useEffect} from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import {HiOutlineArrowLeft} from "react-icons/hi";
import Meta from "../components/Meta";
import Container from "../components/Container";
import {useDispatch, useSelector} from "react-redux";
import {getAllBlogs, getBlogById} from "../features/blogs/blogSlice";
import BlogCard2 from "../components/BlogCard2";

const SingleBlog = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const blog1 = useSelector((state) => state?.blog?.getblogbyid);
  const allBlogs = useSelector((state) => state?.blog?.blogs);

  useEffect(() => {
    dispatch(getBlogById(id));
    dispatch(getAllBlogs());
  }, [dispatch, id]);

  const getRandomBlogs = (allBlogs, count) => {
    const shuffledBlogs = [...allBlogs].sort(() => 0.5 - Math.random());
    return shuffledBlogs.slice(0, count);
  };

  const randomBlogs = getRandomBlogs(allBlogs, 4);

  return (
    <>
      <Meta title={blog1?.title} />
      <BreadCrumb title={blog1?.title} />
      <Container class1="container">
        <div className="row">
          <div className="col-12">
            <div className="single-blog-card">
              <Link to="/blogs" className="d-flex align-items-center gap-10">
                <HiOutlineArrowLeft className="fs-4 my-4" /> Trở lại tin tức
              </Link>
              <h3 className="title d-flex align-items-center justify-content-center ">
                {blog1?.title}
              </h3>
              <div className="d-flex align-items-center justify-content-center">
                <img
                  src={blog1?.images[0]?.url}
                  className="img-fluid my-4"
                  alt="blog"
                />
              </div>
              <p
                className="desc"
                dangerouslySetInnerHTML={{__html: blog1?.description}}
              ></p>
            </div>
          </div>
        </div>
        <div className="row">
          <h6>Tin tức khác</h6>
          <BlogCard2 amount={4} blogs={randomBlogs} />
          <a
            href="/blogs"
            className="blog-title d-flex justify-content-center my-3"
          >
            Xem thêm
          </a>
        </div>
      </Container>
    </>
  );
};

export default SingleBlog;
