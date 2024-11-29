import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getDocs, collection, query, where } from "firebase/firestore";
import { FirebaseContext } from "../../store/firebaseContext";
import "./View.css";
import ShimmerUI from "../../shimmer/singleProduct";
function View() {
  const { db } = useContext(FirebaseContext);
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [seller, setSeller] = useState([]);

  async function fetchData() {
    try {
      const productQuery = collection(db, "products");
      const productSnapshot = await getDocs(productQuery);

      const products = productSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const currentProduct = products.find((item) => item.id === params.id);

      if (currentProduct) {
        setProduct(currentProduct);
        fetchUserDetails(currentProduct.userId);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }

  const fetchUserDetails = async (userId) => {
    try {
      const userQuery = query(collection(db, "users"), where("id", "==", userId));
      const userSnapshot = await getDocs(userQuery);

      userSnapshot.forEach((doc) => {
        setSeller(doc.data());
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
 
  {if(product.length===0)return <ShimmerUI></ShimmerUI>}
  return (
    <div className="viewParentDiv">
      {product ? (
        <>
          <div className="imageShowDiv">
            <img src={product.imageUrl || "../../../Images/R15V3.jpg"} alt="Product" />
          </div>
          <div className="rightSection">
            <div className="productDetails">
              <p>&#x20B9;{product.Price}</p>
              <span>{product.productName}</span>
              <p>{product.Category}</p>
              <span>{new Date(product.createdAt).toDateString()}</span>
            </div>
            {seller && (
              <div className="contactDetails">
                <p>Seller details</p>
                <p>{seller.userName}</p>
                <p>{seller.phoneNumber}</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default View;
