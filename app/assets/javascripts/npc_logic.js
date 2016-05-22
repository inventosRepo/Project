function npc_movement() {
  random_move = Math.floor((Math.random()*4)+1);
  switch (random_move) {
    case 1:
    tank_NPC.i = 1;

    var cur_cel_x = (2 * tank_NPC.x) / 48;
    var cur_cel_y = (2 * tank_NPC.y) / 48;
    var test_1 = level_map[cur_cel_y][cur_cel_x-1];
    var test_2 = level_map[cur_cel_y+1][cur_cel_x-1];

    if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
      tank_NPC.x-=24;
      if (tank_NPC.x < 0) {
        tank_NPC.x = 0;
      }
    }
    break;

    case 2:
    tank_NPC.i = 2;

    var cur_cel_x = (2 * tank_NPC.x) / 48;
    var cur_cel_y = (2 * tank_NPC.y) / 48;
    if (cur_cel_y) {
      var test_1 = _Map[cur_cel_y-1][cur_cel_x];
      var test_2 = _Map[cur_cel_y-1][cur_cel_x+1];

      if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
        tank_NPC.y-=24;
        if (tank_NPC.y < 0) {
          tank_NPC.y = 0;
        }
      }
    }
    break;

    case 3:
    tank_NPC.i = 3;

    var cur_cel_x = (2 * tank_NPC.x) / 48;
    var cur_cel_y = (2 * tank_NPC.y) / 48;
    if (cur_cel_y+2 < _Y_count) {
      var test_1 = _Map[cur_cel_y+2][cur_cel_x];
      var test_2 = _Map[cur_cel_y+2][cur_cel_x+1];

      if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
        tank_NPC.y+=24;
        if (tank_NPC.y > 576) { //CellSize * (_Y_count-2)
          tank_NPC.y = 576;
        }
      }
    }
    break;

    case 4:
    tank_NPC.i = 0;

    var cur_cel_x = (2 * tank_NPC.x) / 48;
    var cur_cel_y = (2 * tank_NPC.y) / 48;
    var test_1 = _Map[cur_cel_y][cur_cel_x+2];
    var test_2 = _Map[cur_cel_y+1][cur_cel_x+2];

    if ((test_1 == 0 || test_1 == 3) && (test_2 == 0 || test_2 == 3)) {
      tank_NPC.x+=24;
      if (tank_NPC.x > 576) { //cell_size * (x_count-2)
        tank_NPC.x = 576;
      }
    }
    break;
  }
}

function npc_shot() {
  npc_bullets.push(new Bullet(tank_NPC.i, tank_NPC.x+12, tank_NPC.y+12, 1));
}
