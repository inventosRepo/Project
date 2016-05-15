var canvas, context;
var imgBrick, imgSteel, imgWater, imgForest, imgTank;
var _Map;
var _Tank;
var bullets = [];
var CellSize = 24;
var _X_count = 26;
var _Y_count = 26;
var socket, host;
host = "ws://"+ip+":"+port;

function Tank(x, y, w, h, image) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.i = 0;
  this.image = image;
}

function Bullet(direct, bullX, bullY, bulltype) {
  this.direct = direct;
  this.bullX = bullX;
  this.bullY = bullY;
  this.bulltype = bulltype;
}

function clear() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function movebullets()
{
    for (var i = 0; i < bullets.length; i++) {
        if (bullets[i].direct==2){
            bullets[i].bullY-=10;
        }
        else if (bullets[i].direct==3){
            bullets[i].bullY+=10;
        }
        else if (bullets[i].direct==0){
            bullets[i].bullX+=10;
        }
        else if (bullets[i].direct==1){
            bullets[i].bullX-=10;
        }
  	bulletCollision(i);
    }
}

function bulletCollision(i){
    if(_Map[parseInt(bullets[i].bullY/CellSize)][parseInt(bullets[i].bullX/CellSize)]==1){
      _Map[parseInt(bullets[i].bullY/CellSize)][parseInt(bullets[i].bullX/CellSize)]=0;
      bullets.splice(i, 1);
    }
    if(_Map[parseInt(bullets[i].bullY/CellSize)][parseInt(bullets[i].bullX/CellSize)]==2){
      bullets.splice(i, 1);
    }
}

function drawScene() {
  clear();

  context.fillStyle = '#111';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.save();

  for (var y = 0; y < _Y_count; y++) {
    for (var x = 0; x < _X_count; x++) {
      switch (_Map[y][x]) {
        case 0:
          break;
        case 1:
          context.drawImage(imgBrick, 0, 0, CellSize, CellSize, x*CellSize, y*CellSize, CellSize, CellSize);
          break;
        case 2:
          context.drawImage(imgSteel, 0, 0, CellSize, CellSize, x*CellSize, y*CellSize, CellSize, CellSize);
          break;
        case 3:
          context.drawImage(imgForest, 0, 0, CellSize, CellSize, x*CellSize, y*CellSize, CellSize, CellSize);
          break;
        case 4:
          context.drawImage(imgWater, 0, 0, CellSize, CellSize, x*CellSize, y*CellSize, CellSize, CellSize);
          break;
      }
    }
  }

  context.restore();

  context.drawImage(_Tank.image, _Tank.i*_Tank.w, 0, _Tank.w, _Tank.h, _Tank.x, _Tank.y, _Tank.w, _Tank.h);
  for (var i = 0; i < bullets.length; i++) {
    context.drawImage(imgBullet, bullets[i].bullX,  bullets[i].bullY);
  }
}

function connect() {
  try {
    socket = new WebSocket(host);

    addMessage("Socket State: " + socket.readyState);

    socket.onmessage = function(msg) {
      if (msg.data == 1) {
        _Tank.i = 1;

        var iCurCelX = (2 * _Tank.x) / 48;
        var iCurCelY = (2 * _Tank.y) / 48;
        var iTest1 = _Map[iCurCelY][iCurCelX-1];
        var iTest2 = _Map[iCurCelY+1][iCurCelX-1];

        if ((iTest1 == 0 || iTest1 == 3) && (iTest2 == 0 || iTest2 == 3)) {
          _Tank.x-=24;
          if (_Tank.x < 0) {
            _Tank.x = 0;
          }
        }
      }

      if (msg.data == 2) {
        _Tank.i = 2;

        var iCurCelX = (2 * _Tank.x) / 48;
        var iCurCelY = (2 * _Tank.y) / 48;
        if (iCurCelY) {
          var iTest1 = _Map[iCurCelY-1][iCurCelX];
          var iTest2 = _Map[iCurCelY-1][iCurCelX+1];

          if ((iTest1 == 0 || iTest1 == 3) && (iTest2 == 0 || iTest2 == 3)) {
            _Tank.y-=24;
            if (_Tank.y < 0) {
              _Tank.y = 0;
            }
          }
        }
      }

      if (msg.data == 3) {
        _Tank.i = 3;

        var iCurCelX = (2 * _Tank.x) / 48;
        var iCurCelY = (2 * _Tank.y) / 48;
        if (iCurCelY+2 < _Y_count) {
          var iTest1 = _Map[iCurCelY+2][iCurCelX];
          var iTest2 = _Map[iCurCelY+2][iCurCelX+1];

          if ((iTest1 == 0 || iTest1 == 3) && (iTest2 == 0 || iTest2 == 3)) {
            _Tank.y+=24;
            if (_Tank.y > 576) { //CellSize * (_Y_count-2)
              _Tank.y = 576;
            }
          }
        }
      }

      if (msg.data == 4) {
        _Tank.i = 0;

        var iCurCelX = (2 * _Tank.x) / 48;
        var iCurCelY = (2 * _Tank.y) / 48;
        var iTest1 = _Map[iCurCelY][iCurCelX+2];
        var iTest2 = _Map[iCurCelY+1][iCurCelX+2];

        if ((iTest1 == 0 || iTest1 == 3) && (iTest2 == 0 || iTest2 == 3)) {
          _Tank.x+=24;
          if (_Tank.x > 576) { //CellSize * (_X_count-2)
            _Tank.x = 576;
          }
        }
     }

     if (msg.data == 5) {
       bullets.push(new Bullet(_Tank.i, _Tank.x+12, _Tank.y+12, 1));
     }

     addMessage("Received: " + msg.data);
    }
  } catch(exception) {
    addMessage("Error: " + exception);
    }
}

function addMessage(msg) {
  $("#chat-log").append("<p>" + msg + "</p>");
}

$(function() {
  canvas = document.getElementById('map');
  canvas.width  = _X_count * CellSize;
  canvas.height = _Y_count * CellSize;
  context = canvas.getContext('2d');

  _Map = ([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 2, 2, 2, 2, 0, 0, 2, 2, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 2, 2, 2, 2, 0, 0, 2, 2, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 4, 4, 4, 4, 1, 1, 3, 3, 3, 3, 3, 3, 4, 4, 1, 1, 0, 0, 2, 2, 0, 0],
    [0, 0, 0, 0, 4, 4, 4, 4, 1, 1, 3, 3, 3, 3, 3, 3, 4, 4, 1, 1, 0, 0, 2, 2, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 4, 4, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 4, 4, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 2, 2, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 2, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [3, 3, 3, 3, 1, 1, 0, 0, 4, 4, 4, 4, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [3, 3, 3, 3, 1, 1, 0, 0, 4, 4, 4, 4, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
    [3, 3, 3, 3, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 3, 3],
    [3, 3, 3, 3, 3, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 3, 3],
    [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 2, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 2, 2, 0, 0, 3, 3, 4, 4, 0, 0, 1, 1, 0, 0],
    [2, 2, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 2, 2, 0, 0, 3, 3, 4, 4, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 2, 2, 0, 0, 3, 3, 4, 4, 0, 0, 2, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 2, 2, 0, 0, 3, 3, 4, 4, 0, 0, 2, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 2, 3, 3, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 2, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0]
    ]);

  imgBrick = new Image();
  imgBrick.src = 'images/brick.png';
  imgSteel = new Image();
  imgSteel.src = 'images/steel.png';
  imgWater = new Image();
  imgWater.src = 'images/water.png';
  imgForest = new Image();
  imgForest.src = 'images/forest.png';
  imgBullet = new Image();
  imgBullet.src = 'images/bullet.png';

  imgTank = new Image();
  imgTank.src = 'images/tank.png';
  _Tank = new Tank(CellSize*9, CellSize*24, 48, 48, imgTank);

  setInterval(drawScene, 25);
  setInterval(movebullets, 25);

  connect();
});
