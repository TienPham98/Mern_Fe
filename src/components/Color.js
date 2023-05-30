import React, { useEffect } from "react";
import { getAllColor } from "../features/color/colorSlice";
import { useDispatch, useSelector } from "react-redux";

const Color = () => {
  const dispatch = useDispatch();
  const allColor = useSelector((state) => state.color.colors);

  useEffect(() => {
    dispatch(getAllColor());
  }, [dispatch]);
  return (
    <>
      <ul className="ps-0 sub-title mx-1">
        {allColor?.map((color) => (
          <li key={color._id} className="d-flex align-items-center text-dark">
            <span>{color.title}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Color;
