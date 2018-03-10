//Canvas
var canvas = document.getElementById("canvas");
var c = canvas.getContext('2d');

console.log('game.js loaded!')

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
function drawBackground(){
  c.drawImage(backgroundImg, 0, 0);
}
function drawInterface(){
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

drawBackground();
drawInterface();

/********************/
/**** переменные ****/
/********************/

var playerX, playerY;
playerX = 10;
playerY = 240;

var friends = [];
var enemies = [];

var mouseX, mouseY;
var direction = 'none';
var playerSpeed = 150; //скорость (пунктов в секунду)

//выстрелы(снаряды), астрероиды и планеты на фоне
var playerShootSpeed = 200; //скорость выстрела игрока (пунктов в секунду)
var playerShoots = [];

var friendShootSpeed = 200; //скорость выстрела дружеских кораблей (пунктов в секунду)
var friendShoots = [];

var enemyShootSpeed = 100; //скорость выстрела вражеских кораблей (пунктов в секунду)
var enemyShoots = [];

var asteroidSpeed = 100; //скорость движения астероидов (пунктов в секунду)
var asteroids = [];

var planets = [];

//создание кадров
var gameProcess = setTimeout(drawAll, 1000/60);

function drawAll(){
  drawBackground();
  drawInterface();
  
  defineDirection(); //определение направления движения игрока
  movePlayer(direction); //передвижение игрока

  //функции обновления объектов (координат)
  updateAllShoots();

  //функции рисования обхектов
  drawAllShoots();

  drawPlayer(playerX, playerY);

  //водготовка следующего кадра
  gameProcess = setTimeout(drawAll, 1000/60);
}

this.addEventListener('keyup', keyboardHandler); //обработка событий клавиатуры

function keyboardHandler(e) {
  //P - 80 - пауза
  //Space - 32 - выстрел
  //alert(e.keyCode);
  switch (e.keyCode) {
    case 32:
      playerShoot();
      break;
    case 80:
      switchPauseMode();
      break;
    default:

  }
}

function playerShoot(){
  playerShoots.push({
    x: playerX+44,
    y: playerY+23,
    speed: playerShootSpeed
  });
}
function friendShoot(friend){
  friendShoots.push({
    x: friend.x+friend.width,
    y: friend.x+friend.height-3,
    speed: friendShootSpeed
  });
}
function enemyShoot(enemy){
  enemyShoots.push({
    x: enemy.x+enemy.width,
    y: enemy.x+enemy.height-3,
    speed: enemyShootSpeed
  });
}

function drawAllShoots(){
  drawPlayerShoots();
  drawFriendShoots();
  drawEnemyShoots();
}
function drawPlayerShoots(){
  for(var i in playerShoots){
    c.drawImage(shootImg, 0, 0, 36, 5,
                          playerShoots[i].x, playerShoots[i].y, 36, 5);
  }
}
function drawFriendShoots(){
  for(var i in friendShoots){
    c.drawImage(shootImg, 0, 0, 36, 5,
                          friendShoots[i].x, friendShoots[i].y, 36, 5);
  }
}
function drawEnemyShoots(){
  for(var i in enemyShoots){
    c.drawImage(shootImg, 0, 0, 36, 5,
                          enemyShoots[i].x, enemyShoots[i].y, 36, 5);
  }
}

function updateAllShoots(){
  updatePlayerShoots();
  updateFriendShoots();
  updateEnemyShoots();
}
function updatePlayerShoots(){
  for(var i in playerShoots){
    if(playerShoots[i].x < 960)
      playerShoots[i].x += playerShoots[i].speed/60;
    else
      playerShoots.splice(i, 1);
  }
}
function updateFriendShoots(){
  for(var i in friendShoots){
    if(friendShoots[i].x < 960)
      friendShoots[i].x += friendShoots[i].speed/60;
    else
      friendShoots.splice(i, 1);
  }
}
function updateEnemyShoots(){
  for(var i in enemyShoots){
    if(enemyShoots[i].x > -35)
      enemyShoots[i].x += enemyShoots[i].speed/60;
    else
      enemyShoots.splice(i, 1);
  }
}

function defineDirection(){
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
      playerY -= playerSpeed/60;
      break;
    case 'left':
    if(playerX > 0)
      playerX -= playerSpeed/60;
      break;
    case 'right':
    if(playerX < 916)
      playerX += playerSpeed/60;
      break;
    case 'down':
    if(playerY < 548)
      playerY += playerSpeed/60;
      break;
    default:
    //ничего
  }
}
