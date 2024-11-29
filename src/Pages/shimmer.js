import React from "react";

function ShimmerUI() {
  const shimmerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "20px",
  };

  const shimmerItemStyle = {
    backgroundColor: "#e0e0e0",
    borderRadius: "5px",
    animation: "shimmer 1.5s infinite",
    background: `linear-gradient(
      90deg,
      #e0e0e0 25%,
      #f0f0f0 50%,
      #e0e0e0 75%
    )`,
    backgroundSize: "200% 100%",
  };

  const shimmerImageStyle = {
    ...shimmerItemStyle,
    width: "100%",
    height: "200px",
  };

  const shimmerTextStyle = {
    ...shimmerItemStyle,
    height: "20px",
    width: "80%",
  };

  const shimmerSmallTextStyle = {
    ...shimmerItemStyle,
    height: "15px",
    width: "50%",
  };

  return (
    <div style={shimmerStyle}>
      {/* Image Shimmer */}
      <div style={shimmerImageStyle}></div>
      {/* Product Details Shimmer */}
      <div>
        <div style={{ ...shimmerTextStyle, width: "60%" }}></div>
        <div style={shimmerTextStyle}></div>
        <div style={shimmerSmallTextStyle}></div>
        <div style={shimmerSmallTextStyle}></div>
      </div>
      {/* Seller Details Shimmer */}
      <div>
        <div style={{ ...shimmerTextStyle, width: "40%" }}></div>
        <div style={shimmerSmallTextStyle}></div>
        <div style={shimmerSmallTextStyle}></div>
      </div>
    </div>
  );
}

export default ShimmerUI;
