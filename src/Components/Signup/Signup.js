import React, { useContext, useState } from "react";
import {FirebaseContext} from "../../store/firebaseContext";
import {doc,setDoc} from 'firebase/firestore'
import {  createUserWithEmailAndPassword ,updateProfile } from "firebase/auth";
import {useNavigate} from 'react-router-dom'
import { Link } from "react-router-dom";
import {
  EmailRegex,
  passwordRegex,
  UsernameRegex,
  phoneRegex,
} from "../../utils/constraint";



import Logo from "../../olx-logo.png";
import "./Signup.css";



export default function Signup() {

  const [errors, setErrors] = useState({});
  const [signupInfo, setInfo] = useState({
    
    userName: "",
    email: "",
    phone: "",
    password: "",
  });

const navigate=useNavigate()

  function validate() {
    let isValid = true;
    const errors = {};

    if (!EmailRegex.test(signupInfo.email)) {
      errors.email = "Enter a valid email";
      isValid = false;
    }
    if (!UsernameRegex.test(signupInfo.userName)) {
      errors.userName = "Enter a valid name";
      isValid = false;
    }
    if (!passwordRegex.test(signupInfo.password)) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }
    if (!phoneRegex.test(signupInfo.phone)) {
      errors.phone = "Enter a valid phone";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  }


  
  function handleChanges(e) {
    const { name, value } = e.target;
    setInfo({ ...signupInfo, [name]: value });
  }

  const {auth , db}=useContext(FirebaseContext)

  console.log(auth);
  


  async function handleSubmit(e) {

    e.preventDefault();
    if (validate()) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth,
          signupInfo.email,
          signupInfo.password
        );
        await updateProfile(userCredential.user , {
          displayName: signupInfo.userName,
        });

       await setDoc(doc(db,'users',userCredential.user.uid),{
          id:userCredential.user.uid,
          userName:signupInfo.userName,
          phoneNumber : signupInfo.phone

        });
        
        navigate('/login')

        console.log(userCredential.user.uid, userCredential.user.email);
      } catch (error) {
        console.error("Error creating user:", error.code, error.message);
      }
    }
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img className="olxLogo" width="200px" height="200px" src={Logo} alt="Logo" />

        <form onSubmit={handleSubmit}>
          <label htmlFor="userName">User Name</label>
          <input
            className="input"
            type="text"
            id="userName"
            name="userName"
            value={signupInfo.userName}
            onChange={handleChanges}
          />
          {errors.userName && <span className="error-message">* {errors.userName}</span>}
          <br />

          <label htmlFor="email">Email</label>
          <input
            className="input"
            type="text"
            id="email"
            name="email"
            value={signupInfo.email}
            onChange={handleChanges}
          />
          {errors.email && <span className="error-message">* {errors.email}</span>}
          <br />

          <label htmlFor="phone">Phone</label>
          <input
            className="input"
            type="tel"
            id="phone"
            name="phone"
            value={signupInfo.phone}
            onChange={handleChanges}
          />
          {errors.phone && <span className="error-message">* {errors.phone}</span>}
          <br />

          <label htmlFor="password">Password</label>
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={signupInfo.password}
            onChange={handleChanges}
          />
          {errors.password && <span className="error-message">* {errors.password}</span>}
          <br />

          <button type="submit">Signup</button>
        </form>
      < Link to={"/login"} >Login </Link>
      </div>
    </div>
  );
}
