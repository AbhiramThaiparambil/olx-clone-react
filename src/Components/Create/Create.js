import React, { Fragment, useState, useContext } from "react";
import "./Create.css";
import Header from "../Header/Header";
import { FirebaseContext, UserContext } from "../../store/firebaseContext";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Bounce, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Create = () => {
  const { authUser } = useContext(UserContext);
  const { db } = useContext(FirebaseContext);
  const [product, setProduct] = useState({
    product: "",
    Category: "",
    Price: "",
  });
  const [inpImg, setImg] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleChanges = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (authUser) {
      setError("");

      // Validate input fields
      if (!product.product || !product.Category || !product.Price) {
        setError("Please fill in all fields.");
        return;
      }

      try {
        await addDoc(collection(db, "products"), {
          userId: authUser.uid,
          productName: product.product,
          Category: product.Category,
          Price: product.Price,
          imageUrl: inpImg,
        });
        toast("product added successfully !", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        });
        setTimeout(() => {
          navigate("/");
        }, 2000);

        setProduct({ product: "", Category: "", Price: "" });
        setImg(null);
      } catch (error) {
        console.error(error);
      }
    } else {
      toast("login required!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  async function handleImag(e) {
    const file = e.target.files;
    if (!file) return;

    uploadImage(file[0]);
  }

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "olx-Clone-using-react"); // Replace with your preset name
      formData.append("cloud_name", "dfhlyxwyy");

      const json = await fetch(
        "https://api.cloudinary.com/v1_1/dfhlyxwyy/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const cloudinaryImg = await json.json();

      console.log(cloudinaryImg);
      setImg(cloudinaryImg.secure_url);
    } catch (error) {}
  };

  return (
    <Fragment>
      <Header />
      <div>
        <div className="centerDiv">
          <form onSubmit={onSubmit}>
            <label htmlFor="product">Product Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="product"
              name="product"
              value={product.product}
              onChange={handleChanges}
            />
            <br />
            <label htmlFor="category">Category</label>
            <br />
            <input
              className="input"
              value={product.Category}
              type="text"
              id="category"
              name="Category"
              onChange={handleChanges}
            />
            <br />
            <label htmlFor="price">Price</label>
            <br />
            <input
              className="input"
              type="number"
              id="price"
              value={product.Price}
              name="Price"
              onChange={handleChanges}
            />
            <br />
            {inpImg && (
              <img alt="Posts" width="200px" height="200px" src={inpImg} />
            )}
            <br />
            <input onChange={handleImag} type="file" />
            <br />
            {error && <p className="error">{error}</p>}
            <button type="submit" className="uploadBtn">
              Upload and Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default Create;
