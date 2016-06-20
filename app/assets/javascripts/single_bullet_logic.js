function move_bullets() {
  for (var j = 1; j < npc_tank.length; j++) {
    if (npc_tank[j] != null) {
      npc_tank_cell_x[j] = parseInt(npc_tank[j].x/cell_size);
      npc_tank_cell_y[j] = parseInt(npc_tank[j].y/cell_size);
    }
  }
  for (var i = 0; i < bullets.length; i++) {
    if (bullets[i].direct==2) {
      bullets[i].bull_y-=10;
    }
    else if (bullets[i].direct==3) {
      bullets[i].bull_y+=10;
    }
    else if (bullets[i].direct==0) {
      bullets[i].bull_x+=10;
    }
    else if (bullets[i].direct==1) {
      bullets[i].bull_x-=10;
    }
    bullet_cell_x = parseInt(bullets[i].bull_x/cell_size);
    bullet_cell_y = parseInt(bullets[i].bull_y/cell_size);
    bullet_collision(i);
  }
}

function bullet_collision (i) {
  //bullet out of level
  if (bullet_cell_x < 0) {
    bullets.splice(i, 1);
    return false;
  }
  if (bullet_cell_x > 26) {
    bullets.splice(i, 1);
    return false;
  }
  if (bullet_cell_y < 0) {
    bullets.splice(i, 1);
    return false;
  }
  if (bullet_cell_y > 25) {
    bullets.splice(i, 1);
    return false;
  }
  //
  //collision with brick
  if(level_map[bullet_cell_y][bullet_cell_x]==1) {
    if ((bullets[i].direct == 0) || (bullets[i].direct == 1)) {
      level_map[bullet_cell_y][bullet_cell_x]=0;
      if (level_map[bullet_cell_y+1][bullet_cell_x]==1) {
        level_map[bullet_cell_y+1][bullet_cell_x]=0;
      }
    }
    if ((bullets[i].direct == 2) || (bullets[i].direct == 3)) {
      level_map[bullet_cell_y][bullet_cell_x]=0;
      if (level_map[bullet_cell_y][bullet_cell_x+1]==1) {
        level_map[bullet_cell_y][bullet_cell_x+1]=0;
      }
    }
    bullets.splice(i, 1);
  }
  //
  //collision with steel
  if(level_map[bullet_cell_y][bullet_cell_x]==2) {
    bullets.splice(i, 1);
  }
  for (x = 0; x < npc_tank.length; x++) {
    if((bullet_cell_y == npc_tank_cell_y[x]) && (bullet_cell_x==npc_tank_cell_x[x])) {
      npc_live[x] = false;
      delete npc_tank[x].x;
      delete npc_tank[x].y;
      bullets.splice(i, 1);
    }
  }
}
