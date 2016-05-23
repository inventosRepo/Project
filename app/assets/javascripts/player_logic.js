
function connect() {
  socket.onmessage = function (event) {
    msg = JSON.parse(event.data);
    player = msg.player_id;
    button = msg.button_id;
    // player_1_controller
    if ((player == 1) && (player_1_live == true)) {
      if (button == 1) {
        tank_1.i = 1;

        var cur_cel_x = (2 * tank_1.x) / 48;
        var cur_cel_y = (2 * tank_1.y) / 48;
        position_1 = [tank_1.x, tank_1.y]
        post_position_1();
        var test_1 = level_map[cur_cel_y][cur_cel_x-1];
        var test_2 = level_map[cur_cel_y+1][cur_cel_x-1];
        if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
          tank_1.x-=24;
          if (tank_1.x < 0) {
            tank_1.x = 0;
          }
        }
      }

      if (button == 2) {
        tank_1.i = 2;

        var cur_cel_x = (2 * tank_1.x) / 48;
        var cur_cel_y = (2 * tank_1.y) / 48;
        position_1 = [tank_1.x, tank_1.y]
        post_position_1();
        if (cur_cel_y) {
          var test_1 = level_map[cur_cel_y-1][cur_cel_x];
          var test_2 = level_map[cur_cel_y-1][cur_cel_x+1];

          if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
            tank_1.y-=24;
            if (tank_1.y < 0) {
              tank_1.y = 0;
            }
          }
        }
      }

      if (button == 3) {
        tank_1.i = 3;

        var cur_cel_x = (2 * tank_1.x) / 48;
        var cur_cel_y = (2 * tank_1.y) / 48;
        position_1 = [tank_1.x, tank_1.y]
        post_position_1();
        if (cur_cel_y < cell_size * y_count-2) {
          var test_1 = level_map[cur_cel_y+2][cur_cel_x];
          var test_2 = level_map[cur_cel_y+2][cur_cel_x+1];

          if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
            tank_1.y+=24;
            if (tank_1.y > 576) {
              tank_1.y = 576;
            }
          }
        }
      }

      if (button == 4) {
        tank_1.i = 0;

        var cur_cel_x = (2 * tank_1.x) / 48;
        var cur_cel_y = (2 * tank_1.y) / 48;
        position_1 = [tank_1.x, tank_1.y]
        post_position_1();
        var test_1 = level_map[cur_cel_y][cur_cel_x+2];
        var test_2 = level_map[cur_cel_y+1][cur_cel_x+2];

        if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
          tank_1.x+=24;
          if (tank_1.x > cell_size * x_count) {
            tank_1.x = cell_size * x_count;
          }
        }
      }

      if (button == 5) {
        bullets_1.push(new Bullet(tank_1.i, tank_1.x+12, tank_1.y+12, 1));
      }
    }

    // player_2_controller
    if ((player == 2) && (player_2_live == true)) {
      if (button == 1) {
        tank_2.i = 1;

        var cur_cel_x = (2 * tank_2.x) / 48;
        var cur_cel_y = (2 * tank_2.y) / 48;
        position_2 = [tank_2.x, tank_2.y]
        post_position_2();
        var test_1 = level_map[cur_cel_y][cur_cel_x-1];
        var test_2 = level_map[cur_cel_y+1][cur_cel_x-1];

        if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
          tank_2.x-=24;
          if (tank_2.x < 0) {
            tank_2.x = 0;
          }
        }
      }

      if (button == 2) {
        tank_2.i = 2;

        var cur_cel_x = (2 * tank_2.x) / 48;
        var cur_cel_y = (2 * tank_2.y) / 48;
        position_2 = [tank_2.x, tank_2.y]
        post_position_2();
        if (cur_cel_y) {
          var test_1 = level_map[cur_cel_y-1][cur_cel_x];
          var test_2 = level_map[cur_cel_y-1][cur_cel_x+1];

          if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
            tank_2.y-=24;
            if (tank_2.y < 0) {
              tank_2.y = 0;
            }
          }
        }
      }

      if (button == 3) {
        tank_2.i = 3;

        var cur_cel_x = (2 * tank_2.x) / 48;
        var cur_cel_y = (2 * tank_2.y) / 48;
        position_2 = [tank_2.x, tank_2.y];
        post_position_2();
        if (cur_cel_y+2 < y_count) {
          var test_1 = level_map[cur_cel_y+2][cur_cel_x];
          var test_2 = level_map[cur_cel_y+2][cur_cel_x+1];

          if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
            tank_2.y+=24;
            if (tank_2.y > cell_size * y_count) {
              tank_2.y = cell_size * y_count;
            }
          }
        }
      }

      if (button == 4) {
        tank_2.i = 0;

        var cur_cel_x = (2 * tank_2.x) / 48;
        var cur_cel_y = (2 * tank_2.y) / 48;
        position_2 = [tank_2.x, tank_2.y];
        post_position_2();
        var test_1 = level_map[cur_cel_y][cur_cel_x+2];
        var test_2 = level_map[cur_cel_y+1][cur_cel_x+2];

        if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
          tank_2.x+=24;
          if (tank_2.x > cell_size * x_count) {
            tank_2.x = cell_size * x_count;
          }
        }
      }

      if (button == 5) {
        bullets_2.push(new Bullet(tank_2.i, tank_2.x+12, tank_2.y+12, 1));
      }
    }
  }
}

function addMessage(msg) {
  $("#chat-log").append("<p>" + msg + "</p>");
}

function post_position_1(){
  $.ajax({
    url: "welcome/index",
    type: "post",
    dataType: "json",
    data: { position_first_tank: position_1 }
  });
}

function post_position_2(){
  $.ajax({
    url: "welcome/index",
    type: "post",
    dataType: "json",
    data: { position_second_tank: position_2 }
  });
}
