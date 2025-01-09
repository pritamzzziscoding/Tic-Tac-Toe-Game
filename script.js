let choice = document.querySelector(".choice").classList;
let main = document.querySelector(".main").classList;
let result = document.querySelector(".result").classList;

let piece = document.querySelectorAll(".piece");
let keys = document.querySelectorAll(".keys");
let restart = document.querySelector("#restart-btn");

console.log(choice);

let winner = document.querySelector("#winner");
let play = document.querySelector("#play");

let board = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
let winStructure = [
    // 0  1  2
    // 3  4  5
    // 6  7  8
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let flag = false;
let playerPiece = null;
let winPiece = null;
let countTurn = 0;
let playersTurn = false;

function check(){
    winStructure.forEach((structure)=>{
        let i = structure[0];
        let j = structure[1];
        let k = structure[2];
        if(board[i]==board[j] && board[j]==board[k] && board[i]!=-1){
            flag = true;
            winPiece = (board[i] == playerPiece) ? "Player" : "Computer";
            keys[i].style.backgroundColor = "lightgreen";
            keys[j].style.backgroundColor = "lightgreen";
            keys[k].style.backgroundColor = "lightgreen";
        }
    });
    if(flag == true){
        playersTurn = false;
        winner.innerText = (winPiece == "Player") ? "!!!Player Wins!!!" : "!!!Computer Wins!!!";
        result.remove("hide");
    }
    if(countTurn == 9){
        setTimeout(()=>{
            result.remove("hide");
        },1000);
    }
}

function compPlays(){
    setTimeout(()=>{
        playersTurn = true;
        let get = false;
        let num = -1;
        while(get == false){
            num = Math.floor(Math.random()*100) % 9;
            if(board[num] == -1){
                get = true;
            }
        }
        console.log(board[num]);
        board[num] = playerPiece ^ 1;
        countTurn += 1;
        console.log(board[num]);
        if(board[num] == 0){
            keys[num].innerText = 'O';
        }else{
            keys[num].innerText = 'X';
        }
        check();
    },1000);
}

piece.forEach((val) =>{
    val.addEventListener("click",(event)=>{
        let tag = event.target;
        let ch = tag.innerText;
        if(ch === 'X'){
            play.innerText = "Player Plays With X";
            playerPiece = 1;
            playersTurn = true;
        }else{
            play.innerText = "Player Plays With O";
            playerPiece = 0;
            compPlays();
            countTurn += 1;
        }
        console.log(playerPiece);
        choice.add("hide");
        main.remove("hide");
    });
});

keys.forEach((val)=>{
    val.addEventListener("click", (event)=>{
        if(playersTurn == false) return;
        const tag = Number(event.target.getAttribute("id"));
        console.log(tag);
        if(board[tag] == -1){
            board[tag] = playerPiece;
            keys[tag].innerHTML = playerPiece == 1 ? 'X' : 'O';
            countTurn += 1;
            check();
            playersTurn = false;
            if(flag == false){
                compPlays();
            }
        }
    });
});

restart.addEventListener("click", ()=>{
    console.log("reload");
    location.reload();
});