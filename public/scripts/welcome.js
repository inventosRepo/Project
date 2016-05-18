var canvas, context;
var imgBrick, imgSteel, imgWater, imgForest, imgTank;
var _Map;
var _Tank, _Tank_NPC;
var bullets = [];
var npc_bullets = [];
var random_move;
var bullet_cell_x, bullet_cell_y, tank_cell_x, tank_cell_y;
var npc_bullet_cell_x, npc_bullet_cell_y, npc_tank_cell_x, npc_tank_cell_y;
var CellSize = 24;
var _X_count = 26;
var _Y_count = 26;
var socket, host;

host = "ws://"+ip+":"+port;

// Objects

function Tank(x, y, w, h, image) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.i = 2;
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
  context.drawImage(_TankP2.image, _TankP2.i*_TankP2.w, 0, _TankP2.w, _TankP2.h, _TankP2.x, _TankP2.y, _TankP2.w, _TankP2.h);
  context.drawImage(_Tank_NPC.image, _Tank_NPC.i*_Tank_NPC.w, 0, _Tank_NPC.w, _Tank_NPC.h, _Tank_NPC.x, _Tank_NPC.y, _Tank_NPC.w, _Tank_NPC.h);
  for (var i = 0; i < bullets.length; i++) {
    context.drawImage(imgBullet, bullets[i].bullX,  bullets[i].bullY);
  }
  for (var i = 0; i < npc_bullets.length; i++) {
    context.drawImage(imgBullet, npc_bullets[i].bullX,  npc_bullets[i].bullY);
  }
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
    [0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
  _Tank_NPC = new Tank(CellSize*12, CellSize*0, 48, 48, imgTank)
  _Tank = new Tank(CellSize*12, CellSize*24, 48, 48, imgTank);
  _TankP2 = new Tank(CellSize*12, CellSize*12, 48, 48, imgTank);


  setInterval(drawScene, 50);
  setInterval(NpcMovement, 700);
  setInterval(NpcShot, 1500);
  setInterval(movebullets, 50);
  setInterval(movenpcbullets, 50);

  connect();
});
