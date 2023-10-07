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
//alien
let alienArray = [];
let alienWidth = tileSize * 2;
let alienHeight = tileSize;
let alienX = tileSize;
let alienY = tileSize;
let alienImg;

let alienRows = 2;
let alienColumns = 3;
let alienCount = 0; //number of aliens on the screen
let alienVelocityX = 1; //alien moving speed

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
  alienImg = new Image();
  alienImg.src = "images/alien.png";
  createAlien();

  requestAnimationFrame(update);
  // left right movement of ship
  document.onkeydown = function (e) {
    key = e.key;
    if (key == `ArrowLeft` && ship.x - shipVelocityX >= 0) {
      ship.x -= shipVelocityX;
    } else if (
      key == `ArrowRight` &&
      ship.x + shipVelocityX + shipWidth < board.width
    ) {
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

  //alien drawing
  for (let i = 0; i < alienArray.length; i++) {
    let alien = alienArray[i];
    if (alien.alive) {
      //move aliens horizontally
      alien.x += alienVelocityX;
      //alien touches the border
      if (alien.x + alien.width >= board.width || alien.x + alien.width <= 0) {
        alienVelocityX *= -1;
        //alien moving down the row
        for (let j = 0; j < alienArray.length; j++) {
          alienArray[j].y += alienHeight;
        }
      }
      context.drawImage(alienImg, alien.x, alien.y, alien.height, alien.width);
    }
  }
}
function createAlien() {
  for (let c = 0; c < alienColumns; c++) {
    for (let r = 0; r < alienRows; r++) {
      let alien = {
        img: alienImg,
        x: alienX + c * alienWidth,
        y: alienY + r * alienHeight,
        width: alienWidth / 2,
        height: alienHeight * 2,
        alive: true,
      };
      alienArray.push(alien);
    }
  }
  alienCount = alienArray.length;
}
