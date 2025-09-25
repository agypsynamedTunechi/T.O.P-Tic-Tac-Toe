function CreatePlayer(name, marker){
    return{name, marker};
}

const Gameboard = (function(){
    const board = ["O","O","X","X","X","O","O","","O"];

    const getBoard = ()=> [...board];

    function setMove(position, marker){
        if(board[position] == ""){
            board[position] = marker;
            console.log(getBoard()); 
        }
    }
    return{getBoard, setMove};
})()

const Game = (function(){
    const player1 = CreatePlayer("Jon", "X");
    const player2 = CreatePlayer("Snow", "O");
    let currentPlayer = player1;

    function playerTurn(position){
        if(Gameboard.getBoard()[position] == ""){
            Gameboard.setMove(position, currentPlayer.marker);
            console.log(Gameboard.getBoard());
            switchPlayer();
        }else{
            console.log("This position has been taken!!!")
        }

        if(checkWinner(Gameboard.getBoard())){
            const winner = checkWinner(Gameboard.getBoard());
            displayWinner(winner);
        }
    }

    function switchPlayer(){
        currentPlayer = currentPlayer == player1 ? player2 : player1;
    }

    function checkWinner(board){
        const winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

        for(let comb of winningCombinations){
            const [a,b,c] = comb;

            if(board[a] && board[a] === board[b] && board[a] === board[c]){
                return board[a];
            }else if(!board.includes("")){
                return "XO"
            }
    } }
    

    function displayWinner(winner){

        if(winner == 'X'){
            console.log(`${player1.name} wins`)
        }else if(winner == 'O'){
            console.log(`${player2.name} wins`)
        }else if(winner = "XO"){
            console.log("draw")
        }
    }



    return {playerTurn}
})()


