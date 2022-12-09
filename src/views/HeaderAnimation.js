import React from "react";
import '../CSS/HeaderAnimation.css';

function HeaderAnimation () {
  return (
    <div className="header-animation">
      <div className="swing">
        <div className="swing-l"></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div className="swing-r"></div>
      </div>
      <div className="shadow">
        <div className="shadow-l"></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div className="shadow-r"></div>
      </div>
    </div>
  );
}

export default HeaderAnimation;
