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
var playerShootSpeed = 250; //скорость выстрела игрока (пунктов в секунду)
var playerShoots = [];

var friendShootSpeed = 200; //скорость выстрела дружеских кораблей (пунктов в секунду)
var friendShoots = [];

var enemyShootSpeed = 200; //скорость выстрела вражеских кораблей (пунктов в секунду)
var enemyShoots = [];

var asteroidSpeed = 100; //скорость движения астероидов (пунктов в секунду)
var asteroids = [];

var planets = [];

var shipSpawnerTimer = 10; //1 секунда = 60 кадрам
var asteroidSpawnerTimer = 10;
var shipShootingTimer = 120; //интервал для выстрелов кораблей

/**** основная функция ****/
//создание кадров
var gameProcess = setTimeout(drawAll, 1000/60);

function drawAll(){
  commonProcesses();

  drawBackground();
  drawInterface();

  defineDirection(); //определение направления движения игрока
  movePlayer(direction); //передвижение игрока

  //Checkers - проверки
  playerDamaged();
  friendsDamaged();
  enemyDamaged();
  asteroidDamaged();

  //функции обновления объектов (координат)
  updateAllShips();
  updateAllShoots();
  updateAsteroids();

  //функции рисования обхектов
  drawAllShoots();
  drawAllShips();
  drawAsteroids();

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
    //nothing yet
  }
}

function commonProcesses(){
  if(shipSpawnerTimer == 0){
    generateAllShips();
    shipSpawnerTimer = 180;
    //alert('friends: ' + friends.length + " | enemies: " + enemies.length);
  }
  else
    shipSpawnerTimer--;

  if(asteroidSpawnerTimer == 0){
    generateAsteroid();
    asteroidSpawnerTimer = 240;
  }
  else
    asteroidSpawnerTimer--;
}

//------------------------------------------------------
function updateAsteroids() {
  for(var i in asteroids){
    if(asteroids[i].x > -44)
      asteroids[i].x -= asteroids[i].speed/60;
    else
      asteroids.splice(i,1);
  }
}

function playerDamaged(){
  //выстрелы вражеских кораблей
  for(var i in enemyShoots){
    if(isInside(enemyShoots[i].x, enemyShoots[i].y,  playerX, playerY, 44, 52)){
      enemyShoots.splice(i, 1);
      //alert('player damaged!');
    }
  }
  //столконовения с кораблями врага
  for(var i in enemies){
    if(isInside(enemies[i].x, enemies[i].y,  playerX, playerY, 44, 52)){
      enemies.splice(i, 1);
      //alert('player damaged!');
    }
  }
  //столкновения с астероидами
  for(var i in asteroids){
    if(!(playerX+44 < asteroids[i].x || asteroids[i].x+asteroids[i].width < playerX)){
      if(!(playerY+52 < asteroids[i].y || asteroids[i].y+asteroids[i].height < playerY))
      {
        //потеря топлива
        asteroids.splice(i, 1);
      }
    }
  }
}
function friendsDamaged(){
  //выстрелы игрока
  for(var i in playerShoots){
    for(var j in friends){
      if(isInside(playerShoots[i].x+18, playerShoots[i].y+2, friends[j].x, friends[j].y, friends[j].width, friends[j].height)){
        playerShoots.splice(i, 1);
        friends.splice(j,1);
        //вычитание очков и прочее
      }
    }
  }
  //выстрелы кораблей противников
  for(var i in enemyShoots){
    for(var j in friends){
      if(isInside(enemyShoots[i].x+18, enemyShoots[i].y+2, friends[j].x, friends[j].y, friends[j].width, friends[j].height)){
        enemyShoots.splice(i, 1);
        friends.splice(j,1);
      }
    }
  }
  //столкновения с астероидами
  //не обязательно, но можно дополнить
}
function enemyDamaged(){
  //выстрелы игрока
  for(var i in playerShoots){
    for(var j in enemies){
      if(isInside(playerShoots[i].x+18, playerShoots[i].y+2, enemies[j].x, enemies[j].y, enemies[j].width, enemies[j].height)){
        playerShoots.splice(i, 1);
        enemies.splice(j,1);
        //добавление очков и прочее
      }
    }
  }
  //выстрелы кораблей союзников
  for(var i in friendShoots){
    for(var j in enemies){
      if(isInside(friendShoots[i].x+18, friendShoots[i].y+2, enemies[j].x, enemies[j].y, enemies[j].width, enemies[j].height)){
        friendShoots.splice(i, 1);
        enemies.splice(j,1);
      }
    }
  }
}

function asteroidDamaged() {
  //выстрелы игрока
  for(var i in playerShoots){
    for(var j in asteroids){
      if(isInside(playerShoots[i].x+18, playerShoots[i].y+2, asteroids[j].x, asteroids[j].y, asteroids[j].width, asteroids[j].height)){

        //проверка наличия свойств
        var res = "";
        for(var q in playerShoots[i]){
          res += q + " | "
        }
        //если закоментировать alert(res), то игра крашится. работает только с раскоментированным alert(res).
        alert(res);
        //конец проверки наличия свойств

        if(asteroids[j].health > 1){
          playerShoots.splice(i, 1);
          asteroids[j].health--;
        }
        else{
          playerShoots.splice(i, 1);
          asteroids.splice(j,1);
          //добавление очков и прочее
        }
      }
    }
  }
  //выстрелы кораблей союзников
  for(var i in friendShoots){
    for(var j in asteroids){
      if(isInside(friendShoots[i].x+18, friendShoots[i].y+2, asteroids[j].x, asteroids[j].y, asteroids[j].width, asteroids[j].height)){
        friendShoots.splice(i, 1);
        asteroids.splice(j,1);
      }
    }
  }
}

function generateAsteroid() {
  var localWidth = 44, localHeight = 44;
  var localY = Math.round(Math.random()*Math.floor(600/localHeight)) * localHeight;
  asteroids.push({
    x: 960,
    y: localY,
    speed: asteroidSpeed,
    width: localWidth,
    height: localHeight,
    health: 2
  });
}

function generateAllShips(){
  generateFriendShip();
  generateEnemyShip();
}
function generateFriendShip(){
  var localType = 1 + Math.floor(Math.random()*2);
  var localY, localWidth, localHeight;
  if(localType == 1){
    localWidth = 44;
    localHeight = 44;
  }
  else{
    localWidth = 51;
    localHeight = 52;
  }
  localY = Math.round(Math.random()*Math.floor(600/localHeight)) * localHeight;

  friends.push({
    x: 0-localWidth,
    y: localY,
    width: localWidth,
    height: localHeight,
    speed: 100,
    type: localType,
    shootingTimer: shipShootingTimer
  });
}
function generateEnemyShip(){
  var localType = 1 + Math.floor(Math.random()*2);
  var localY, localWidth, localHeight;
  if(localType == 1){
    localWidth = 49;
    localHeight = 48;
  }
  else{
    localWidth = 38;
    localHeight = 44;
  }
  localY = Math.round(Math.random()*Math.floor(600/localHeight)) * localHeight;

  enemies.push({
    x: 960,
    y: localY,
    width: localWidth,
    height: localHeight,
    speed: 100,
    type: localType,
    shootingTimer: shipShootingTimer
  });
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
    y: friend.y+friend.height/2-3,
    speed: friendShootSpeed
  });
}
function enemyShoot(enemy){
  enemyShoots.push({
    x: enemy.x-36,
    y: enemy.y+enemy.height/2-3,
    speed: enemyShootSpeed
  });
}

function drawAsteroids() {
  for(var i in asteroids){
    if(asteroids[i].health == 2){
      c.drawImage(asteroidImg, 0, 0, 44, 44,
                               asteroids[i].x, asteroids[i].y, asteroids[i].width, asteroids[i].height);
    }
    else{
      c.drawImage(asteroid_damagedImg, 0, 0, 44, 44,
                               asteroids[i].x, asteroids[i].y, asteroids[i].width, asteroids[i].height);
    }

  }
}

function drawAllShips(){
  drawFriendShips();
  drawEnemyShips();
}
function drawFriendShips(){
  for(var i in friends){
    if(friends[i].type == 1)
      c.drawImage(friend1Img, 0, 0, 44, 44,
                              friends[i].x, friends[i].y, 44, 44);
    else
      c.drawImage(friend2Img, 0, 0, 38, 44,
                            friends[i].x, friends[i].y, 38, 44);
  }
}
function drawEnemyShips(){
  for(var i in enemies){
    if(enemies[i].type == 1)
      c.drawImage(enemy1Img, 0, 0, 49, 48,
                              enemies[i].x, enemies[i].y, 49, 48);
    else
      c.drawImage(enemy2Img, 0, 0, 38, 44,
                            enemies[i].x, enemies[i].y, 38, 44);
  }
}

function updateAllShips(){
  updateFriendShips();
  updateEnemyShips();
}
function updateFriendShips(){
  for(var i in friends){
    if(friends[i].x < 960)
    {
      friends[i].x += friends[i].speed/60;
      if(friends[i].shootingTimer == 0)
      {
        friendShoot(friends[i]);
        friends[i].shootingTimer = shipShootingTimer;
      }
      else
        friends[i].shootingTimer--;
    }
    else
      friends.splice(i, 1);
  }
}
function updateEnemyShips(){
  for(var i in enemies){
    if(enemies[i].x > 0)
    {
      enemies[i].x -= enemies[i].speed/60;
      if(enemies[i].shootingTimer == 0)
      {
        enemyShoot(enemies[i]);
        enemies[i].shootingTimer = shipShootingTimer;
      }
      else
        enemies[i].shootingTimer--;
    }
    else
      enemies.splice(i, 1);
  }
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
      enemyShoots[i].x -= enemyShoots[i].speed/60;
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
