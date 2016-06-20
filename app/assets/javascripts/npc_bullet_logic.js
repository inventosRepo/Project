function move_npc_bullets() {
  for (var j = 0; j < npc_tank.length; j++) {
    for (var i = 0; i < npc_bullets[j].length; i++) {
      if (npc_bullets[j][i].direct==2) {
        npc_bullets[j][i].bull_y-=10;
      }
      else if (npc_bullets[j][i].direct==3) {
        npc_bullets[j][i].bull_y+=10;
      }
      else if (npc_bullets[j][i].direct==0) {
        npc_bullets[j][i].bull_x+=10;
      }
      else if (npc_bullets[j][i].direct==1) {
        npc_bullets[j][i].bull_x-=10;
      }
      npc_bullet_cell_x[j] = parseInt(npc_bullets[j][i].bull_x/cell_size);
      npc_bullet_cell_y[j] = parseInt(npc_bullets[j][i].bull_y/cell_size);
      npc_bullet_collision(i, j);
    }
  }
}

function npc_bullet_collision (i, j) {
  //bullet out of level
  if (npc_bullet_cell_x[j] < 0) {
    npc_bullets[j].splice(i, 1);
    return false;
  }
  if (npc_bullet_cell_x[j] > 26) {
    npc_bullets[j].splice(i, 1);
    return false;
  }
  if (npc_bullet_cell_y[j] < 0) {
    npc_bullets[j].splice(i, 1);
    return false;
  }
  if (npc_bullet_cell_y[j] > 25) {
    npc_bullets[j].splice(i, 1);
    return false;
  }
  //
  //collision with brick
  if(level_map[npc_bullet_cell_y[j]][npc_bullet_cell_x[j]]==1) {
    if ((npc_bullets[j][i].direct == 0) || (npc_bullets[j][i].direct == 1)) {
      level_map[npc_bullet_cell_y[j]][npc_bullet_cell_x[j]]=0;
      if (level_map[npc_bullet_cell_y[j]+1][npc_bullet_cell_x[j]]==1) {
        level_map[npc_bullet_cell_y[j]+1][npc_bullet_cell_x[j]]=0;
      }
    }
    if ((npc_bullets[j][i].direct == 2) || (npc_bullets[j][i].direct == 3)) {
      level_map[npc_bullet_cell_y[j]][npc_bullet_cell_x[j]]=0;
      if (level_map[npc_bullet_cell_y[j]][npc_bullet_cell_x[j]+1]==1) {
        level_map[npc_bullet_cell_y[j]][npc_bullet_cell_x[j]+1]=0;
      }
    }
    npc_bullets[j].splice(i, 1);
  }
  //
  //collision with steel
  if(level_map[npc_bullet_cell_y[j]][npc_bullet_cell_x[j]]==2) {
    npc_bullets[j].splice(i, 1);
  }

  //collision with player
  if (player_live == true) {
    tank_cell_x = parseInt(tank.x/cell_size);
    tank_cell_y = parseInt(tank.y/cell_size);
    for (x = 0; x < npc_tank.length; x++) {
      if((npc_bullet_cell_y[x]==tank_cell_y) && (npc_bullet_cell_x[x]==tank_cell_x)) {
        player_live = false;
        delete tank.x;
        delete tank.y;
        npc_bullets[x].splice(i, 1);
      }
    }
  }
}
