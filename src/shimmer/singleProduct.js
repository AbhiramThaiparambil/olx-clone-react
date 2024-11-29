import React from "react";

function ShimmerView() {
  const shimmerStyle = {
    background: `linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%)`,
    backgroundSize: "200% 100%",
    animation: "shimmer 1.5s infinite",
    borderRadius: "4px",
  };

  const shimmerImageStyle = {
    ...shimmerStyle,
    width: "100%",
    height: "600px",
  };

  const shimmerBoxStyle = {
    ...shimmerStyle,
    width: "100%",
    height: "50px",
    marginBottom: "10px",
  };

  const shimmerTextLineStyle = {
    ...shimmerStyle,
    height: "20px",
    marginBottom: "10px",
  };

  const shimmerSellerBoxStyle = {
    ...shimmerStyle,
    width: "100%",
    height: "100px",
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    padding: "20px",
  };

  const rightSectionStyle = {
    display: "flex",
    flexDirection: "column",
    width: "40%",
    gap: "10px",
  };

  const imageSectionStyle = {
    width: "60%",
  };

  return (
    <div style={containerStyle}>
      {/* Image Section */}
      <div style={imageSectionStyle}>
        <div style={shimmerImageStyle}></div>
      </div>

      {/* Right Section */}
      <div style={rightSectionStyle}>
        {/* Product Details Shimmer */}
        <div style={shimmerBoxStyle}></div>
        <div style={shimmerTextLineStyle}></div>
        <div style={shimmerTextLineStyle}></div>

        {/* Seller Details Shimmer */}
        <div style={shimmerSellerBoxStyle}></div>
      </div>
    </div>
  );
}

export default ShimmerView;

// Add keyframes in global CSS or style tag
