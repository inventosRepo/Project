function connect() {
  socket.onmessage = function (event) {
    var msg = JSON.parse(event.data);
    var button = msg.button_id;
    var connected = msg.action;

    var player = msg.player_id;

    if (connected == 'connect') {
      player_live = true;
      tank = new Tank(0, 0);
    }
    if (player_live == true) {
      if (button == 1) {

        tank.i = 1;
        var cur_cel_x = (2 * tank.x) / 48;
        var cur_cel_y = (2 * tank.y) / 48;
        var test_1 = level_map[cur_cel_y][cur_cel_x-1];
        var test_2 = level_map[cur_cel_y+1][cur_cel_x-1];

        if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
          tank.x-=24;
          if (tank.x < 0) {
            tank.x = 0;
          }
        }
      }

      if (button == 2) {

        tank.i = 2;

        var cur_cel_x = (2 * tank.x) / 48;
        var cur_cel_y = (2 * tank.y) / 48;
        var test_1 = level_map[cur_cel_y-1][cur_cel_x];
        var test_2 = level_map[cur_cel_y-1][cur_cel_x+1];

        if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
          tank.y-=24;
          if (tank.y < 0) {
            tank.y = 0;
          }
        }
      }

      if (button == 3) {

        tank.i = 3;

        var cur_cel_x = (2 * tank.x) / 48;
        var cur_cel_y = (2 * tank.y) / 48;
        var test_1 = level_map[cur_cel_y+2][cur_cel_x];
        var test_2 = level_map[cur_cel_y+2][cur_cel_x+1];

        if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
          tank.y+=24;
          if (tank.y > cell_size * y_count) {
            tank.y = cell_size * y_count;
          }
        }
      }

      if (button == 4) {

        tank.i = 0;

        var cur_cel_x = (2 * tank.x) / 48;
        var cur_cel_y = (2 * tank.y) / 48;
        var test_1 = level_map[cur_cel_y][cur_cel_x+2];
        var test_2 = level_map[cur_cel_y+1][cur_cel_x+2];

        if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
          tank.x+=24;
          if (tank.x > cell_size * x_count) {
            tank.x = cell_size * x_count;
          }
        }
      }

      if (button == 5) {
        bullets.push(new Bullet(tank.i, tank.x+12, tank.y+12, 1));
      }
    }
  }
}

function post_level_map(){
  var arr_tank = [];
  $.each(tank, function(i){
    arr_tank.push({id:i, x: this.x, y: this.y, i:this.i});
    });
  arr_tank.shift();
  console.log(arr_tank)
  $.ajax({
    url: "welcome/index",
    type: "post",
    dataType: "json",
    data: {
      lvlmap: JSON.stringify(level_map),
      arrs_tanks: JSON.stringify(arr_tank)
    }
  });
}
