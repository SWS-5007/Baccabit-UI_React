import React from "react"
import coin5 from "../../../public/assets/coin-5.png"
import coin25 from "../../../public/assets/coin-25.png"
import coin100 from "../../../public/assets/coin-100.png"
import coin250 from "../../../public/assets/coin-250.png"
import coin500 from "../../../public/assets/coin-500.png"


import userplayer from "../../../public/assets/user-player.png"
import usertie from "../../../public/assets/user-tie.png"
import userbanker from "../../../public/assets/user-banker.png"

function Action(props) {
    return (
      <div className="action">

            <div id="cardsLocation" className="cardsDiv">
                <div id="firstCard" className="cardHidden">
                    <img src={'assets/cards/hidden.png'} className="img-responsive" role="presentation" height="144" style={{width: '96px'}} />
                </div>
                <div id="secondCard" className="cardHidden">
                    <img src={'assets/cards/hidden.png'} className="img-responsive" role="presentation" height="144" style={{width: '96px'}} />
                </div>
                <div id="thirdCard" className="cardHidden">
                    <img src={'assets/cards/hidden.png'} className="img-responsive" role="presentation" height="144" style={{width: '96px'}} />
                </div>
            </div>
        
           <div className="act-btns">
           <div className={"deal-btn "+props.dealBtnShow}>
                <button type="button" onClick={props.deal}>Deal</button>  
		    </div>
            <div className={"deal-btn clear-bet "+props.clearBtnShow}>
                <button type="button" onClick={props.clearBet}>Clear Bet</button>  
		    </div>
                
            <div className={"deal-btn "+props.rebetBtnShow}>
                <button type="button" onClick={props.rebet}>Rebet</button>
            </div>
           </div>

          <div className="action-wrapper">
                <div className="action-bg">
                    <button className="btn-1">
                        <div className="single">
                            <span>P PAIR</span>
                            <span>11:1</span>
                        </div>
                    </button>
                    <button className={"btn-2 "+props.playerWinner}  onClick={props.playerDrop} style={{background:props.playerWinner}}>
                        <div className="stats">
                            <span>$ 0.00</span>
                            <span><img src={userplayer} alt="" /> {props.playerFinalScore}</span>
                        </div>
                        <p>PLAYER</p>
                        <i id="playerDivPosition"></i>
                        {props.playerWinner && <h3>Winner</h3>}
                    </button>
                    <button className={"btn-3 "+props.gameTied} onClick={props.tieDrop} style={{background:props.gameTied}}>
                        <div className="stats">
                            <span>$ 0.00</span>
                            <span><img src={usertie} alt="" /> 4</span>
                        </div>
                        <p>TIE 8:1</p>
                        <i id="tieDivPosition"></i>
                        {props.gameTied && <h3>Winner</h3>}
                    </button>
                    <button className={"btn-4 "+props.bankerWinner} onClick={props.bankerDrop}  style={{background:props.bankerWinner}}>
                        <div className="stats">
                            <span>$ 0.00</span>
                            <span>{props.bankerFinalScore} <img src={userbanker} alt="" /></span>
                        </div>
                        <p>BANKER</p>
                        <i id="bankerDivPosition"></i>
                        {props.bankerWinner && <h3>Winner</h3>}
                    </button>
                    <button className="btn-5">
                        <div className="single">
                            <span>B PAIR</span>
                            <span>11:1</span>
                        </div>
                    </button>
                </div>

                <div className="coins-bg">
                    <div className="coins-grid">  
                        <button id="five" onClick={props.selectFive}><img src={coin5} alt="" /></button>
                        <button id="twenty-five" onClick={props.selectTwentyFive}><img src={coin25} alt="" /></button>
                        <button id="hundred" onClick={props.selectHundred}><img src={coin100} alt="" /></button>
                        <button id="two-hundred-fifty" onClick={props.selectTwoHundredFifty}><img src={coin250} alt="" /></button>
                        <button id="five-hundred" onClick={props.selectFiveHundred}><img src={coin500} alt="" /></button>
                    </div>
                </div>
          </div>

           

      </div>
    );
  }
  
export default Action;