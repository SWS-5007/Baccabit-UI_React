import React, { useState, useEffect } from "react";
import $ from "jquery";
import _ from "lodash";

import Action from "./Action";
import Banker from "./Banker";
import Chat from "./Chat";
import Player from "./Player";
import Wallet from "./Wallet";

import "./styles.css";

import { useBaccaratState } from "./Hooks/baccaratState";

export const NewBaccaratComponent = () => {
  const BaccaratHook = useBaccaratState();

  const handleWindowResize = () => {
    const { innerWidth, innerHeight } = window;
    // Set your desired scaling and translation values here
    const scale = Math.min(innerWidth / 1920, innerHeight / 1080);
    const translateX = (innerWidth - 1920 * scale) / 2;
    const translateY = (innerHeight - 1080 * scale) / 2;

    BaccaratHook.setBaccaratState((prev) => ({
      ...prev,
      scale: scale,
      translateX: translateX,
      translateY: translateY,
    }));
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

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
