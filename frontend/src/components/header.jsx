import React from "react";
import "./header.css";

import MyPic from "../images/dp.jpg";

function Header() {
  return (
    <>
        <div className="text-center">
            <img className="header-img" src={MyPic}/>
        </div>
    </>
  );
}

export default Header;
