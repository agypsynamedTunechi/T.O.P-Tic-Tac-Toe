function CreatePlayer(name, marker){
    return{name, marker};
}

const Gameboard = (function(){
    const board = ["","","","","","","","",""];

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

    const switchPlayer = ()=>{
        currentPlayer = currentPlayer == player1 ? player2 : player1;
    }

    const getCurrentPlayer = ()=>{
        return currentPlayer;
    }

    const checkWinner = (board)=>{
        const winningCombinations = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

        for(let comb of winningCombinations){
            const [a,b,c] = comb;

            if(board[a] && board[a] === board[b] && board[a] === board[c]){
                return board[a];
            }
    } }
    

    const displayWinner = (winner)=>{

        if(winner == player1.marker){
            console.log(`${player1.name} wins`)
        }else if(winner == player2.marker){
            console.log(`${player2.name} wins`)
        }else if(winner = "XO"){
            console.log("draw")
        }
    }



    return {switchPlayer, getCurrentPlayer, checkWinner, displayWinner}
})()

 function playerTurn(position){
        if(Gameboard.getBoard()[position] === ""){
        Gameboard.setMove(position, Game.getCurrentPlayer().marker);
        console.log(Gameboard.getBoard());
        }else{
            console.log("This position has been taken!!!")
        }
    
        if(Game.checkWinner(Gameboard.getBoard())){
            const winner = Game.checkWinner(Gameboard.getBoard());
            Game.displayWinner(winner);
        }else if(!Gameboard.getBoard().includes("")){
            const winner = "XO";
            Game.displayWinner(winner);
        }

        Game.switchPlayer()
       
    }


const Display = (function(){
    const cells = document.querySelectorAll(".cell");
    const player1 = document.querySelector(".player-1");
    const player2 = document.querySelector(".player-2");
    const startBtn = document.querySelector(".start-btn");
    const resetBtn = document.querySelector(".reset-btn");

    cells.forEach(cell => cell.addEventListener("click", UpdateScreen))

    const displayBoard = ()=>{
        for(let i = 0; i < cells.length; i++){
           cells[i].textContent = Gameboard.getBoard()[i];
        }
    }   
    return{displayBoard}

})()

function UpdateScreen(){
    console.log(Game.getCurrentPlayer())
    if(this.textContent == ""){
      playerTurn(this.dataset.id);
      Display.displayBoard()
    }else{
        alert("This Position has been taken")
    }


   
}
