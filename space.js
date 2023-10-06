let tileSize = 32;
let rows = 16;
let columns = 16;
let board;
let boardWidth = tileSize * columns; //width depends on column
let boardHeight = tileSize * rows; // height depends on rows
let context;

//ship
let shipWidth = tileSize * 1; //*2
let shipHeight = tileSize * 2; //added*2
let shipX = (tileSize * columns) / 2 - tileSize * 2;
let shipY = tileSize * rows - tileSize; //* 2;
let shipImg;
let shipVelocityX = tileSize; //one tile change

//ship object
let ship = {
  x: shipX,
  y: shipY,
  width: shipWidth,
  height: shipHeight,
};
window.onload = function () {
  board = document.getElementById(`board`);
  board.width = boardWidth;
  board.height = boardHeight;
  context = board.getContext(`2d`); //used for drawing on the board

  //load ship
  shipImg = new Image();
  shipImg.src = `images/ship.png`;
  shipImg.onload = function () {
    context.drawImage(shipImg, ship.x, ship.y, ship.height, ship.width);
  };
  requestAnimationFrame(update);
  // left right movement of ship
  document.onkeydown = function (e) {
    key = e.key;
    if (key == `ArrowLeft`) {
      ship.x -= shipVelocityX;
    } else if (key == `ArrowRight`) {
      ship.x += shipVelocityX;
    }
  };
  //console.log(e.key);
};
function update() {
  requestAnimationFrame(update);
  context.clearRect(0, 0, board.width, board.height);
  //drawing the ship over and over in canvas
  context.drawImage(shipImg, ship.x, ship.y, ship.height, ship.width);
}
