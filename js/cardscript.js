/**
/* 
Name:  Hyeonjin Lee
Assignment:  Assignment 1
Date:  February 10 2015

Page Description: the main script for this application
Files: index.html - the main page for displaying whole contents on the screen.
       myHelp.html - the second page linked by main page for giving information
                     how to play this game.
       cardStyle.css - the main styles for this application
 */
function gameStart() { // After the start button clicked
    start = new Date().getTime();
    cardAll = ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5',
                '6', '6','7', '7', '8', '8', '9', '9', 'a', 'a',
                'b', 'b', 'c', 'c']; 
    setTimeout(cardMixUp(),100);
    gameCount = 0;
    cardSelecteds = []; //Store card selected
    cardSelectedID = []; //Store the value(id) of the card
    gameScore = 100;
    var printout = '';    
    for (var i = 0; i < cardAll.length; i++) {
        printout += '<div id="cards_' + i + '" onclick="cardSelected(this,\''
                + cardAll[i] + '\')"></div>';
    }
    document.getElementById('cardPack').innerHTML = printout;
} 
// After calling the click event on each card
function cardSelected(card, data) { 
    var gametimes = cardSelecteds.length; // Length of array of card fliped
    if (gametimes < 2) { 
        card.style.background = 'url(images/images' + data + '.jpg) no-repeat';
        card.style.backgroundSize = '81px 81px';
        if (gametimes == 0) {
            cardSelecteds[0] = data;
            cardSelectedID[0] = card.id;
        } else if (gametimes == 1 && cardSelectedID[0] != card.id) {
            cardSelecteds[1] = data;
            cardSelectedID[1] = card.id;
            if (cardSelecteds[0] == cardSelecteds[1]) {
                //First card selected or fliped
                var t1 = document.getElementById(cardSelectedID[0]); 
                //Second card selected or fliped
                var t2 = document.getElementById(cardSelectedID[1]);
                //Fade out the cards matched
                setTimeout(fade(t1,100),3000);
                setTimeout(fade(t2,10),3000);
                gameCount += 2;  // Count the number of card matched
                gameScore += 30; // Plus the score
                //Initialize the array  
                cardSelecteds = [];
                cardSelectedID = [];
                //Check to see if the cands is matched
                if (gameCount == cardAll.length) {
                    document.getElementById("result").innerHTML = "Success!!!";
                    document.getElementById("result").innerHTML = '<p> Your score : \n' + gameScore +'</p>';
                    //Store end time of the game
                    var end = new Date().getTime();
                    //Count the whole time
                    var totaltime = end - start;
                    alert("Game End.   Your Score : " + gameScore + "  Game time : "+ totaltime);
                    var r = confirm("Do you want to game again?");
                    if (r == true){
                        gameStart();
                        document.getElementById("result").innerHTML = "Last score : " + gameScore;
                    } else {  
                        document.getElementById("result").innerHTML = "Your score : " + gameScore;
                    }
                }
            } else {
                gameScore -= 5; //Remove the score
                function returnCard() {
                    //Flip the cards back over 
                    var card1 = document.getElementById(cardSelectedID[0]);
                    var card2 = document.getElementById(cardSelectedID[1]);
                    card1.style.background = 'url(images/imagesm.jpg) no-repeat';
                    card1.style.backgroundSize = '81px 81px';
                    card2.style.background = 'url(images/imagesm.jpg) no-repeat';
                    card2.style.backgroundSize = '81px 81px';
                    //Initialize the array 
                    cardSelecteds = [];
                    cardSelectedID = [];
                }
                setTimeout(returnCard, 700);
            }
        }
    }
}
function cardMixUp() {
    //mix array of cardAll
    for (var i = 1; i < cardAll.length; i++){
        var j = Math.floor(Math.random() * (i + 1)); 
        //swap the cards
        var temp = cardAll[j];
        cardAll[j] = cardAll[i];
        cardAll[i] = temp;
    }
}
//remove the cards matched
function fade(elem, time) {
    var startOpacity = 1;
    elem.style.opacity = startOpacity;
    (function go() {
        elem.style.opacity -= 0.05;
        if (elem.style.opacity > 0)
            setTimeout(go, 50);
    })();
}
//After the help button clicked
function openWin() {
   window.open("source/myHelp.html", "myWindow", "width=400, height=300");
}
//close the help window
function closeWin(myHelp) {
    window.close();
}

