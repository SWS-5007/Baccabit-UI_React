import React from "react";

import { Banker } from "./banker";
import { Player } from "./player";

import "./styles.css";

export const NewBaccaratComponent = () => {
  return (
    <>
      <div className="newbaccarat-wrapper">
        <div
          id="newbaccarat"
          className="newbaccarat"
          // style={{
          //   position: "absolute",
          //   top: "50%",
          //   left: "50%",
          //   transform: `${`scale(${scale}) translate(-50%, -50%)`}`,
          // }}
        >
          <div className="newbaccarat-wrapper">
            <div id="chip-container"></div>
            <div className="newbaccarat-card-grid">
              <Player />
              <Banker />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
