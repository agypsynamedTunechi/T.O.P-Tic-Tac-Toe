function CreatePlayer(name, marker) {
    return { name, marker };
}

const Gameboard = (function () {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => [...board];

    function setMove(position, marker) {
        if (board[position] == "") {
            board[position] = marker;
            console.log(getBoard());
        }
    }
    return { getBoard, setMove };
})()

const Game = (function () {
    const player1 = CreatePlayer("Jon", "X");
    const player2 = CreatePlayer("Snow", "O");
    let currentPlayer = player1;

    const getPlayer1 = () => {
        return player1;
    }

    const getPlayer2 = () => {
        return player2
    }

    const switchPlayer = () => {
        currentPlayer = currentPlayer == player1 ? player2 : player1;
    }

    const getCurrentPlayer = () => {
        return currentPlayer;
    }

    const checkWinner = (board) => {
        const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

        for (let comb of winningCombinations) {
            const [a, b, c] = comb;

            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
    }


    const displayWinner = (winner) => {

        if (winner == player1.marker) {
            console.log(`${player1.name} wins`)
        } else if (winner == player2.marker) {
            console.log(`${player2.name} wins`)
        } else if (winner = "XO") {
            console.log("draw")
        }
    }



    return { getPlayer1, getPlayer2, switchPlayer, getCurrentPlayer, checkWinner, displayWinner }
})()

function playerTurn(position) {
    if (Gameboard.getBoard()[position] === "") {
        Gameboard.setMove(position, Game.getCurrentPlayer().marker);
        console.log(Gameboard.getBoard());
    } else {
        console.log("This position has been taken!!!")
    }

    if (Game.checkWinner(Gameboard.getBoard())) {
        const winner = Game.checkWinner(Gameboard.getBoard());
        Game.displayWinner(winner);
    } else if (!Gameboard.getBoard().includes("")) {
        const winner = "XO";
        Game.displayWinner(winner);
    }

    Game.switchPlayer()

}


const Display = (function () {
    const cells = document.querySelectorAll(".cell");
    const player1 = document.querySelector(".player-1");
    const player2 = document.querySelector(".player-2");
    const startBtn = document.querySelector(".start-btn");
    const resetBtn = document.querySelector(".reset-btn");
    const dialog = document.querySelector("#dialog");
    const playerOneName = document.querySelector("#player-1-name");
    const playerTwoName = document.querySelector("#player-2-name");
    const xRadio = document.querySelector("#x");
    const oRadio = document.querySelector("#o");
    const playBtn = document.querySelector(".submit");


    // Hide board when game hasn't started
    function showBoard(){
        if(cells.style.visibility  == "visible"){
            cells.style.visibility = "hidden";
        }else{
            cells.style.visibility = "visible"
        }
    }



    startBtn.addEventListener("click", () => {
        dialog.showModal();
    });

    dialog.addEventListener("close", () => {
        addBookToLibrary();
        displayBook();

    });

    playBtn.addEventListener("click", (event) => {
        if (
            titleInput.value === "" ||
            authorInput.value === "" ||
            pagesInput.value === ""
        ) {
            return;
        }
        event.preventDefault();
        dialog.close();
        showBoard()
    });


    cells.forEach(cell => cell.addEventListener("click", UpdateScreen))
    startBtn.addEventListener("click", cellColor)
    const displayBoard = () => {
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = Gameboard.getBoard()[i];
        }
    }





    return { displayBoard, player1, player2, }

})()



function UpdateScreen() {
    if (this.textContent == "") {
        console.log(Game.getCurrentPlayer())
        playerTurn(this.dataset.id);
        Display.displayBoard()
    } else {
        alert("This Position has been taken")
    }


}

function cellColor() {
    console.log(Game.getPlayer1())
    if (Game.getCurrentPlayer() == Game.getPlayer1()) {
        Display.player1.style.backgroundColor = "#028391"
        console.log(Game.getCurrentPlayer())

        // for(let i = 0; i < cells.length; i++){
        //     if(cells[i].textContent == Game.player1.marker){
        //         cells[i].style.backgroundColor = "#028391"
        //     }
        // }


    } else {
        Display.player1.style.backgroundColor = "#232D3F"
    }
}

