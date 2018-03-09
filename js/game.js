//Canvas
var canvas = document.getElementById("canvas");
var c = canvas.getContext('2d');

//Background - космос
var backgroundImg = new Image();
backgroundImg.onload = function() {
  //c.drawImage(backgroundImg, 0, 0);
};
backgroundImg.src = '../img/game_bg.png';

//player - игрок
var playerImg = new Image();
backgroundImg.onload = function() {
  //c.drawImage(playerImg, 15, 5);
};
playerImg.src = '../img/player.png';

//дружеские корабли
var friend1Img = new Image();
friend1Img.onload = function() {
  //c.drawImage(friend1Img, 30, 10);
};
friend1Img.src = '../img/friend1.png';

var friend2Img = new Image();
friend2Img.onload = function() {
  //c.drawImage(friend2Img, 45, 15);
};
friend2Img.src = '../img/friend2.png';

//вражеские корабли
var enemy1Img = new Image();
enemy1Img.onload = function() {
  //c.drawImage(enemy1Img, 60, 20);
};
enemy1Img.src = '../img/enemy1.png';

var enemy2Img = new Image();
enemy2Img.onload = function() {
  //c.drawImage(enemy2Img, 75, 25);
};
enemy2Img.src = '../img/enemy2.png';

//астероид и сломанный астрероид
var asteroidImg = new Image();
asteroidImg.onload = function() {
  //c.drawImage(asteroidImg, 90, 30);
};
asteroidImg.src = '../img/asteroid.png';

var asteroid_damagedImg = new Image();
asteroid_damagedImg.onload = function() {
  //c.drawImage(asteroid_damagedImg, 105, 35);
};
asteroid_damagedImg.src = '../img/asteroid_damaged.png';

//бочка с топливом
var oil_objImg = new Image();
oil_objImg.onload = function() {
  //c.drawImage(oil_objImg, 120, 40);
};
oil_objImg.src = '../img/oil_obj.png';

//выстрел
var shootImg = new Image();
shootImg.onload = function() {
  //c.drawImage(shootImg, 135, 45);
};
shootImg.src = '../img/shoot.png';

/** интерфейс **/

//блок таймера
var timerImg = new Image();
timerImg.onload = function() {
  //c.drawImage(timerImg, 150, 50);
};
timerImg.src = '../img/timer.png';

//блок топлива
var oilImg = new Image();
oilImg.onload = function() {
  //c.drawImage(oilImg, 200, 55);
};
oilImg.src = '../img/oil.png';

//разумные области управления кораблем

var areasImgTop = new Image();
areasImgTop.onload = function() {
  //c.drawImage(areasImgTop, 101, 0, 100, 100,
  //                         350, 300, 100, 100);
};
areasImgTop.src = '../img/areas.png';

var areasImgLeft = new Image();
areasImgLeft.onload = function() {
  //c.drawImage(areasImgLeft, 0, 101, 100, 100,
  //                         250, 300, 100, 100);
};
areasImgLeft.src = '../img/areas.png';

var areasImgRight = new Image();
areasImgRight.onload = function() {
  //c.drawImage(areasImgRight, 201, 101, 100, 100,
  //                         450, 300, 100, 100);
};
areasImgRight.src = '../img/areas.png';

var areasImgDown = new Image();
areasImgDown.onload = function() {
  //c.drawImage(areasImgDown, 101, 201, 100, 100,
  //                         550, 300, 100, 100);
};
areasImgDown.src = '../img/areas.png';

/** загрузка фонового изображения и интерфейса **/
function loadBackground(){
  c.drawImage(backgroundImg, 0, 0);
}
function loadInterface(){
  c.globalAlpha = 0.8;

  c.drawImage(timerImg, 0, 0);
  c.drawImage(oilImg, 0, 63);

  c.globalAlpha = 0.2;

  c.drawImage(areasImgTop, 101, 0, 100, 100,
                           100, 300, 100, 100);

  c.drawImage(areasImgLeft, 0, 101, 100, 100,
                           0, 400, 100, 100);

  c.drawImage(areasImgRight, 201, 101, 100, 100,
                           200, 400, 100, 100);

  c.drawImage(areasImgDown, 101, 201, 100, 100,
                           100, 500, 100, 100);
  c.globalAlpha = 1;
}
function drawPlayer(x, y){
  c.drawImage(playerImg, x, y)
}

loadBackground();
loadInterface();

//переменные
var playerX, playerY;
playerX = 10;
playerY = 240;
var mouseX, mouseY;

//создание кадров
var gameProcess = setTimeout(drawAll, 1000/60);

function drawAll(){
  if(isInside(mouseX, mouseY, 100, 300, 100, 100))
  {
    //alert('up');
    direction = 'up';
  }
  else if(isInside(mouseX, mouseY, 0, 400, 100, 100))
  {
    //alert('left');
    direction = 'left';
  }
  else if(isInside(mouseX, mouseY, 200, 400, 100, 100))
  {
    //alert('right');
    direction = 'right';
  }
  else if(isInside(mouseX, mouseY, 100, 500, 100, 100))
  {
    //alert('down');
    direction = 'down';
  }
  else{
    direction = 'none';
  }
  movePlayer(direction);
  loadBackground();
  loadInterface();
  drawPlayer(playerX, playerY);
  gameProcess = setTimeout(drawAll, 1000/60);
}

/** Контроль движения **/
$('#canvas').mousemove(moveController);
var canvasOffset=$("#canvas").offset();
var offsetX=canvasOffset.left;
var offsetY=canvasOffset.top;
//alert(offsetX + " -- " + offsetY);

function isInside(pX, pY, x, y, width, height){
  if(pX >= x && pX <= (x+width)){
    if(pY >= y && pY <= (y+height)){
      return true;
    }
  }
  return false;
}

var direction = 'none';
var playerSpeed = 5;
var movePlayerTimeout;

function moveController(e){
  canvasOffset=$("#canvas").offset();
  offsetX=canvasOffset.left;
  offsetY=canvasOffset.top;
  mouseX=parseInt(e.clientX-offsetX);
  mouseY=parseInt(e.clientY-offsetY);
  //alert('mouseX: ' + mouseX + " | " + offsetX);
}
function movePlayer(dir){
  switch (dir) {
    case 'up':
    if(playerY > 0)
      playerY -= playerSpeed;
      break;
    case 'left':
    if(playerX > 0)
      playerX -= playerSpeed;
      break;
    case 'right':
    if(playerX < 916)
      playerX += playerSpeed;
      break;
    case 'down':
    if(playerY < 548)
      playerY += playerSpeed;
      break;
    default:
    //ничего
  }
}
