var tiles = document.getElementsByClassName("tile");
var buttons = document.getElementsByClassName("button");

var state = [0,0,0,0,0,0,0,0,0];
game = true;

var human = false;
var computer = true;

var humval = -1;
var comval = 1;

var winMatrix = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [6, 4, 8],
                [2, 4, 6]
                ];

function reset(){

  for (var i = 0; i < 9; i++){
    tiles[i].style.background = "#fff";
    state[i] = 0;
  }

  for(var i = 0; i < 2; i++){
    buttons[i].style.width = "15.5vh";
    buttons[i].style.margin = "0.5vh";
    buttons[i].style.opacity = "1";
  }

  game= true;

}

function claim(clicked){

  if(!game)
    return;

  for(var i = 0; i < 9; i++){
    if(tiles[i] == clicked && state[i] == 0){
      set(i, human)
      callAI();
    }
  }
}

function set(index, player){

  if(!game)
    return;

  if(state[index] == 0){
    buttons[0].style.width = "0";
    buttons[0].style.margin = "0";
    buttons[0].style.opacity = "0";

    buttons[1].style.width = "32vh";

    if(player == human){
      tiles[index].style.background = "#A095EE";
      state[index] = humval;
    } else{
      tiles[index].style.background = "#57BCD9";
      state[index] = comval;
    }

    if(checkWin(state, player))
      game = false;
  }
}



function checkWin(board, player){

  var value = player == human ? humval : comval;

  for(var i = 0; i < 8; i++){

    var win = true;

    for(var j = 0; j < 3; j++){
      if(board[winMatrix[i][j]] != value){
        win = false;
        break;
      }
    }
    if(win)
      return true;
  }
  return false;
}

function checkFull(board)
{
  for(var i =0; i < 9; i++){
    if(board[i] == 0)
      return false;
  }

  return true;
}

function callAI(){
  AITurn(state, 0, computer)
}

function AITurn(board, depth, player){
  if(checkWin(board, !player))
    return -10 + depth;

  if(checkFull(board))
    return 0;

  var value = player == human ? humval : comval;

  var max = -Infinity;
  var index = 0;

  for(var i = 0; i < 9; i++){
    if(board[i]== 0){
      var newBoard = board.slice();
      newBoard[i] = value;

      var moveVal = -AITurn(newBoard, depth + 1, !player);

      if(moveVal > max){
        max = moveVal;
        index = i;
      }
    }
  }
  if(depth == 0)
    set(index, computer);

  return max;
}
