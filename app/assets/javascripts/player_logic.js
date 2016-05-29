function connect() {
  socket.onmessage = function (event) {
    var msg = JSON.parse(event.data);
    var button = msg.button_id;
    var connected = msg.connect_id;

    player = msg.player_id;

    if (connected == 'connected') {
      player_live[player] = true;
      tank[player] = new Tank(tanks[player-1].x, tanks[player-1].y, 48, 48, tanks[player-1].i, img_tank);

    }
    if (player_live[player] == true) {
      if (button == 1) {
        tank[player].i = 1;

        var cur_cel_x = (2 * tank[player].x) / 48;
        var cur_cel_y = (2 * tank[player].y) / 48;
        var test_1 = level_map[cur_cel_y][cur_cel_x-1];
        var test_2 = level_map[cur_cel_y+1][cur_cel_x-1];
        if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
          tank[player].x-=24;
          if (tank[player].x < 0) {
            tank[player].x = 0;
          }
        }
      }

      if (button == 2) {
        tank[player].i = 2;

        var cur_cel_x = (2 * tank[player].x) / 48;
        var cur_cel_y = (2 * tank[player].y) / 48;
        if (cur_cel_y) {
          var test_1 = level_map[cur_cel_y-1][cur_cel_x];
          var test_2 = level_map[cur_cel_y-1][cur_cel_x+1];

          if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
            tank[player].y-=24;
            if (tank[player].y < 0) {
              tank[player].y = 0;
            }
          }
        }
      }

      if (button == 3) {
        tank[player].i = 3;

        var cur_cel_x = (2 * tank[player].x) / 48;
        var cur_cel_y = (2 * tank[player].y) / 48;
        if (cur_cel_y < cell_size * y_count-2) {
          var test_1 = level_map[cur_cel_y+2][cur_cel_x];
          var test_2 = level_map[cur_cel_y+2][cur_cel_x+1];

          if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
            tank[player].y+=24;
            if (tank[player].y > 576) {
              tank[player].y = 576;
            }
          }
        }
      }

      if (button == 4) {
        tank[player].i = 0;

        var cur_cel_x = (2 * tank[player].x) / 48;
        var cur_cel_y = (2 * tank[player].y) / 48;
        var test_1 = level_map[cur_cel_y][cur_cel_x+2];
        var test_2 = level_map[cur_cel_y+1][cur_cel_x+2];

        if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
          tank[player].x+=24;
          if (tank[player].x > cell_size * x_count) {
            tank[player].x = cell_size * x_count;
          }
        }
      }
      if (button == 5) {
        bullets[player].push(new Bullet(tank[player].i, tank[player].x+12, tank[player].y+12, 1));
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
