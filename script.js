function createPlayer(name, marker) {
    return { name, marker };
}

const gameBoard = function () {
    const board = ["", "", "",
        "", "", "",
        "", "", ""
    ];

    const player1 = createPlayer("Jon", "X");
        const player2 = createPlayer("Snow", "O");
        const player = [player1, player2];
        let currentPlayer = 0;

    return function playerTurn(position) {
         
        if(board[position] == ""){
            board[position] = player[currentPlayer].marker;
            console.log(`${player[currentPlayer].name} played in ${position}`)
            console.log(board)
            currentPlayer = (currentPlayer + 1) % 2;
        }else{
            console.log(`This position has already been taken`)
        }

        function getCurrentPlayer(){
            return currentPlayer;
        }
        
    };
    
}


