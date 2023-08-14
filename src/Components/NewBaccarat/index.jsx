import React from "react";

import Action from "./Action";
import Banker from "./Banker";
import Chat from "./Chat";
import Player from "./Player";
import Wallet from "./Wallet";

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
          <div id="chip-container"></div>
          <div className="newbaccarat-card-grid">
            <Player />
            <Banker />
          </div>

          <div className="newbaccarat-footer-grid">
            <Wallet />
            <Action />
            <Chat />
          </div>
        </div>
      </div>
    </>
  );
};
