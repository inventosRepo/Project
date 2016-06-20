function npc_movement() {
  var random_move = Math.floor((Math.random()*4)+1);
  var random_tank = Math.floor(Math.random()*3);
    if (npc_live[random_tank] == true) {
      switch (random_move) {
        case 1:
        for (x = 0; x < npc_tank.length; x++) {
          if (npc_tank[x] != null) {
            npc_tank_cell_x[x] = parseInt(npc_tank[x].x/cell_size);
            npc_tank_cell_y[x] = parseInt(npc_tank[x].y/cell_size);
          }
        }
        npc_tank[random_tank].i = 1;
        var cur_cel_x = (2 * npc_tank[random_tank].x) / 48;
        var cur_cel_y = (2 * npc_tank[random_tank].y) / 48;
        var test_1 = level_map[cur_cel_y][cur_cel_x-1];
        var test_2 = level_map[cur_cel_y+1][cur_cel_x-1];
          for (x = 0; x < npc_tank.length; x++) {
            if ( ( (npc_tank_cell_x[random_tank] != (npc_tank_cell_x[x]+2)) &&
                   (npc_tank_cell_y[random_tank] == (npc_tank_cell_y[x])) &&
                   (x!=random_tank) ) || (npc_tank_cell_y[random_tank] != (npc_tank_cell_y[x]) ) ) {
                     if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
                       npc_tank[random_tank].x-=24;
                       if (npc_tank[random_tank].x < 0) {
                         npc_tank[random_tank].x = 0;
                       }
                       return false;
                     }
            }
          }
        break;

        case 2:
        for (x = 0; x < npc_tank.length; x++) {
          if (npc_tank[x]!=null) {
            npc_tank_cell_x[x] = parseInt(npc_tank[x].x/cell_size)
            npc_tank_cell_y[x] = parseInt(npc_tank[x].y/cell_size);
          }
        }

        npc_tank[random_tank].i = 2;

        var cur_cel_x = (2 * npc_tank[random_tank].x) / 48;
        var cur_cel_y = (2 * npc_tank[random_tank].y) / 48;
        var test_1 = level_map[cur_cel_y-1][cur_cel_x];
        var test_2 = level_map[cur_cel_y-1][cur_cel_x+1];

          for (x = 0; x < npc_tank.length; x++) {
            if ( ( (npc_tank_cell_y[random_tank] != (npc_tank_cell_y[x]+2)) &&
                   (npc_tank_cell_x[random_tank] == (npc_tank_cell_x[x])) &&
                   (x!=random_tank) ) || (npc_tank_cell_x[random_tank] != (npc_tank_cell_x[x]) ) ) {
                  if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
                    npc_tank[random_tank].y-=24;
                    if (npc_tank[random_tank].y < 0) {
                      npc_tank[random_tank].y = 0;
                    }
                  }
                  return false;
            }
          }
        break;

        case 3:
        for (x = 0; x < npc_tank.length; x++) {
          if (npc_tank[x]!=null) {
            npc_tank_cell_x[x] = parseInt(npc_tank[x].x/cell_size)
            npc_tank_cell_y[x] = parseInt(npc_tank[x].y/cell_size);
          }
        }

        npc_tank[random_tank].i = 3;

        var cur_cel_x = (2 * npc_tank[random_tank].x) / 48;
        var cur_cel_y = (2 * npc_tank[random_tank].y) / 48;
        var test_1 = level_map[cur_cel_y+2][cur_cel_x];
        var test_2 = level_map[cur_cel_y+2][cur_cel_x+1];

          for (x = 0; x < npc_tank.length; x++) {
            if ( ( (npc_tank_cell_y[random_tank] != (npc_tank_cell_y[x]-2)) &&
                   (npc_tank_cell_x[random_tank] == (npc_tank_cell_x[x])) &&
                   (x!=random_tank) ) || (npc_tank_cell_x[random_tank] != (npc_tank_cell_x[x]) ) ) {
                     if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
                       npc_tank[random_tank].y+=24;
                       if (npc_tank[random_tank].y > cell_size * y_count) {
                         npc_tank[random_tank].y = cell_size * y_count;
                       }
                     }
                     return false;
            }
          }
        break;

        case 4:
        for (x = 0; x < npc_tank.length; x++) {
          if (npc_tank[x]!=null) {
            npc_tank_cell_x[x] = parseInt(npc_tank[x].x/cell_size);
            npc_tank_cell_y[x] = parseInt(npc_tank[x].y/cell_size);
          }
        }

        npc_tank[random_tank].i = 0;

        var cur_cel_x = (2 * npc_tank[random_tank].x) / 48;
        var cur_cel_y = (2 * npc_tank[random_tank].y) / 48;
        var test_1 = level_map[cur_cel_y][cur_cel_x+2];
        var test_2 = level_map[cur_cel_y+1][cur_cel_x+2];

          for (x = 0; x < npc_tank.length; x++) {
            if ( ( (npc_tank_cell_x[random_tank] != (npc_tank_cell_x[x]-2)) &&
                   (npc_tank_cell_y[random_tank] == (npc_tank_cell_y[x])) &&
                   (x!=random_tank) ) || (npc_tank_cell_y[random_tank] != (npc_tank_cell_y[x]) ) ) {
                     if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
                       npc_tank[random_tank].x+=24;
                       if (npc_tank[random_tank].x > cell_size * x_count) {
                         npc_tank[random_tank].x = cell_size * x_count;
                       }
                     }
                     return false;
            }
          }
        break;
      }
    }
}

function npc_shot() {
  var random_shot = Math.floor((Math.random()*2));
  if (npc_live[random_shot] == true) {
    npc_bullets[random_shot].push(new Bullet(npc_tank[random_shot].i, npc_tank[random_shot].x+12, npc_tank[random_shot].y+12, 1));
  }
}
