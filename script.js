function createPlayer(name, marker) {
    return { name, marker };
}

const gameBoard = {
    board: ["", "", "",
        "", "", "",
        "", "", ""
    ]
}

const player1 = createPlayer("Jon", "X");
const player2 = createPlayer("Snow", "O");

const Game = function (player1, player2) {
    return {
        board: gameBoard.board,
        player: [player1, player2],
        currentPlayer: 0,
        playerTurn
    }
}

function playerTurn(position) {
    if (this.board[position] == "") {
        this.board[position] = this.player[this.currentPlayer].marker;
        console.log(`${this.player[this.currentPlayer].name} played in ${position}`)
        console.table(this.board)
        this.currentPlayer = (this.currentPlayer + 1) % 2;
    } else {
        console.log(`This position has already been taken`)
    }

     if (checkWinner(this.board)) {
        const winner = checkWinner(this.board)
        displayWinner(winner);
        return;
    }
};

const checkWinner = function (board) {
    const winningCombination = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    for (let comb of winningCombination) {
        const [a, b, c] = comb;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a]

        }
    }

}

function displayWinner(winner) {
    console.log(`${winner} wins!!!`)
}


