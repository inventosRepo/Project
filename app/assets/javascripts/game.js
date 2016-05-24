// player_variables
var player = 0;
var tank = [];
var player_live = [];
var bullets = [];
for (var i = 0; i < 10; i++){
  bullets[i] = [];
}

// scene_variables
var canvas, context;
//var img_brick, img_steel, img_water, img_forest, img_tank;
var cell_size = 24;
var x_count = 26;
var y_count = 26;

// connection_variables
var host, socket;

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

//players draw function
function draw_players() {
  if (player_live[player] == false) {
    tank[player] = null;
  }
  else {
    for (var j = 1; j < tank.length; j++) {
      context.drawImage(tank[j].image, tank[j].i*tank[j].w, 0,
                        tank[j].w, tank[j].h, tank[j].x, tank[j].y,
                        tank[j].w, tank[j].h);
      for (var i = 0; i < bullets[j].length; i++) {
        context.drawImage(img_bullet, bullets[j][i].bull_x,  bullets[j][i].bull_y);
      }
    }
  };
}

//full scene draw function
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

  move_bullets();
  draw_players();
}

$(function() {
  //connection init
  host = "ws://"+ip+":"+port;
  socket = new WebSocket (host);
  //canvas init
  canvas = document.getElementById('map');
  canvas.width  = x_count * cell_size;
  canvas.height = y_count * cell_size;
  context = canvas.getContext('2d');
  //loading images
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

  connect(); //connect to WebSocket

  setInterval(draw_scene, 50); //redraw scene every 50 ms

});
