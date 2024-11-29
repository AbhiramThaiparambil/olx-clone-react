import "./homeProduct.css";
function ShimmerUi({ ui }) {
  if (ui) {
    return (
      <div className="roodDiv">
        <div className="cardShimmerW"></div>
        <div className="cardShimmerW"></div>
        <div className="cardShimmerW"></div>
        <div className="cardShimmerW"></div>
        <div className="cardShimmerW"></div>
      </div>
    );
  } else {
    return (
      <div className="roodDiv">
        <div className="cardShimmer"></div>
        <div className="cardShimmer"></div>
        <div className="cardShimmer"></div>
        <div className="cardShimmer"></div>
        <div className="cardShimmer"></div>
      </div>
    );
  }
}

export default ShimmerUi;
