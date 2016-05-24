function move_bullets() {
  for (var i = 0; i < bullets[player].length; i++) {
    if (bullets[player][i].direct==2) {
      bullets[player][i].bull_y-=10;
    }
    else if (bullets[player][i].direct==3) {
      bullets[player][i].bull_y+=10;
    }
    else if (bullets[player][i].direct==0) {
      bullets[player][i].bull_x+=10;
    }
    else if (bullets[player][i].direct==1) {
      bullets[player][i].bull_x-=10;
    }
    bullet_collision(i);
  }
}

function bullet_collision (i) {
  var tank_cell_x = [];
  var tank_cell_y = [];
  var bullet_cell_x = [];
  var bullet_cell_y = [];
  tank_cell_x[player] = parseInt(tank[player].x/cell_size);
  tank_cell_y[player] = parseInt(tank[player].y/cell_size);
  bullet_cell_x[player] = parseInt(bullets[player][i].bull_x/cell_size);
  bullet_cell_y[player] = parseInt(bullets[player][i].bull_y/cell_size);
  //bullet out of level
  if (bullet_cell_x[player] < 0) {
    bullets[player].splice(i, 1);
  }
  if (bullet_cell_x[player] > 26) {
    bullets[player].splice(i, 1);
  }
  if (bullet_cell_y[player] < 0) {
    bullets[player].splice(i, 1);
  }
  if (bullet_cell_y[player] > 26) {
    bullets[player].splice(i, 1);
  }
  //
  //collision with brick
  if(level_map[bullet_cell_y[player]][bullet_cell_x[player]]==1) {
    if ((bullets[player][i].direct == 0) || (bullets[player][i].direct == 1)) {
      level_map[bullet_cell_y[player]][bullet_cell_x[player]]=0;
      if (level_map[bullet_cell_y[player]+1][bullet_cell_x[player]]==1) {
        level_map[bullet_cell_y[player]+1][bullet_cell_x[player]]=0;
      }
    }
    if ((bullets[player][i].direct == 2) || (bullets[player][i].direct == 3)) {
      level_map[bullet_cell_y[player]][bullet_cell_x[player]]=0;
      if (level_map[bullet_cell_y[player]][bullet_cell_x[player]+1]==1) {
        level_map[bullet_cell_y[player]][bullet_cell_x[player]+1]=0;
      }
    }
    bullets[player].splice(i, 1);
  }
  //
  //collision with steel
  if(level_map[bullet_cell_y[player]][bullet_cell_x[player]]==2) {
    bullets[player].splice(i, 1);
  }
  //player collision
  if((bullet_cell_y[player]==tank_cell_y[player+1]) && (bullet_cell_x[player]==tank_cell_x[player+1])) {
      player_live[player+1] = false;
      bullets[player].splice(i, 1);
  }
}
