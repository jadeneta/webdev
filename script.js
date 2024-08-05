


function Gameboard() {
    this.gameboardArray = new Array(9).fill({});
    this.setUpGame = (game) => {
        for(let i = 0; i< 9; i++){
            const gameCube = {};
            gameCube.gameCubeDiv = document.createElement("div");
            gameCube.gameCubeDiv.addEventListener("click", () => game.claimCube(gameCube, this))
            gameCube.index = i;
            gameCube.ownedBy = null;
            this.gameboardArray[i] = gameCube;
        }
    }

    this.renderGame = () => {
        const gameboardContainer = document.querySelector(".gameboard-container");
        this.gameboardArray.forEach((element) => {
            gameboardContainer.appendChild(element.gameCubeDiv)
        });
    }

    this.resetGame = () => {
        this.gameboardArray.forEach((element) => {
            element.ownedBy = null;
            element.gameCubeDiv.innerText = "";
        });
    }

    
    this.checkForWinners = (game) => {
        const winConditions = [
          [0, 1, 2],
          [0, 3, 6],
          [0, 4, 8],
          [1,4,7],
          [2,5,8],
          [2,4,6],
          [3,4,5],
          [6,7,8],
        ];
        for (const condition of winConditions) {
          const [a, b, c] = condition;
          const owner = this.gameboardArray[a].ownedBy;
          if (owner && owner === this.gameboardArray[b].ownedBy && owner === this.gameboardArray[c].ownedBy) {
            console.log("winner is " + `${owner.name}`)
            owner.score++;
            const player1 = game.players[0];
            const player2 = game.players[1];
            const player1Score = document.querySelector('.player-1-score');
            player1Score.innerText = `${player1.name}: ${player1.score}`
            const player2Score = document.querySelector(".player-2-score");
            player2Score.innerText = `${player2.name}: ${player2.score}`
            this.resetGame();
            return owner;
          }
        }
        console.log("no winner");
        return null;
      };

}

function Game(){
    this.players = []
    this.addPlayer = (player) => {
        this.players.push(player);
    }
    this.activePlayerIndex = 0;
    this.getActivePlayer = () => {
        return this.players[this.activePlayerIndex];
    };
    this.switchPlayer = () => {
        this.activePlayerIndex = (this.activePlayerIndex + 1) % this.players.length;
    };

    this.claimCube = (gameCube, gameBoard) => {
        if(gameCube.ownedBy !== null){
            return false;
        }
        else{
            const player = this.getActivePlayer();
            gameCube.ownedBy = player;
            gameCube.gameCubeDiv.innerText = `${player.sign}`;
            gameboard.checkForWinners(this);
            this.switchPlayer();
            const playerTurn = document.querySelector(".player-turn");
            playerTurn.innerText = `${this.getActivePlayer().name}'s turn`
            
        }
    }
    this.startGame = () => {
        const player1 = game.players[0];
        const player2 = game.players[1];
        const playerTurn = document.querySelector(".player-turn");
        playerTurn.innerText = `${player1.name}'s turn`
        const player1Score = document.querySelector('.player-1-score');
        player1Score.innerText = `${player1.name}: ${player1.score}`
        const player2Score = document.querySelector(".player-2-score");
        player2Score.innerText = `${player2.name}: ${player2.score}`

        

        gameboard.setUpGame(this);
        gameboard.renderGame();
        const div = document.querySelector(".player-creation-div");
        document.body.removeChild(div);
    }
}

function Player(name, sign) {
    this.name = name;
    this.sign = sign;
    this.score = 0;
}

const gameboard = new Gameboard();
const game = new Game();

button = document.querySelector(".player-creation-button");
input = document.querySelector("#player-name-input");
h1 = document.querySelector(".h1");
let click = 0;
button.addEventListener("click", () => {
  if(click === 0){
    const playerName = input.value;
    if (playerName) {
        const player1 = new Player(playerName, "X");
        game.addPlayer(player1);
    }
    click++;
    h1.innerText = "Player 2";
    input.value = "";
  }
  else{
    let player2 = new Player(input.value, "O");
    game.addPlayer(player2);


    game.startGame();

  }
});



// hi



