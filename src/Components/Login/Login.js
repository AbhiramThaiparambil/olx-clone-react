import React, { useContext, useState } from "react";
import {FirebaseContext} from "../../store/firebaseContext";
import {  getAuth ,signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from 'react-router-dom'


import {EmailRegex,passwordRegex} from "../../utils/constraint";



import Logo from '../../olx-logo.png';
import './Login.css';

function Login() {

const navigate =useNavigate()
 const [loginInfo,setLogininfo]=useState({email:'fdfdf',password:' '})
 const [errors, setErrors] = useState({});
const {auth,db}=useContext(FirebaseContext)

 function handleChanges(e){
   const{name,value}=e.target
   setLogininfo({...loginInfo,[name]:value})
 }

 function validate(){
  let isValid = true;
    const errors = {};

    if (!EmailRegex.test(loginInfo.email)) {
      errors.email = "Enter a valid email";
      isValid = false;
    }
   
    if (!passwordRegex.test(loginInfo.password)) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }
  

    setErrors(errors);
    return isValid;
 }

  async function handleSubmit(e){
 try {
  e.preventDefault();
  if (validate()) {
      
  const userCredential= await signInWithEmailAndPassword(auth,loginInfo.email,loginInfo.password)
       if(userCredential){
        navigate('/')
      }
  }
 } catch (error) {
  alert(error.message)
 }
 }
  return (

    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          {errors.email && <span className="error-message">* {errors.email}</span>}
          <input
            className="input"
            type="text"
            id="fname"
            name="email"
            value={loginInfo.email}
            onChange={handleChanges}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          {errors.password && <span className="error-message">* {errors.password}</span>}

          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={loginInfo.password}
            onChange={handleChanges}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
