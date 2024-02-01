import React, { useEffect } from "react";
import { preLoaderAnim } from "../animations";
import "../styles/preloader.css";

const PreLoader = () => {
  useEffect(() => {
    preLoaderAnim();
  }, []);
  return (
    <div className="preloader">
      <div className="texts-container">
        <span>Write,</span>
        <span>Execute,</span>
        <span>Done!</span>
      </div>
    </div>
  );
};

export default PreLoader;