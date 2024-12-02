import React, { useContext } from "react";
import { UserContext, FirebaseContext } from "../../store/firebaseContext";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";

import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../store/searchContext";
function Header(prop) {
  const navigate = useNavigate();
  const { authUser } = useContext(UserContext);
  const { auth } = useContext(FirebaseContext);
  const { setsearch } = useContext(SearchContext)



  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input value={'Sulthan Bathery, Wayanad'} type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
              onChange={(e) => setsearch(e.target.value)}
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {authUser ? (
            <span> {authUser.displayName} </span>
          ) : (
            <sapn>
              <Link to="/login">Login</Link>{" "}
            </sapn>
          )}
          <hr />
        </div>
        {authUser && (
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              signOut(auth).then(() => navigate("/login"));
            }}
          >
            logOut
          </span>
        )}
        <Link to={"/sell-Product"}>
          {" "}
          <div className="sellMenu">
            <SellButton></SellButton>

            <div className="sellMenuContent">
              <SellButtonPlus></SellButtonPlus>
              <span>SELL</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
