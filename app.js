/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls two dices as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- A player looses his ENTIRE score when he roles two 6 in a row. after that, it's the next player turn  
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The players can determine the final score. if there's no input, then the first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying,  lastDice1Roll, lastDice2Roll;

initGame();

document.querySelector('.btn-roll').addEventListener('click', function () { 
    if (gamePlaying) {
        var firstDice, secondDice;

        //Random number
        firstDice = Math.floor((Math.random() * 6) + 1);
        secondDice = Math.floor((Math.random() * 6) + 1);
        

        //Display the result
        document.getElementById('dice-0').src = 'dice-' + firstDice + '.png';
        document.getElementById('dice-1').src = 'dice-' + secondDice + '.png';
        
        document.getElementById('dice-0').style.display = 'block';
        document.getElementById('dice-1').style.display = 'block';

        //Update the round score if the rolled number not 1
        if ((firstDice === 6 || secondDice === 6) && (lastDice1Roll === 6 || lastDice2Roll ===6)) {
            
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer();
            
            
        } else if (firstDice !== 1 && secondDice !== 1)  {
            
            //Add score
            roundScore += firstDice + secondDice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;


        } else {
            
            //Next player
            nextPlayer();

          }
        
        lastDice1Roll = firstDice;
        lastDice2Roll = secondDice;
    }
});

document.querySelector(".btn-hold").addEventListener('click', function () {
    
    if (gamePlaying) {
        
        var playersWinningInput = document.querySelector('.final-score').value;
        var winningInput;
        
        if (playersWinningInput) {
            winningInput = playersWinningInput;
        } else {
            winningInput = 100;
        }
        
        //add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        //update GLOBAL score in UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        //Check if any player won the game
        if (scores[activePlayer] >= winningInput) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            hideDice();
            gamePlaying = false;

        } else {
        //Next player
            nextPlayer();
        }
    }

});

document.querySelector('.btn-new').addEventListener('click', initGame);

function initGame() {
    
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    
    document.querySelector(".player-0-panel").classList.remove('winner');
    document.querySelector(".player-1-panel").classList.remove('winner');
    document.querySelector(".player-0-panel").classList.remove('active');
    document.querySelector(".player-1-panel").classList.remove('active');
    document.querySelector(".player-0-panel").classList.add('active');

    hideDice();

}

//To determine next player
function nextPlayer() {

    (activePlayer === 0) ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
        
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
        
        
    document.querySelector(".player-0-panel").classList.toggle('active');
    document.querySelector(".player-1-panel").classList.toggle('active');
        
    hideDice();

}

function hideDice() {
    
    document.getElementById('dice-0').style.display = 'none';
    document.getElementById('dice-1').style.display = 'none';
}