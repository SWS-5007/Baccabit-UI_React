import React from "react";
import "./loader.css";

export const Loader = () => {
  return (
    <div className="loader-wrap">
      <img src={process.env.PUBLIC_URL + "/vedios/bbs_anim.gif"} />
    </div>
  );
};
