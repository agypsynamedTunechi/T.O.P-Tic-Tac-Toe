function createPlayer(name, marker) {
    return { name, marker };
}

const gameBoard = {
    board: ["", "", "",
        "", "", "",
        "", "", ""
    ]
}

const gameControl = (function () {
    const board = gameBoard.board;
    const player1 = createPlayer("Jon", "X");
    const player2 = createPlayer("Snow", "O");
    const player = [player1, player2];
    let currentPlayer = 0;

    return function playerTurn(position) {
        if (board[position] == "") {
            board[position] = player[currentPlayer].marker;
            console.log(`${player[currentPlayer].name} played in ${position}`)
            console.table(board)
            currentPlayer = (currentPlayer + 1) % 2;
        } else {
            console.log(`This position has already been taken`)
        }

        function getCurrentPlayer() {
            return currentPlayer;
        }

    };
})()

const checkWinner = function (){
    const winningCombination = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]

    
}
