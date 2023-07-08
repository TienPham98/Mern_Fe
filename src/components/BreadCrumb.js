import React from "react";
import {Link} from "react-router-dom";
import {MdArrowRight} from "react-icons/md";

const BreadCrumb = (props) => {
  const {title} = props;
  return (
    // <div className="breadcrumb mb-0 py-4">
    //   <div className="container-xxl">
    //     <div className="row">
    //       <div className="col-12">
    //         <p className="text-center mb-0">
    //           <Link to="/" className="text-dark">
    //             Về trang chủ &nbsp;
    //           </Link>
    //           / {title}
    //         </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="breadcrumb">
      <div className="container py-2">
        <nav className="d-flex justify-content-center align-items-center">
          <h6 className="mb-0 d-flex ">
            <a href="/" className="text-white">
              Trang chủ
            </a>
            <span className="text-white mx-2">
              <MdArrowRight />
            </span>
            <a href="" className="text-white">
              <u>{title}</u>
            </a>
          </h6>
        </nav>
      </div>
    </div>
  );
};

export default BreadCrumb;
