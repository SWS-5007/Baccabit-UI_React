import React, { Component } from 'react';
import $ from 'jquery'; 
import _ from 'lodash';
import Wallet from './wallet';
import RecentBets from './recentBets';
import Chat from './chat';
import Player from './player';
import Banker from './banker';
import Action from './action';


const initialState = {
    playerBetAmount : [],
    tieBetAmount : [],
    bankerBetAmoount : [],
    coinType : 'one',
    coinAmount : 1,
    betamount : 0,
    playeramount : 0,
    tieamount:0,
    bankeramount:0,
    playerScore : 0,
    bankerScore : 0,
    playerFinalScore : 0,
    bankerFinalScore : 0,
    deck : [
        {v:1,f:"c1"},{v:2,f:"c2"},{v:3,f:"c3"},{v:4,f:"c4"},{v:5,f:"c5"},{v:6,f:"c6"},
        {v:7,f:"c7"},{v:8,f:"c8"},{v:9,f:"c9"},{v:10,f:"c10"},{v:0,f:"c11"},{v:0,f:"c12"},{v:0,f:"c13"},
        {v:1,f:"h1"},{v:2,f:"h2"},{v:3,f:"h3"},{v:4,f:"h4"},{v:5,f:"h5"},{v:6,f:"h6"},
        {v:7,f:"h7"},{v:8,f:"h8"},{v:9,f:"h9"},{v:10,f:"h10"},{v:0,f:"h11"},{v:0,f:"h12"},{v:0,f:"h13"},
        {v:1,f:"s1"},{v:2,f:"s2"},{v:3,f:"s3"},{v:4,f:"s4"},{v:5,f:"s5"},{v:6,f:"s6"},
        {v:7,f:"s7"},{v:8,f:"s8"},{v:9,f:"s9"},{v:10,f:"s10"},{v:0,f:"s11"},{v:0,f:"s12"},{v:0,f:"s13"},
        {v:1,f:"d1"},{v:2,f:"d2"},{v:3,f:"d3"},{v:4,f:"d4"},{v:5,f:"d5"},{v:6,f:"d6"},
        {v:7,f:"d7"},{v:8,f:"d8"},{v:9,f:"d9"},{v:10,f:"d10"},{v:0,f:"d11"},{v:0,f:"d12"},{v:0,f:"d13"}
    ],
    cardOffset:'',
    playerOverAllbalance : 1000,
    dealBtnShow : 'show',
    clearBtnShow: 'hide',
    rebetBtnShow : 'hide',
    goBack : false,
    playerWinner : '',
    bankerWinner : '',
    gameTied : '',
    scale: 1,
    translateX: 0,
    translateY: 0,
};
const cardOffsets =[];
const selectedWager = [];
class Baccarat extends Component {
    
    constructor(){
        super();
        this.state = initialState;
        this.SelectAmount = this.SelectAmount.bind(this);
        this.getPos = this.getPos.bind(this);
        this.selectWager = this.selectWager.bind(this);
        this.deal = this.deal.bind(this);
        this.rebet = this.rebet.bind(this);
        this.showAllCards = this.showAllCards.bind(this);
        this.animate = this.animate.bind(this);
        this.shuffleDeck = this.shuffleDeck.bind(this);
        this.shuffleCardsAndSetHands = this.shuffleCardsAndSetHands.bind(this);
        this.flipCards = this.flipCards.bind(this);
        this.clearBet = this.clearBet.bind(this);
    }
    
    handleWindowResize = () => {
        const { innerWidth, innerHeight } = window;
        // Set your desired scaling and translation values here
        const scale = Math.min(innerWidth / 1920, innerHeight / 1080);
        const translateX = (innerWidth - 1920 * scale) / 2;
        const translateY = (innerHeight - 1080 * scale) / 2;
    
        this.setState({ scale, translateX, translateY });
      }
    
      componentDidMount() {
        // Add the resize event listener when the component mounts
        window.addEventListener('resize', this.handleWindowResize);
        // Trigger the initial scaling and translation
        this.handleWindowResize();
      }
    
      componentWillUnmount() {
        // Remove the resize event listener when the component unmounts
        window.removeEventListener('resize', this.handleWindowResize);
      }

    getPos(el) {
        console.log(el,'ggggggggggg')
      for (var lx=0, ly=0;
         el !== null;
         lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
        return {x: lx,y: ly};
    }
    
    SelectAmount(type) {
        var coinValue ;
        switch(type) {
            case "five" :
                coinValue = 5;
            break;
            case "twenty-five" :
                coinValue = 25;
            break;
            case "hundred" :
                coinValue = 100;
            break;
            case "two-hundred-fifty" :
                coinValue = 250;
            break;
            case "five-hundred" :
                coinValue = 500;
            break;
            case "thousand" :
                coinValue = 1000;
            break;
            default:
                coinValue = 0;
            break;
        }
        
        this.setState({
               coinType : type ,
               coinAmount : coinValue
        });        
    }
    
    selectWager(wagerType) {
        
        if(wagerType === "player-coordinates") {
            var wagerCircleDiv = "playerDivPosition";
        } else if(wagerType === "tie-coordinates") {
             wagerCircleDiv = "tieDivPosition";
        } else if(wagerType === "banker-coordinates") {
             wagerCircleDiv = "bankerDivPosition";
        }
       
        var itm = document.getElementById(this.state.coinType);
        this.setState({
            clearBtnShow : 'show' 
     });  
        var coinOffset = this.getPos(itm);
        
        var cln = itm.cloneNode(true); // creating clone
        cln.id = '';
        cln.style.position = "absolute";
        cln.style.opacity= 0.8;
        cln.style.left = coinOffset.x + "px";
        cln.style.top = coinOffset.y + "px";
        cln.style.zIndex = 99999;
        
        if(wagerType === "tie-coordinates") {
            cln.className = this.state.coinType+'-chip tiecurrency currency-btn1';
        } else if(wagerType === "player-coordinates"){
            cln.className = this.state.coinType+'-chip currency currency-btn2';
        } else{
          cln.className = this.state.coinType+'-chip currency currency-btn3';
      }
       
        var innerDiv = document.getElementById('coins-container');
       
        innerDiv.insertBefore(cln, innerDiv.firstChild);

        var offsets = this.getPos(document.getElementById(wagerCircleDiv));
       
        this.animate(offsets,cln); // applying animate functionality
        
        if(wagerType==="player-coordinates") {
            
            this.setState({
                
                playeramount : this.state.playeramount + this.state.coinAmount
                
            });
            
        } else if(wagerType==="tie-coordinates"){
            
            this.setState({
                
                tieamount : this.state.tieamount + this.state.coinAmount
                
            });
            
        } else if(wagerType==="banker-coordinates") {
            
            this.setState({
                
                bankeramount : this.state.bankeramount + this.state.coinAmount
                
            });
        }
        
        var finalbet = (parseInt(this.state.betamount, 10) + parseInt(this.state.coinAmount, 10));
        
        selectedWager[this.state.coinType] = wagerType;
        
        this.setState({
               betamount  : finalbet
        });
        
        
    }
    
    showAllCards(i,thirdCardType='both') {
            var divToMove = document.getElementById('firstCard');
            var cardOffset = this.getPos(divToMove);
            var cln = divToMove.cloneNode(true); // creating clone
            cln.id = 'card-'+i;
            cln.style.position = "absolute";
            cln.style.opacity= 0.8;
            cln.style.left = cardOffset.x + "px";
            cln.style.top = cardOffset.y + "px";
            cln.style.zIndex = 99999;

            var innerDiv = document.getElementById('chip-container');
            innerDiv.insertBefore(cln, innerDiv.firstChild);
            var cardType='';
            
            if(thirdCardType === 'both') {
                if(i === 0){
                    cardType = 'playerfirstCard';
                }
                else if(i===1) {
                    cardType = 'bankerfirstCard';
                }
                else if(i===2) {
                    cardType = 'playersecondCard';
                }
                else if(i===3) {
                    cardType = 'bankersecondCard';
                }
            } else if(thirdCardType === 'player') {
                cardType = 'playerthirdCard';
            } else if(thirdCardType === 'banker') {
                cardType = 'bankerthirdCard';
            }
            
            var offsets = this.getPos(document.getElementById(cardType));
           
            this.animate(offsets,cln); // applying animate functionality
            cardOffsets.push(offsets);
    }
    
    updatePlayerScore(n) {
        var playerhand = this.state.player;
        var bankerhand = this.state.banker;
        var cardObj;
        var playerscrore = this.state.playerScore;
        var bankerscrore = this.state.bankerScore;
        
        if(n===0) {
            cardObj = playerhand[0];
            playerscrore+=cardObj.v;
        }
        else if(n===1){
            cardObj = bankerhand[0];
            bankerscrore+=cardObj.v;
        }
        else if(n===2) {
            cardObj = playerhand[1];
            playerscrore+=cardObj.v;
        }
        else if(n===3){
            cardObj = bankerhand[1];
            bankerscrore+=cardObj.v;
        }
        
        this.setState({
           playerScore :  playerscrore,
           bankerScore :  bankerscrore
        });
        
    }
    
    getPlayerHands(n) {
        var playerhand = this.state.player;
        var bankerhand = this.state.banker;
        var cardObj;
        
        if(n===0) {
            cardObj = playerhand[0];
        }
        else if(n===1){
            cardObj = bankerhand[0];
        }
        else if(n===2) {
            cardObj = playerhand[1];
        }
        else if(n===3){
            cardObj = bankerhand[1];
        }
        return cardObj;
    }
    
    //=============Step 1=============
    shuffleCardsAndSetHands() {
        var deck        = this.shuffleDeck(this.state.deck);
        var playerhand  = [];
        var bankerhand  = [];
        playerhand.push(deck.pop());
        playerhand.push(deck.pop());

        bankerhand.push(deck.pop());
        bankerhand.push(deck.pop());
        this.setState({
           player       : playerhand,
           banker       : bankerhand,
           cardOffset   : cardOffsets
        },function(){
            this.openAllCards();
        });
       
    }
    //=============Step 2=============
    openAllCards(){
        var allOffset = this.state.cardOffset;
        var i = 0;
        for (var key in allOffset) {
            if (allOffset.hasOwnProperty(key)) {
                var obj = allOffset[key];
                this.openOneByOne(i++, obj);
            }
        }
    }
    //=============Step 3=============
    openOneByOne(n, obj) {
      setTimeout(function() {
        var cardObj = this.getPlayerHands(n); // get player cards
        if(typeof cardObj === 'undefined') {
            return false;
        }
        var cardImage = document.createElement("img");
        cardImage.style.position = "absolute";
        cardImage.style.left =  obj.x + "px";
        cardImage.style.top = obj.y + "px";
        cardImage.style.zIndex = 100006;
        cardImage.setAttribute('src', 'assets/cards/'+cardObj.f+'.png');
        cardImage.setAttribute('id', 'orig-card-'+n);
        cardImage.setAttribute('height', '144px');
        cardImage.setAttribute('width', '96px');

        var hiddenImage = document.createElement("img");
        hiddenImage.style.position = "absolute";
        hiddenImage.style.left =  obj.x + "px";
        hiddenImage.style.top = obj.y + "px";
        hiddenImage.style.zIndex = 100006;
        hiddenImage.setAttribute('src', 'assets/cards/hidden.png');
        hiddenImage.setAttribute('id', 'hidden-card-'+n);
        hiddenImage.setAttribute('height', '144px');
        hiddenImage.setAttribute('width', '96px');
        hiddenImage.addEventListener('click', this.flipCards.bind(this,obj, cardImage, n));

        var innerDiv = document.getElementById('chip-container');
        innerDiv.appendChild(cardImage);
        innerDiv.appendChild(hiddenImage);
        //innerDiv.insertBefore(newDiv, innerDiv.firstChild);
        var offsets = this.getPos(document.getElementById('tieDivPosition'));

        // Comment this for stop animation
        // this.animate(offsets,hiddenImage); // applying animate functionality
        // this.animate(offsets,cardImage); // applying animate functionality

        this.goBack(obj, cardImage, n);
        
        this.updatePlayerScore(n); // update player score
        
      }.bind(this), 800 * n); // 3000
      
    }
    
    flipCards(obj, cardImage, n){
        $("#hidden-card-"+n).addClass("hidden-flip-cards").delay(200).queue(function(next){
            $(this).remove();
            next();
            $('#orig-card-'+n).addClass('orig-flip-cards');
        });
        this.goBack(obj,cardImage, n);
    }
    
    goBack(obj,cardImage,n) {
        setTimeout(function() {
            $('#card-'+n).remove(); // remove old cards 
            $('#hidden-card-'+n).remove(); // remove old cards 
            this.animate(obj,cardImage);
            if(n===3) {
                this.setState({
                   playerFinalScore : this.handScore(this.state.playerScore),
                   bankerFinalScore : this.handScore(this.state.bankerScore)
                }); // updating score
                
                this.gameRules();
            }
        }.bind(this), 500);    // 2000    
    }
    
    // Game Rules
    
    gameRules() {
        
        if(this.state.goBack) {
            return false;
        }
        this.setState({
           goBack:true
        });
        
        var playerDraw          = false;
        var playerStand         = false;
        var playerNaturalStand  = false;
        var bankerDraw          = false;
        var bankerStand         = false;
        var bankerNaturalStand  = false;        
        var bankerCardDisplay   = false;
         //=====================Player Rules========================
        if(this.state.playerFinalScore <= 5 || this.state.playerFinalScore === 10) {
            playerDraw =true;
        }
        else if( this.state.playerFinalScore <= 6 || this.state.playerFinalScore === 7 ) {
            playerStand = true;
        }
        else if( this.state.playerFinalScore <= 8 || this.state.playerFinalScore === 9 ) {
            playerNaturalStand = true;
            playerStand = true;
        }

        var i=4;
        if(playerDraw) {
            var deck = this.shuffleDeck(this.state.deck);
            var playerhand  = [];
            playerhand.push(deck.pop());
            this.setState({
                thirdPlayerHand : playerhand
            },function(){
                this.showAllCards(i,'player');
            });

            var cardObj;
            var playerCard = this.state.thirdPlayerHand;
            cardObj = playerCard[0];
            var playerThirCardValue = cardObj.v;  
        }

        //=====================Banker Rules========================

        if(!playerNaturalStand) {

            var bankerScore = this.state.bankerFinalScore;

            if(bankerScore >= 0 && bankerScore <= 2) {
              bankerDraw = true;
            }
            else if(bankerScore === 3) {
              if( (playerDraw && playerThirCardValue >= 0 && playerThirCardValue <= 7) || (playerDraw && playerThirCardValue === 9 ) ) {
                  bankerDraw = true;
              }
              else if( playerDraw &&  playerThirCardValue===8 ) {
                  bankerStand = true;
              }
            }
            else if(bankerScore === 4) {
              if( (playerDraw && playerThirCardValue >= 2 && playerThirCardValue <= 7) ) {
                  bankerDraw = true;
              }
              else if( (playerDraw &&  playerThirCardValue>=8 && playerThirCardValue>=10) || (playerDraw &&  playerThirCardValue <= 1) ) {
                  bankerStand = true;
              }
            }
            else if(bankerScore === 5) {
              if( (playerDraw && playerThirCardValue >= 4 && playerThirCardValue <= 7) ) {
                  bankerDraw = true;
              }
              else if( (playerDraw &&  playerThirCardValue>=0 && playerThirCardValue>=3) || (playerDraw &&  playerThirCardValue>=8 && playerThirCardValue <= 9) ) {
                  bankerStand = true;
              }
            }
            else if(bankerScore === 6) {
              if( (playerDraw && playerThirCardValue >= 6 && playerThirCardValue <= 7) ) {
                  bankerDraw = true;
              }
              else if( (playerDraw &&  playerThirCardValue>=0 && playerThirCardValue<=5) || (playerDraw &&  playerThirCardValue>=8 && playerThirCardValue <= 9) ) {
                  bankerStand = true;
              }
            }
            else if( bankerScore === 7 && playerStand ) {
                  bankerDraw = true;
            }
            else if( playerStand && playerNaturalStand && bankerScore >= 8 && bankerScore <= 9 ) {
                  bankerDraw = true;
            }

            if(bankerDraw) {


                i++;
                deck = this.shuffleDeck(this.state.deck);
                var bankerhand  = [];
                bankerhand.push(deck.pop());
                this.setState({
                    thirdBankerHand : bankerhand
                },function(){
                    this.showAllCards(i,'banker');
                });
            }

        }

        if(playerDraw) {

            setTimeout(function() {
                this.openPlayerThirdCard(4,'player', playerDraw, bankerDraw, bankerCardDisplay);
            }.bind(this), 800);
        }

        if(bankerDraw) {
            setTimeout(function() {
                this.openBankerThirdCard(5,'banker', playerDraw, bankerDraw, bankerCardDisplay);
            }.bind(this), 1400);
        }

        if(!playerDraw && !bankerDraw) {
            this.calculateWinner(); // calculating winner
        }
    }
    
    calculateWinner() {
        setTimeout(function() {
            if(this.state.playerFinalScore > this.state.bankerFinalScore) {
                this.setState({
                    playerWinner : 'winner' 
                });
            } else if(this.state.playerFinalScore < this.state.bankerFinalScore) {
                this.setState({
                    bankerWinner : 'winner' 
                });
            } else if(this.state.playerFinalScore === this.state.bankerFinalScore) {
                this.setState({
                    gameTied : 'winner' 
                });
            }
            this.setState({
                rebetBtnShow      : 'show'
            });
        }.bind(this), 2000); 
    }
    openPlayerThirdCard(i,type, playerDraw, bankerDraw, bankerCardDisplay){
        var playerCard = this.state.thirdPlayerHand;
        
        var n=i;
        
        var cardObj = playerCard[0];
        var playerThirCardValue = cardObj.v;
        var dimensions = this.getPos(document.getElementById('playerthirdCard'));
        bankerCardDisplay = false;
        var allOffset = this.state.cardOffset;
        //console.log(allOffset);
        //console.log(allOffset[4]);
        
        if(allOffset[4])
        {
            var gobackOffset = allOffset[4];
        }
        this.createNewCard(n, cardObj, dimensions, playerThirCardValue, type, playerDraw, bankerDraw, bankerCardDisplay, gobackOffset);
        this.setState({
            playerThirCardValue : playerThirCardValue
        });

    }
    
    openBankerThirdCard(i,type, playerDraw, bankerDraw, bankerCardDisplay){
        var bankerCard = this.state.thirdBankerHand;
        
        var n=i;
        bankerCardDisplay = true;
        var cardObj = bankerCard[0];
        var bankerThirCardValue = cardObj.v;
        var dimensions = this.getPos(document.getElementById('bankerthirdCard'));
        var allOffset = this.state.cardOffset;
        //console.log(allOffset);
        //console.log(allOffset[4]);
        if(allOffset[5]) {
            var gobackOffset = allOffset[5];
        } else {
             gobackOffset = allOffset[4];
        }
        this.createNewCard(n, cardObj, dimensions, bankerThirCardValue, type, playerDraw, bankerDraw, bankerCardDisplay, gobackOffset);
        this.setState({
            bankerThirCardValue : bankerThirCardValue
        });

    }
    
    createNewCard(n, cardObj,dimensions, thirdCardScore, type, playerDraw, bankerDraw, bankerCardDisplay, gobackOffset) {
       
        var cardImage = document.createElement("img");
        cardImage.style.position = "absolute";
        cardImage.style.left =  dimensions.x + "px";
        cardImage.style.top = dimensions.y + "px";
        cardImage.style.zIndex = 100006;
        cardImage.setAttribute('src', 'assets/cards/'+cardObj.f+'.png');
        cardImage.setAttribute('id', 'orig-card-'+n);
        cardImage.setAttribute('height', '144px');
        cardImage.setAttribute('width', '96px');

        var hiddenImage = document.createElement("img");
        hiddenImage.style.position = "absolute";
        hiddenImage.style.left =  dimensions.x + "px";
        hiddenImage.style.top = dimensions.y + "px";
        hiddenImage.style.zIndex = 100006;
        hiddenImage.setAttribute('src', 'assets/cards/hidden.png');
        hiddenImage.setAttribute('id', 'hidden-card-'+n);
        hiddenImage.setAttribute('height', '144px');
        hiddenImage.setAttribute('width', '96px');
        hiddenImage.addEventListener('click', this.flipCards.bind(this,dimensions, cardImage, n));

        var innerDiv = document.getElementById('chip-container');
        innerDiv.appendChild(cardImage);
        innerDiv.appendChild(hiddenImage);
        //innerDiv.insertBefore(newDiv, innerDiv.firstChild);
        var offsets = this.getPos(document.getElementById('tieDivPosition'));

        // Comment this for stop animation
        // this.animate(offsets,hiddenImage); // applying animate functionality
        // this.animate(offsets,cardImage); // applying animate functionality
        
        if(type === 'player') {
            var playerscrore = this.state.playerFinalScore;
            playerscrore+=thirdCardScore;
            this.setState({
                playerFinalScore :  this.handScore(playerscrore)
            });
        } else {
            var bankerscrore = this.state.bankerFinalScore;
            bankerscrore+=thirdCardScore;
            this.setState({
                bankerFinalScore :  this.handScore(bankerscrore)
            });
        }
        
        if(playerDraw && bankerDraw && bankerCardDisplay) {
             this.calculateWinner(); // calculating winner
        } else if(!playerDraw && bankerDraw && bankerCardDisplay) {
             this.calculateWinner(); // calculating winner
        } if(playerDraw && !bankerDraw) {
             this.calculateWinner(); // calculating winner
        }
        this.goBack(gobackOffset, cardImage, n);
    }
    
    handScore(hand) {
        if(hand >= 10) {
          var one = String(hand).charAt(1);
          return Number(one);
        }

        return hand;
    }
    //=============Animate any div=============
    animate(offsets,divToAnimate) {
        $(divToAnimate).animate({
               left: offsets.x + "px",
               top:offsets.y + "px",
               position:'absolute',
               zIndex:99999,
               opacity: 1
        });
    }
    
    deal() {
        
        this.setState({
           dealBtnShow : 'hide',
           rebetBtnShow : 'hide'
        });
        for(var i=0;i < 4;i++) {
            this.showAllCards(i);
        }
        setTimeout(function () {
           this.shuffleCardsAndSetHands();
        }.bind(this), 600);
         
    }
    clearBet() {
        console.log('cleaaaaaaaaaaa');
        var innerDiv = document.getElementById('coins-container');
        innerDiv.innerHTML=""
    }
    reset() {
            
            this.setState({
            playerScore : 0,
            bankerScore : 0,
            playerFinalScore : 0,
            bankerFinalScore : 0,
            deck : [
                {v:1,f:"c1"},{v:2,f:"c2"},{v:3,f:"c3"},{v:4,f:"c4"},{v:5,f:"c5"},{v:6,f:"c6"},
                {v:7,f:"c7"},{v:8,f:"c8"},{v:9,f:"c9"},{v:10,f:"c10"},{v:0,f:"c11"},{v:0,f:"c12"},{v:0,f:"c13"},
                {v:1,f:"h1"},{v:2,f:"h2"},{v:3,f:"h3"},{v:4,f:"h4"},{v:5,f:"h5"},{v:6,f:"h6"},
                {v:7,f:"h7"},{v:8,f:"h8"},{v:9,f:"h9"},{v:10,f:"h10"},{v:0,f:"h11"},{v:0,f:"h12"},{v:0,f:"h13"},
                {v:1,f:"s1"},{v:2,f:"s2"},{v:3,f:"s3"},{v:4,f:"s4"},{v:5,f:"s5"},{v:6,f:"s6"},
                {v:7,f:"s7"},{v:8,f:"s8"},{v:9,f:"s9"},{v:10,f:"s10"},{v:0,f:"s11"},{v:0,f:"s12"},{v:0,f:"s13"},
                {v:1,f:"d1"},{v:2,f:"d2"},{v:3,f:"d3"},{v:4,f:"d4"},{v:5,f:"d5"},{v:6,f:"d6"},
                {v:7,f:"d7"},{v:8,f:"d8"},{v:9,f:"d9"},{v:10,f:"d10"},{v:0,f:"d11"},{v:0,f:"d12"},{v:0,f:"d13"}
            ],
            cardOffset:'',
            playerOverAllbalance : 1000,
            dealBtnShow : 'show',
            rebetBtnShow : 'hide',
            goBack : false,
            playerWinner : '',
            bankerWinner : '',
            gameTied : ''
        });
        cardOffsets.length = 0;
    }
    rebet() {
        $('#chip-container').html('');
        this.reset();
        this.deal();
    }
    
    shuffleDeck (deck) {
      return _.shuffle(_.shuffle(_.shuffle(_.shuffle(deck))));
    }
    
    render() {
       const { scale, translateX, translateY } = this.state; 
      return (<div>
       <div className="baccarat-view">
       <div className=''>
       {/* style={{ transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)` }} */}
            <div className="baccarat" style={{ transform: `${window.innerWidth <= 1536 ? `scale(${scale}) translate(${translateX}px, ${translateY}px)` : 'none'}` }}>
                <div className="baccarat-wrapper">

                        <div id="chip-container"></div>
                        <div id="coins-container"></div>
                        <RecentBets />
                    <div className="baccarat-card-grid">
                        <Player />
                        <Banker />
                    </div>

                    <div className="baccarat-footer-grid">
                        <Wallet totalbet={this.state.betamount} playerOverAllbalance={this.state.playerOverAllbalance}/>
                        <Action 
                        playerFinalScore={this.state.playerFinalScore} 
                        bankerFinalScore={this.state.bankerFinalScore}
                        selectFive={this.SelectAmount.bind(this, 'five')}
                        selectTwentyFive={this.SelectAmount.bind(this, 'twenty-five')}
                        selectHundred={this.SelectAmount.bind(this, 'hundred')}
                        selectTwoHundredFifty={this.SelectAmount.bind(this, 'two-hundred-fifty')}
                        selectFiveHundred={this.SelectAmount.bind(this, 'five-hundred')}
                        selectThousand={this.SelectAmount.bind(this, 'thousand')}
                        deal={this.deal}
                        rebet={this.rebet}
                        dealBtnShow={this.state.dealBtnShow}
                        rebetBtnShow={this.state.rebetBtnShow}
                        clearBet={this.clearBet}
                        clearBtnShow={this.state.clearBtnShow}
                        playerBetAmount={this.state.playerBetAmount}
                        tieBetAmount={this.state.tieBetAmount}
                        bankerBetAmoount={this.state.bankerBetAmoount}
                        coinType={this.state.coinType}
                        playerDrop={this.selectWager.bind(this, 'player-coordinates')}
                        tieDrop={this.selectWager.bind(this, 'tie-coordinates')}
                        bankerDrop={this.selectWager.bind(this, 'banker-coordinates')}
                        playerhand={this.state.player}
                        bankerhand={this.state.banker}
                        playerWinner={this.state.playerWinner}
                        bankerWinner={this.state.bankerWinner}
                        gameTied={this.state.gameTied}   

                        />
                        <Chat /> 
                    </div>
                
                </div>
            </div>
        </div>
       </div>
    </div>);
}
}

export default Baccarat;
