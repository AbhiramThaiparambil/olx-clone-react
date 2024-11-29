import React,{useEffect,useState,useContext} from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { getDocs,collection } from 'firebase/firestore';
import { FirebaseContext } from '../../store/firebaseContext';
import ShimmerUI from '../../shimmer/homeProduct';

function Posts() {
  const [products,setProducts]=useState([]);
  const {db}=useContext(FirebaseContext)
  async function fetchData() {
    try {

      const querySnapshot = await getDocs(collection(db, "products"));
      const productData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
      }));

      setProducts(productData)
      

    } catch (error) {
      console.error("Error fetching data:", error); // Log the error
    }
  }
  useEffect(()=>{
    fetchData()
    
  },[])



   return (


    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
         { products.length===0 ? <ShimmerUI ui={true} />   :  <div
            className="card"
          >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>Tue May 04 2021</span>
            </div>
          </div>}

        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>

        <div className="cards">
        { (products.length===0) ? <ShimmerUI/> :  

  products.map((product)=>{
    return(
     
      <div className="card">
        <div className="favorite">
          <Heart></Heart>
        </div>
        <div className="image">
          <img src="../../../Images/R15V3.jpg" alt="" />
        </div>
        <div className="content">
          
          <p className="name rate">{product.productName}</p>
          <span className="kilometer">{product.Category}</span>

          <p className="">&#x20B9; {product.Price}</p>
          <p>{product.id}</p>
        </div>
        <div className="date">
          <span>10/5/2021</span>
        </div>
      </div>
   
    )
  })
}



</div>

      
      </div>
    </div>
  );
}

export default Posts;
