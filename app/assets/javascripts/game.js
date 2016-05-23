// player_logic_variables
var player, button;

// player_1_variables
var tank_1; tank_2, tank_NPC;
var player_1_live = true;
var bullets_1 = [];
var bullet_1_cell_x, bullet_1_cell_y, tank_1_cell_x, tank_1_cell_y;

// player_2_variables
var tank_2;
var player_2_live = true;
var bullets_2 = [];
var bullet_2_cell_x, bullet_2_cell_y, tank_2_cell_x, tank_2_cell_y;

// NPC_variables
var tank_NPC;
var npc_bullets = [];
var npc_bullet_cell_x, npc_bullet_cell_y, npc_tank_cell_x, npc_tank_cell_y;
var random_move;

// scene_variables
var canvas, context, level_map;
var img_brick, img_steel, img_water, img_forest, img_tank;
var cell_size = 24;
var x_count = 26;
var y_count = 26;

// connection_variables
var host, socket, msg;

// Objects
function Tank(x, y, w, h, image) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.i = 2;
  this.image = image;
}

function Bullet(direct, bull_x, bull_y, bulltype) {
  this.direct = direct;
  this.bull_x = bull_x;
  this.bull_y = bull_y;
  this.bulltype = bulltype;
}

function clear() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function draw_players() {
  if (player_1_live == false) {
    delete tank_1.x;
    delete tank_1.y;
    delete tank_1.w;
    delete tank_1.h;
    delete tank_1.i;
    delete tank_1.image;
  }
  else {
    context.drawImage(tank_1.image, tank_1.i*tank_1.w, 0, tank_1.w, tank_1.h, tank_1.x, tank_1.y, tank_1.w, tank_1.h);
    for (var i = 0; i < bullets_1.length; i++) {
      context.drawImage(img_bullet, bullets_1[i].bull_x,  bullets_1[i].bull_y);
    }
  };
  if (player_2_live == false) {
    delete tank_2.x;
    delete tank_2.y;
    delete tank_2.w;
    delete tank_2.h;
    delete tank_2.i;
    delete tank_2.image;
  }
  else {
    context.drawImage(tank_2.image, tank_2.i*tank_2.w, 0, tank_2.w, tank_2.h, tank_2.x, tank_2.y, tank_2.w, tank_2.h);
    for (var i = 0; i < bullets_2.length; i++) {
      context.drawImage(img_bullet, bullets_2[i].bull_x,  bullets_2[i].bull_y);
    }
  };
}

function draw_scene() {
  clear();

  context.fillStyle = '#111';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.save();

  for (var y = 0; y < y_count; y++) {
    for (var x = 0; x < x_count; x++) {
      switch (level_map[y][x]) {
        case 0:
          break;
        case 1:
          context.drawImage(img_brick, 0, 0, cell_size, cell_size, x*cell_size, y*cell_size, cell_size, cell_size);
          break;
        case 2:
          context.drawImage(img_steel, 0, 0, cell_size, cell_size, x*cell_size, y*cell_size, cell_size, cell_size);
          break;
        case 3:
          context.drawImage(img_forest, 0, 0, cell_size, cell_size, x*cell_size, y*cell_size, cell_size, cell_size);
          break;
        case 4:
          context.drawImage(img_water, 0, 0, cell_size, cell_size, x*cell_size, y*cell_size, cell_size, cell_size);
          break;
      }
    }
  }

  context.restore();


  //context.drawImage(tank_NPC.image, tank_NPC.i*tank_NPC.w, 0, tank_NPC.w, tank_NPC.h, tank_NPC.x, tank_NPC.y, tank_NPC.w, tank_NPC.h);
  /*for (var i = 0; i < npc_bullets.length; i++) {
    context.drawImage(img_bullet, npc_bullets[i].bull_x,  npc_bullets[i].bull_y);
  }*/
}

$(function() {
  host = "ws://"+ip+":"+port;
  socket = new WebSocket (host);
  canvas = document.getElementById('map');
  canvas.width  = x_count * cell_size;
  canvas.height = y_count * cell_size;
  context = canvas.getContext('2d');

  select_level(1);

  img_brick = new Image();
  img_brick.src = 'images/brick.png';
  img_steel = new Image();
  img_steel.src = 'images/steel.png';
  img_water = new Image();
  img_water.src = 'images/water.png';
  img_forest = new Image();
  img_forest.src = 'images/forest.png';
  img_bullet = new Image();
  img_bullet.src = 'images/bullet.png';

  img_tank = new Image();
  img_tank.src = 'images/tank.png';
  tank_1 = new Tank(cell_size*12, cell_size*6, 48, 48, img_tank);
  tank_2 = new Tank(cell_size*12, cell_size*0, 48, 48, img_tank);
  //tank_NPC = new Tank(cell_size*12, cell_size*0, 48, 48, img_tank)

  connect();

  setInterval(draw_scene, 50);
  setInterval(draw_players, 50);
  setInterval(move_bullets, 50);
  //setInterval(NpcMovement, 700);
  //setInterval(NpcShot, 1500);
  //setInterval(movenpcbullets, 50);

});
