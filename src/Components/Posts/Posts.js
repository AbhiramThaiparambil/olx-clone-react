import React,{useEffect,useState,useContext} from 'react';
import Heart from '../../assets/Heart';
import './Post.css';
import { getDocs,collection } from 'firebase/firestore';
import { FirebaseContext } from '../../store/firebaseContext';
import ShimmerUI from '../../shimmer/homeProduct';
import { Link } from 'react-router-dom';
import { SearchContext } from '../../store/searchContext';
function Posts() {
  const [products,setProducts]=useState([]);
  const [backUpProducts,setbackUpProducts]=useState([])
  const {db}=useContext(FirebaseContext)
  const {searchVal}=useContext(SearchContext)

  useEffect(() => {
    if (searchVal) {
      const filterData = backUpProducts.filter((item) =>
        item.productName.toLowerCase().includes(searchVal.toLowerCase())
      );
      setProducts(filterData);
    } else {
      setProducts(backUpProducts); 
    }
  }, [searchVal]);

  async function fetchData() {
    try {

      const querySnapshot = await getDocs(collection(db, "products"));
      const productData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id
      }));

     
      setbackUpProducts(productData)
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
            style={{display:'flex',flex:"wrap"}}
          >
       {
      
      products.map((product)=>{
    return(
      
     <Link key={product.id} style={{textDecoration:'none'}} to={`/product-details/${product.id}`}> 
     
      <div className="card">
        <div className="favorite">
          <Heart></Heart>
        </div>
        <div className="image">
          <img src={product.imageUrl} alt="product img" />
        </div>
        <div className="content">
          
          <p className="name rate">{product.productName}</p>
          <span className="kilometer">{product.Category}</span>

          <p className="">&#x20B9; {product.Price}</p>
          
        </div>
        <div className="date">
          
        </div>
      </div>
      </Link>
   
    )
  })
}

          </div>}

        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>

        <div className="cards">
        { (backUpProducts.length===0) ? <ShimmerUI/> :  
         


backUpProducts.map((product)=>{
    return(
      
     <Link key={product.id} style={{textDecoration:'none'}} to={`/product-details/${product.id}`}> 
     
      <div className="card">
        <div className="favorite">
          <Heart></Heart>
        </div>
        <div className="image">
          <img src={product.imageUrl} alt="product img" />
        </div>
        <div className="content">
          
          <p className="name rate">{product.productName}</p>
          <span className="kilometer">{product.Category}</span>

          <p className="">&#x20B9; {product.Price}</p>
          
        </div>
        <div className="date">
          <span>5/12/2024</span>
        </div>
      </div>
      </Link>
   
    )
  })
}



</div>

      
      </div>
    </div>
  );
}

export default Posts;
