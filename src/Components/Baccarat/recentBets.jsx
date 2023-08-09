import React from "react"
import dollar from "../../../public/assets/wallet-dollar-old.png"


function RecentBets() {
    return (
      <div className="recent-bets">
        <div className="recent-bets-content">
            <div className="recent-bets-list">
                <div className="recent-bets-dollar">
                    <img src={dollar} alt="" />
                </div>
                <div className="recent-bets-message">
                @usename: bet $100.00 and <span className="won">won</span> $200.00
                </div>
            </div>
            <div className="recent-bets-list">
                <div className="recent-bets-dollar">
                    <img src={dollar} alt="" />
                </div>
                <div className="recent-bets-message">
                @usename: bet $100.00 and <span className="loss">lost</span> $200.00
                </div>
            </div>
            <div className="recent-bets-list">
                <div className="recent-bets-dollar">
                    <img src={dollar} alt="" />
                </div>
                <div className="recent-bets-message">
                @usename: bet $100.00 and <span className="won">won</span> $200.00
                </div>
            </div>
            <div className="recent-bets-list">
                <div className="recent-bets-dollar">
                    <img src={dollar} alt="" />
                </div>
                <div className="recent-bets-message">
                @usename: bet $100.00 and <span className="loss">lost</span> $200.00
                </div>
            </div>
            <div className="recent-bets-list">
                <div className="recent-bets-dollar">
                    <img src={dollar} alt="" />
                </div>
                <div className="recent-bets-message">
                @usename: bet $100.00 and <span className="won">won</span> $200.00
                </div>
            </div>
            <div className="recent-bets-list">
                <div className="recent-bets-dollar">
                    <img src={dollar} alt="" />
                </div>
                <div className="recent-bets-message">
                @usename: bet $100.00 and <span className="loss">lost</span> $200.00
                </div>
            </div>
        </div>
      </div>
    );
  }
  
export default RecentBets;