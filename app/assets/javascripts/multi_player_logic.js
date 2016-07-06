function connect() {
  socket.onmessage = function (event) {
    var msg = JSON.parse(event.data);
    var button = msg.button_id;
    var action = msg.action;
    var player = msg.player_id;

    if (action == 'connect') {
      console.log(msg);
      player_live[player] = true;
      tank[player] = new Tank;
      tank[player].set_pos(player);
    }
    if (player_live[player] == true) {
      if (button == 1) {
        for (x = 1; x < tank.length; x++) {
          if (tank[x]!=null) {
            tank_cell_x[x] = parseInt(tank[x].x/cell_size);
            tank_cell_y[x] = parseInt(tank[x].y/cell_size);
          }
        }
        tank[player].i = 1;
        var cur_cel_x = (2 * tank[player].x) / 48;
        var cur_cel_y = (2 * tank[player].y) / 48;
        var test_1 = level_map[cur_cel_y][cur_cel_x-1];
        var test_2 = level_map[cur_cel_y+1][cur_cel_x-1];
        if (tank.length > 2) {
          for (x = 1; x < tank.length; x++) {
            if ( ( (tank_cell_x[player] != (tank_cell_x[x]+2)) &&
                   (tank_cell_y[player] == (tank_cell_y[x])) &&
                   (x!=player) ) || (tank_cell_y[player] != (tank_cell_y[x]) ) ) {
                     if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
                       tank[player].x-=cell_size;
                       if (tank[player].x < 0) {
                         tank[player].x = 0;
                       }
                     }
                     continue;
            }
          }
        }
        else {
          if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
            tank[player].x-=cell_size;
            if (tank[player].x < 0) {
              tank[player].x = 0;
            }
          }
        };
      }

      if (button == 2) {
        for (x = 1; x < tank.length; x++) {
          if (tank[x]!=null) {
            tank_cell_x[x] = parseInt(tank[x].x/cell_size)
            tank_cell_y[x] = parseInt(tank[x].y/cell_size);
          }
        }

        tank[player].i = 2;

        var cur_cel_x = (2 * tank[player].x) / 48;
        var cur_cel_y = (2 * tank[player].y) / 48;
        var test_1 = level_map[cur_cel_y-1][cur_cel_x];
        var test_2 = level_map[cur_cel_y-1][cur_cel_x+1];

        if (tank.length > 2) {
          for (x = 1; x < tank.length; x++) {
            if ( ( (tank_cell_y[player] != (tank_cell_y[x]+2)) &&
                   (tank_cell_x[player] == (tank_cell_x[x])) &&
                   (x!=player) ) || (tank_cell_x[player] != (tank_cell_x[x]) ) ) {
                  if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
                    tank[player].y-=cell_size;
                    if (tank[player].y < 0) {
                      tank[player].y = 0;
                    }
                  }
                  continue;
            }
          }
        }
        else {
          if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
            tank[player].y-=cell_size;
            if (tank[player].y < 0) {
              tank[player].y = 0;
            }
          }
        };
      }

      if (button == 3) {
        for (x = 1; x < tank.length; x++) {
          if (tank[x]!=null) {
            tank_cell_x[x] = parseInt(tank[x].x/cell_size)
            tank_cell_y[x] = parseInt(tank[x].y/cell_size);
          }
        }

        tank[player].i = 3;

        var cur_cel_x = (2 * tank[player].x) / 48;
        var cur_cel_y = (2 * tank[player].y) / 48;
        var test_1 = level_map[cur_cel_y+2][cur_cel_x];
        var test_2 = level_map[cur_cel_y+2][cur_cel_x+1];

        if (tank.length > 2) {
          for (x = 1; x < tank.length; x++) {
            if ( ( (tank_cell_y[player] != (tank_cell_y[x]-2)) &&
                   (tank_cell_x[player] == (tank_cell_x[x])) &&
                   (x!=player) ) || (tank_cell_x[player] != (tank_cell_x[x]) ) ) {
                     if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
                       tank[player].y+=cell_size;
                       if (tank[player].y > cell_size * y_count) {
                         tank[player].y = cell_size * y_count;
                       }
                     }
                     continue;
            }
          }
        }
        else {
          if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
            tank[player].y+=cell_size;
            if (tank[player].y > cell_size * y_count) {
              tank[player].y = cell_size * y_count;
            }
          }
        };
      }

      if (button == 4) {
        for (x = 1; x < tank.length; x++) {
          if (tank[x]!=null) {
            tank_cell_x[x] = parseInt(tank[x].x/cell_size);
            tank_cell_y[x] = parseInt(tank[x].y/cell_size);
          }
        }

        tank[player].i = 0;

        var cur_cel_x = (2 * tank[player].x) / 48;
        var cur_cel_y = (2 * tank[player].y) / 48;
        var test_1 = level_map[cur_cel_y][cur_cel_x+2];
        var test_2 = level_map[cur_cel_y+1][cur_cel_x+2];

        if (tank.length > 2) {
          for (x = 1; x < tank.length; x++) {
            if ( ( (tank_cell_x[player] != (tank_cell_x[x]-2)) &&
                   (tank_cell_y[player] == (tank_cell_y[x])) &&
                   (x!=player) ) || (tank_cell_y[player] != (tank_cell_y[x]) ) ) {
                     if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
                       tank[player].x+=cell_size;
                       if (tank[player].x > cell_size * x_count) {
                         tank[player].x = cell_size * x_count;
                       }
                     }
                     continue;
            }
          }
        }
        else {
          if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
            tank[player].x+=cell_size;
            if (tank[player].x > cell_size * x_count) {
              tank[player].x = cell_size * x_count;
            }
          }
        };
      }

      if (button == 5) {
        bullets[player].push(new Bullet(tank[player].i, tank[player].x+12, tank[player].y+12, 1));
      }

      if (button == 6) {
        $.ajax({
          url: "/multiplayer/set_pos",
          type: "POST",
          dataType: "json",
          data: { user_id: player,
                  pos_x: JSON.stringify(tank[player].x),
                  pos_y: JSON.stringify(tank[player].y),
                  pos_i: JSON.stringify(tank[player].i)}
        });
      }
    }
  }
}

function post_level_map(){
  $.ajax({
    url: "/multiplayer/index",
    type: "POST",
    dataType: "json",
    data: { lvlmap: JSON.stringify(level_map) }
  });
}
