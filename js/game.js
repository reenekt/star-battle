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

//панель для очков
var scoreImg = new Image();
scoreImg.onload = function() {
  //c.drawImage(oilImg, 200, 55);
};
scoreImg.src = '../img/score.png';

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

//кнопка
var btnImg = new Image();
btnImg.onload = function() {
  //c.drawImage(areasImgDown, 101, 201, 100, 100,
  //                         550, 300, 100, 100);
};
btnImg.src = '../img/btn.png';

//включенный звук
var soundOnImg = new Image();
soundOnImg.onload = function() {
  //c.drawImage(areasImgDown, 101, 201, 100, 100,
  //                         550, 300, 100, 100);
};
soundOnImg.src = '../img/sound_on.png';

//выключенный звук
var soundOffImg = new Image();
soundOffImg.onload = function() {
  //c.drawImage(areasImgDown, 101, 201, 100, 100,
  //                         550, 300, 100, 100);
};
soundOffImg.src = '../img/sound_off.png';

//увеличение шрифта
var fontSizeMoreImg = new Image();
fontSizeMoreImg.onload = function() {
  //c.drawImage(areasImgDown, 101, 201, 100, 100,
  //                         550, 300, 100, 100);
};
fontSizeMoreImg.src = '../img/font_size_more.png';

//уменьшение шрифта
var fontSizeLessImg = new Image();
fontSizeLessImg.onload = function() {
  //c.drawImage(areasImgDown, 101, 201, 100, 100,
  //                         550, 300, 100, 100);
};
fontSizeLessImg.src = '../img/font_size_less.png';

//пауза
var pauseImg = new Image();
pauseImg.onload = function() {
  //c.drawImage(areasImgDown, 101, 201, 100, 100,
  //                         550, 300, 100, 100);
};
pauseImg.src = '../img/pause.png';

//продолжить игру
var playImg = new Image();
playImg.onload = function() {
  //c.drawImage(areasImgDown, 101, 201, 100, 100,
  //                         550, 300, 100, 100);
};
playImg.src = '../img/play.png';

/** загрузка фонового изображения и интерфейса **/
function drawBackground(){
  c.drawImage(backgroundImg, 0, 0);
}
function drawInterface(){
  c.globalAlpha = 0.8;
  c.drawImage(timerImg, 0, 0);
  c.drawImage(pauseImg, 0, 0);

  c.drawImage(oilImg, 0, 63);
  c.drawImage(scoreImg, 791, 6);
  c.drawImage(btnImg, 727, 0); //звук
  if(isSoundActive){
    c.drawImage(soundOnImg, 727, 0);
  }else{
    c.drawImage(soundOffImg, 727, 0);
  }
  c.drawImage(btnImg, 663, 0); //шрифт+
  c.drawImage(fontSizeMoreImg, 663, 0);
  c.drawImage(btnImg, 600, 0); //шрифт-
  c.drawImage(fontSizeLessImg, 600, 0);

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
var isPaused = false;
var isSoundActive = true;

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

var oils = [];
var oilSpeed = 60;

var shipSpawnerTimer = 10; //1 секунда = 60 кадрам
var asteroidSpawnerTimer = 10;
var oilSpawnerTimer = 0;
var shipShootingTimer = 120; //интервал для выстрелов кораблей

var time = 0;
var oil = 15;
var score = 0;

/**** основная функция ****/
//создание кадров
var gameProcess = setTimeout(drawAll, 1000/60);
//ход времени
var timerProcess = setTimeout(timer, 1000);

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
  takeOil();

  //функции обновления объектов (координат)
  updateAllShips();
  updateAllShoots();
  updateAsteroids();
  updateOil();

  //функции рисования объектов
  drawAllShoots();
  drawAllShips();
  drawAsteroids();
  drawOil();

  drawPlayer(playerX, playerY);

  //водготовка следующего кадра
  gameProcess = setTimeout(drawAll, 1000/60);
  oilBalance();
}

function timer() {
  //таймер
  time++;

  var minutes = Math.floor(time / 60);
  var seconds = time % 60;

  var minutesText, secondsText;
  if(minutes < 10)
    minutesText = "0"+minutes;
  else
    minutesText = minutes;

  if(seconds < 10)
    secondsText = "0"+seconds;
  else
    secondsText = seconds;

  $('.timer').text(minutesText+":"+secondsText);

  //топливо
  oil--;
  $('.oil').text(oil);
  timerProcess = setTimeout(timer, 1000);
}

this.addEventListener('keyup', keyboardHandler); //обработка событий клавиатуры
this.addEventListener('click', mouseHandler);

function keyboardHandler(e) {
  //P - 80 - пауза
  //Space - 32 - выстрел
  //alert(e.keyCode);
  switch (e.keyCode) {
    case 32:
      if(!isPaused)
        playerShoot();
      break;
    case 80:
      pauseGame();
      break;
    default:
    //nothing yet
  }
}
function mouseHandler(e) {
  //звук
  if(isInside(mouseX, mouseY, 727, 0, 62, 62)){
    isSoundActive = !isSoundActive;
  }
  //шаг изменения шрифта
  var step = 4;
  //шрифт+
  if(isInside(mouseX, mouseY, 663, 0, 62, 62)){
    var timerCurrentSize = parseInt($('.timer').css('font-size'));
    if(timerCurrentSize <= 42)
      $('.timer').css('font-size', timerCurrentSize+step)

    var oilCurrentSize = parseInt($('.oil').css('font-size'));
    if(oilCurrentSize <= 42)
      $('.oil').css('font-size', oilCurrentSize+step)

    var scoreCurrentSize = parseInt($('.score').css('font-size'));
    if(scoreCurrentSize <= 42)
      $('.score').css('font-size', scoreCurrentSize+step)
  }
  //шрифт-
  if(isInside(mouseX, mouseY, 600, 0, 62, 62)){
    var timerCurrentSize = parseInt($('.timer').css('font-size'));
    if(timerCurrentSize >= 12)
      $('.timer').css('font-size', timerCurrentSize-step)

    var oilCurrentSize = parseInt($('.oil').css('font-size'));
    if(oilCurrentSize >= 12)
      $('.oil').css('font-size', oilCurrentSize-step)

    var scoreCurrentSize = parseInt($('.score').css('font-size'));
    if(scoreCurrentSize >= 12)
      $('.score').css('font-size', scoreCurrentSize-step)
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

  if(oilSpawnerTimer == 0){
    generateOil();
    oilSpawnerTimer = 120;
  }
  else{
    oilSpawnerTimer--;
  }
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
function updateOil() {
  for(var i in oils){
    if(oils[i].x > -40)
      oils[i].x -= oils[i].speed/60;
    else
      oils.splice(i,1);
  }
}

function playerDamaged(){
  //выстрелы вражеских кораблей
  for(var i in enemyShoots){
    if(enemyShoots[i])
    if(isInside(enemyShoots[i].x, enemyShoots[i].y,  playerX, playerY, 44, 52)){
      oil -= 15;
      if(oil < 0){
        oil = 0;
      }
      $('.oil').text(oil);
      enemyShoots.splice(i, 1);
      //alert('player damaged!');
    }
  }
  //столконовения с кораблями врага
  for(var i in enemies){
    if(isInside(enemies[i].x, enemies[i].y,  playerX, playerY, 44, 52)){
      oil -= 15;
      if(oil < 0){
        oil = 0;
      }
      $('.oil').text(oil);
      enemies.splice(i, 1);
      //alert('player damaged!');
    }
  }
  //столкновения с астероидами
  for(var i in asteroids){
    if(!(playerX+44 < asteroids[i].x || asteroids[i].x+asteroids[i].width < playerX)){
      if(!(playerY+52 < asteroids[i].y || asteroids[i].y+asteroids[i].height < playerY))
      {
        oil -= 15;
        if(oil < 0){
          oil = 0;
        }
        $('.oil').text(oil);
        asteroids.splice(i, 1);
      }
    }
  }
}
function friendsDamaged(){
  //выстрелы игрока
  for(var i in playerShoots){
    for(var j in friends){
      if(playerShoots[i])
      if(isInside(playerShoots[i].x+18, playerShoots[i].y+2, friends[j].x, friends[j].y, friends[j].width, friends[j].height)){
        playerShoots.splice(i, 1);
        friends.splice(j,1);
        score -= 10;
        updateScoreInterface();
      }
    }
  }
  //выстрелы кораблей противников
  for(var i in enemyShoots){
    for(var j in friends){
      if(enemyShoots[i])
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
      if(playerShoots[i])
      if(isInside(playerShoots[i].x+18, playerShoots[i].y+2, enemies[j].x, enemies[j].y, enemies[j].width, enemies[j].height)){
        playerShoots.splice(i, 1);
        enemies.splice(j,1);
        score += 5;
        updateScoreInterface();
      }
    }
  }
  //выстрелы кораблей союзников
  for(var i in friendShoots){
    for(var j in enemies){
      if(friendShoots[i])
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
      if(playerShoots[i])
      if(isInside(playerShoots[i].x+18, playerShoots[i].y+2, asteroids[j].x, asteroids[j].y, asteroids[j].width, asteroids[j].height)){
        if(asteroids[j].health > 1){
          playerShoots.splice(i, 1);
          asteroids[j].health--;
        }
        else{
          playerShoots.splice(i, 1);
          asteroids.splice(j,1);
          score += 10;
          updateScoreInterface();
        }
      }
    }
  }
  //выстрелы кораблей союзников
  for(var i in friendShoots){
    for(var j in asteroids){
      if(friendShoots[i])
      if(isInside(friendShoots[i].x+18, friendShoots[i].y+2, asteroids[j].x, asteroids[j].y, asteroids[j].width, asteroids[j].height)){
        if(asteroids[j].health > 1){
          friendShoots.splice(i, 1);
          asteroids[j].health--;
        }
        else{
          friendShoots.splice(i, 1);
          asteroids.splice(j,1);
          //добавление очков и прочее
        }
      }
    }
  }
}

function takeOil() {
  for(var i in oils){
    if(!(playerX+44 < oils[i].x || oils[i].x+oils[i].width < playerX)){
      if(!(playerY+52 < oils[i].y || oils[i].y+oils[i].height < playerY))
      {
        oil += 15;
        if(oil > 30)
          oil -= oil%30;
        $('.oil').text(oil);
        oils.splice(i, 1);
      }
    }
  }
}

function updateScoreInterface() {
  var marginLeft = 0;
  if(score < 0)
    marginLeft += 0.2;

  if(Math.abs(score) >= 0)
    marginLeft += 0.6;
  if(Math.abs(score) >= 10)
    marginLeft += 0.2;
  if(Math.abs(score) >= 100)
    marginLeft += 0.2;
  if(Math.abs(score) >= 1000)
    marginLeft += 0.2;
  if(Math.abs(score) >= 1000)
    marginLeft += 0.2;
  if(Math.abs(score) >= 10000) //не думаю что такое возможно
    marginLeft += 0.2;
  $('.score').css("left", "calc(890px - " + marginLeft + "em)")
  $('.score').text(score);
}

function generateOil() {
  var localWidth = 40, localHeight = 57;
  var localY = Math.round(Math.random()*Math.floor(600/localHeight)) * localHeight;
  oils.push({
    x: 960,
    y: localY,
    speed: oilSpeed,
    width: localWidth,
    height: localHeight
  });
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
function drawOil() {
  for(var i in oils){
    c.drawImage(oil_objImg, 0, 0, 40, 57,
                            oils[i].x, oils[i].y, 40, 57)
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
function pauseGame() {
  //возобновление игры / пауза
  if(isPaused){
    isPaused = false;
    gameProcess = setTimeout(drawAll, 1000/60);
    timerProcess = setTimeout(timer, 1000);
  }else{
    isPaused = true;
    c.drawImage(playImg, 0, 0);
    clearTimeout(gameProcess);
    clearTimeout(timerProcess);
  }
}
function oilBalance() {
  if(oil == 0){
    gameOver();
  }
}
function gameOver() {
  //остановка игры
  pauseGame();
  //запрет на взаимодействие с игрой с помощью клавиатуры
  this.removeEventListener('keyup', keyboardHandler);
  //переход к результатам
  $('#score').val(score);
  $('#time').val(time);
  $('.gameOverForm').css('display', 'block');
}
