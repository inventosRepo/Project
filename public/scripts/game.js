// player_logic_variables
var player, button;
var player_1_live = true;
var player_2_live = true;

// player_1_variables
var _Tank_1; _Tank_2, _Tank_NPC;
var bullets_1 = [];
var bullet_1_cell_x, bullet_1_cell_y, tank_1_cell_x, tank_1_cell_y;

// player_2_variables
var _Tank_2;
var bullets_2 = [];
var bullet_2_cell_x, bullet_2_cell_y, tank_2_cell_x, tank_2_cell_y;

// NPC_variables
var _Tank_NPC;
var npc_bullets = [];
var npc_bullet_cell_x, npc_bullet_cell_y, npc_tank_cell_x, npc_tank_cell_y;
var random_move;

// scene_variables
var canvas, context, _Map;
var imgBrick, imgSteel, imgWater, imgForest, imgTank;
var CellSize = 24;
var _X_count = 26;
var _Y_count = 26;

// connection_variables
var host = "ws://"+ip+":"+port;
var socket = new WebSocket (host);

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

  context.drawImage(_Tank_1.image, _Tank_1.i*_Tank_1.w, 0, _Tank_1.w, _Tank_1.h, _Tank_1.x, _Tank_1.y, _Tank_1.w, _Tank_1.h);
  context.drawImage(_Tank_2.image, _Tank_2.i*_Tank_2.w, 0, _Tank_2.w, _Tank_2.h, _Tank_2.x, _Tank_2.y, _Tank_2.w, _Tank_2.h);
  //context.drawImage(_Tank_NPC.image, _Tank_NPC.i*_Tank_NPC.w, 0, _Tank_NPC.w, _Tank_NPC.h, _Tank_NPC.x, _Tank_NPC.y, _Tank_NPC.w, _Tank_NPC.h);
  for (var i = 0; i < bullets_1.length; i++) {
    context.drawImage(imgBullet, bullets_1[i].bullX,  bullets_1[i].bullY);
  }
  for (var i = 0; i < bullets_2.length; i++) {
    context.drawImage(imgBullet, bullets_2[i].bullX,  bullets_2[i].bullY);
  }
  /*for (var i = 0; i < npc_bullets.length; i++) {
    context.drawImage(imgBullet, npc_bullets[i].bullX,  npc_bullets[i].bullY);
  }*/
}

$(function() {
  canvas = document.getElementById('map');
  canvas.width  = _X_count * CellSize;
  canvas.height = _Y_count * CellSize;
  context = canvas.getContext('2d');

  select_level(1);

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
  imgBrokenTank = new Image();
  imgBrokenTank.src = 'images/broken_tank.png';

  imgTank = new Image();
  imgTank.src = 'images/tank.png';
  _Tank_1 = new Tank(CellSize*12, CellSize*6, 48, 48, imgTank);
  _Tank_2 = new Tank(CellSize*12, CellSize*0, 48, 48, imgTank);
  //_Tank_NPC = new Tank(CellSize*12, CellSize*0, 48, 48, imgTank)

  setInterval(drawScene, 50);
  //setInterval(NpcMovement, 700);
  //setInterval(NpcShot, 1500);
  setInterval(movebullets, 50);
  //setInterval(movenpcbullets, 50);
  connect();
});
