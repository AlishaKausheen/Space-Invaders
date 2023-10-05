let tileSize = 32;
let rows = 16;
let columns = 16;
let board;
let boardWidth = tileSize * columns; //width depends on column
let boardHeight = tileSize * rows; // height depends on rows
let context;

window.onload = function () {
  board = document.getElementById(`board`);
  board.width = boardWidth;
  board.height = boardHeight;
  context = board.getContext(`2d`); //used for drawing on the board
};
