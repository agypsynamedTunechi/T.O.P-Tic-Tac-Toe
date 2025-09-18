function createPlayer(name, marker) {
    return { name, marker };
}

const gameBoard = {
    board: ["X", "X", "X",
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

    function playerTurn(position) {
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
    return{playerTurn, player}
})()

const checkWinner = function (){
    const board = gameBoard.board;
    // console.log(board)
    const winningCombination = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ]

    for(let comb of winningCombination){
        const [a,b,c] = comb;
        if(board[a] && board[a] === board[b] && board[a] === board[c]){
            return console.log(board[a])
        }
    } 
    displayWinner()
    
}

function displayWinner(){
    const winner = checkWinner();
    if(winner === "X"){
        return console.log(`player1 wins`)
    }
}


