import React from "react";

const Loader = ({
  width = "35px",
  height = "8px",
  color = "blue",
  className = "",
}) => {
  const loaderStyle = {
    width,
    height,
    background: `radial-gradient(circle closest-side, ${color} 90%, #0000) 0 /
    calc(100% / 3) 100% space`,
  };
  return (
    <div className={`three-dots-loader ${className}`} style={loaderStyle}></div>
  );
};

export default Loader;
