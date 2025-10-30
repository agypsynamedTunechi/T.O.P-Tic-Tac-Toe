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

    function resetBoard() {
        for (let i = 0; i < board.length; i++) {
            if (board[i] !== "") {
                board[i] = "";

            }
        }
    }
    return { getBoard, setMove, resetBoard };
})()


const Display = (function () {
    const cells = document.querySelectorAll(".cell");
    const player1 = document.querySelector(".player-1");
    const player2 = document.querySelector(".player-2");
    const startBtn = document.querySelector(".start-btn");
    const resetBtn = document.querySelector(".reset-btn");
    const dialog = document.querySelector("#dialog");
    const playerNameBoard = document.querySelector(".player-name")
    const playerOneName = document.querySelector("#player-1-name");
    const playerTwoName = document.querySelector("#player-2-name");
    const radios = document.querySelectorAll("input[name='marker']")
    const selectedRadio = document.querySelector("input[name='marker']:checked")
    const playBtn = document.querySelector(".submit");
    const formEl = document.querySelector("form")

    let player1Name = "";
    let player2Name = "";




    const displayBoard = () => {
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = Gameboard.getBoard()[i];
        }
    }

    // function resetBoard (){
    //     for(let i = 0; i < cells.length; i++){
    //     if(cells[i].textContent !== ""){
    //         cells[i].textContent = "";

    //     }
    //     }
    // }


    return {
        displayBoard, player1,
        player2, cells,
        playerNameBoard, playerOneName,
        playerTwoName, selectedRadio,
        dialog, resetBtn, startBtn,
        playBtn, formEl, player1Name,
        player2Name, radios

    }

})()


const Game = function (user1, user2) {
    const player1 = user1;
    const player2 = user2;


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
    console.log(Display.displayBoard())

    const checkWinner = (board) => {
        const winningCombinations = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

        for (let comb of winningCombinations) {
            const [a, b, c] = comb;

            // if (Display.cells[a].textContent && Display.cells[a].textContent === Display.cells[b].textContent && Display.cells[a].textContent === Display.cells[c].textContent) {
            //     console.log(Display.cells[a].textContent)
            //     return Display.cells[a].textContent;

            // }

            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                console.log(Display.cells[a].textContent);
                Display.cells[a].style.backgroundColor = "#008170"
                Display.cells[b].style.backgroundColor = "#008170"
                Display.cells[c].style.backgroundColor = "#008170"


                return board[a];

            } else if (!board.includes("")) {
                return 'XO';
            }

        }

    }


    const displayWinner = (winner) => {


        if (winner == player1.marker) {
            Display.playerNameBoard.textContent = `${player1.name} wins`



        } else if (winner == player2.marker) {
            Display.playerNameBoard.style.textAlign = "center"
            Display.playerNameBoard.textContent = `${player2.name} wins`

        } else if (winner = "XO") {
            Display.playerNameBoard.textContent = `Draw`
        }

        Display.playerNameBoard.style.paddingRight = "auto"
        Display.playerNameBoard.style.color = "white"
        Display.playerNameBoard.style.fontSize = "20px"
        Display.playerNameBoard.style.fontFamily = '"Luckiest Guy", Arial, Helvetica, sans-serif'
        Display.playerNameBoard.style.justifyContent = "center"
        Display.playerNameBoard.style.backgroundColor = "#008170"
    }


    function UpdateScreen() {

        if (!checkWinner(Gameboard.getBoard())) {
            if (this.textContent == "") {
                console.log(getCurrentPlayer())
                playerTurn(this.dataset.id);
                Display.displayBoard()

            } else {
                alert("This Position has been taken")
            }

        } else {
            return
        }
    }

    function cellColor() {

        if (getCurrentPlayer() == getPlayer1()) {
            Display.player1.style.backgroundColor = "#028391"

            // Display.cells.forEach((cell) => {
            //     if (cell.textContent == "X") {
            //         cell.style.backgroundColor = "#028391";
            //     }
            // });



        } else {
            Display.player1.style.backgroundColor = "#232D3F"

            // Display.cells.forEach((cell) => {
            //     if (cell.textContent == "X") {
            //         cell.style.backgroundColor = "#232D3F";
            //     }
            // });


        }


        if (getCurrentPlayer() == getPlayer2()) {
            Display.player2.style.backgroundColor = "#028391"

            // Display.cells.forEach((cell) => {
            //     if (cell.textContent == "O") {
            //         cell.style.backgroundColor = "#028391";
            //     }
            // });



        } else {
            Display.player2.style.backgroundColor = "#232D3F"
            // Display.cells.forEach((cell) => {
            //     if (cell.textContent == "O") {
            //         cell.style.backgroundColor = "#232D3F";
            //     }
            // });
        }

        if (checkWinner(Gameboard.getBoard())) {


            Display.cells.forEach((cell) => {
                if (cell.textContent == checkWinner(Gameboard.getBoard())) {
                    cell.style.backgroundColor = "#008170";
                }
            });
        }
    }

    function showBoard() {
        console.log(Display.cells)
        Display.cells.forEach(cell => cell.classList.toggle("visible"));
        Display.playerNameBoard.classList.toggle("visible");
        Display.player1.textContent = player1.name;
        Display.player2.textContent = player2.name;
    }

    function playerTurn(position) {

        if (Gameboard.getBoard()[position] === "") {
            Gameboard.setMove(position, getCurrentPlayer().marker);
        } else {
            console.log("This position has been taken!!!")
        }
        if (checkWinner(Gameboard.getBoard())) {
            const winner = checkWinner(Gameboard.getBoard());
            displayWinner(winner);
        }
        switchPlayer()
    }

    Display.dialog.addEventListener("close", showBoard);
    Display.cells.forEach(cell => cell.addEventListener("click", UpdateScreen))
    Display.cells.forEach(cell => cell.addEventListener("click", cellColor))
    Display.resetBtn.addEventListener("click", () => {
        Gameboard.resetBoard()
        currentPlayer = player1
        checkWinner(Gameboard.getBoard())
        cellColor()
        Display.cells.forEach((cell) => {
            cell.style.backgroundColor = "#232D3F";

        });
        Display.displayBoard()
        console.log(Gameboard.getBoard())

    })


    return { cellColor, getCurrentPlayer }
}



Display.startBtn.addEventListener("click", () => {
    dialog.showModal();
});

let player1marker = ""

Display.radios.forEach((radio) => {
    radio.addEventListener("change", function () {
        player1marker = document.querySelector("input[name='marker']:checked").value
    })
})


Display.playBtn.addEventListener("click", (event) => {
    if (
        Display.playerOneName.value === "" ||
        Display.playerTwoName.value === "" ||
        player1marker === ""
    ) {
        return;
    }
    event.preventDefault();


    const player1name = Display.playerOneName.value;
    const player2name = Display.playerTwoName.value;
    console.log(player1name)
    const player1 = CreatePlayer(player1name, player1marker)
    const player2 = CreatePlayer(player2name, player1marker == "X" ? "O" : "X");

    const game = Game(player1, player2)
    game.cellColor()

    Display.dialog.close();

});


