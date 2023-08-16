import React from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { X, Wallet as WalletIcon, Clipboard2 } from "react-bootstrap-icons";

import "./styles.css";

const DepositWithdrawTipModal = ({
  open,
  setOpen,
  walletType,
  setWalletType,
}) => {
  const handleDWTBtn = (type) => {
    setWalletType(type);
  };

  return (
    <Modal
      className="deposit-withdraw-modal"
      show={open}
      onHide={() => setOpen(false)}
      style={{ backgroundColor: "transparent !important" }}
    >
      <div className="deposit-modal-wrapper">
        <div className="deposit-modal-header">
          <div className="deposit-modal-wallet-box">
            <WalletIcon className="deposit-modal-walletIcon" />
            Wallet
          </div>

          <button
            className="deposit-modal-closebtn"
            onClick={() => setOpen(false)}
          >
            <X className="deposit-modal-closeIcon" />
          </button>
        </div>

        <div className="deposit-modal-type-btn-box">
          <button
            className={
              walletType === "deposit" ? "deposit-modal-type-btn-selected" : ""
            }
            onClick={() => handleDWTBtn("deposit")}
          >
            Deposit
          </button>

          <button
            className={
              walletType === "withdraw" ? "deposit-modal-type-btn-selected" : ""
            }
            onClick={() => handleDWTBtn("withdraw")}
          >
            Withdraw
          </button>

          <button
            className={
              walletType === "tip" ? "deposit-modal-type-btn-selected" : ""
            }
            onClick={() => handleDWTBtn("tip")}
          >
            Tip
          </button>
        </div>

        <div className="deposit-modal-content-wrapper">
          {walletType === "deposit" ? (
            <div className="deposit-modal-depositcontent">
              <div className="deposit-modal-currency-network-btn-box">
                <div>
                  Currency
                  <Form.Select size="sm">
                    <option>USDT</option>
                  </Form.Select>
                </div>

                <div>
                  Network
                  <Form.Select size="sm">
                    <option>ETH</option>
                    <option>BEEP20</option>
                  </Form.Select>
                </div>
              </div>

              <div className="deposit-modal-currency-wallet-address-wrapper">
                <span
                  style={{
                    fontSize: "14px",
                    color: "white",
                    paddingLeft: "20px",
                  }}
                >
                  Your USDT deposit address
                </span>

                <div className="deposit-modal-currency-wallet-address-box">
                  <span>0xdac17f9580d2ee523a220606994597c13d831ec7</span>
                  <button className="deposit-modal-wallet-address-copy-btn">
                    <Clipboard2 className="deposit-modal-wallet-address-copy-icon" />
                  </button>
                </div>
              </div>

              <div className="deposit-modal-qrcode-wrapper">
                <div className="deposit-modal-qrcode-box"></div>

                <div className="deposit-modal-qrcode-text">
                  Only send USDT on the ETH network to this address
                  <br /> <br />2 confirmations required
                </div>
              </div>
            </div>
          ) : walletType === "withdraw" ? (
            <div className="deposit-modal-withdrawcontent">
              <Form.Select size="sm" className="deposit-modal-currency-balance">
                <option>0.000000000</option>
              </Form.Select>

              <div className="deposit-modal-BTC-address-wrapper">
                <span
                  style={{
                    fontSize: "14px",
                    color: "white",
                    paddingLeft: "12%",
                  }}
                >
                  BTC Address
                </span>

                <div className="deposit-modal-BTC-address-box">
                  0xdac17f9580d2ee523a220606994597c13d831ec7
                </div>
              </div>

              <div className="deposit-modal-BTC-amount-wrapper">
                <span
                  style={{
                    fontSize: "14px",
                    color: "white",
                    paddingLeft: "12%",
                  }}
                >
                  Amount:
                </span>

                <div className="deposit-modal-BTC-amount-box">
                  0.00 $
                  <button className="deposit-modal-BTC-MAK-btn">MAK</button>
                </div>
              </div>

              <div className="deposit-modal-withdrawal-text">
                Your withdrawal will have 0.00000000 subtracted from your
                remaining balance to cover the transaction fee.
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DepositWithdrawTipModal;
