function move_bullets() {
  for (var j = 1; j < tank.length; j++) {
    for (var i = 0; i < bullets[j].length; i++) {
      if (bullets[j][i].direct==2) {
        bullets[j][i].bull_y-=10;
      }
      else if (bullets[j][i].direct==3) {
        bullets[j][i].bull_y+=10;
      }
      else if (bullets[j][i].direct==0) {
        bullets[j][i].bull_x+=10;
      }
      else if (bullets[j][i].direct==1) {
        bullets[j][i].bull_x-=10;
      }
      bullet_collision(i, j);
    }
  }
}

function bullet_collision (i, j) {
  var tank_cell_x = [];
  var tank_cell_y = [];
  var bullet_cell_x = [];
  var bullet_cell_y = [];
  tank_cell_x[j] = parseInt(tank[j].x/cell_size);
  tank_cell_y[j] = parseInt(tank[j].y/cell_size);
  bullet_cell_x[j] = parseInt(bullets[j][i].bull_x/cell_size);
  bullet_cell_y[j] = parseInt(bullets[j][i].bull_y/cell_size);

  //bullet out of level
  if (bullet_cell_x[j] < 0) {
    bullets[j].splice(i, 1);
    return false;
  }
  if (bullet_cell_x[j] > 26) {
    bullets[j].splice(i, 1);
    return false;
  }
  if (bullet_cell_y[j] < 0) {
    bullets[j].splice(i, 1);
    return false;
  }
  if (bullet_cell_y[j] > 25) {
    bullets[j].splice(i, 1);
    return false;
  }
  //
  //collision with brick
  if(level_map[bullet_cell_y[j]][bullet_cell_x[j]]==1) {
    if ((bullets[j][i].direct == 0) || (bullets[j][i].direct == 1)) {
      level_map[bullet_cell_y[j]][bullet_cell_x[j]]=0;
      if (level_map[bullet_cell_y[j]+1][bullet_cell_x[j]]==1) {
        level_map[bullet_cell_y[j]+1][bullet_cell_x[j]]=0;
      }
    }
    if ((bullets[j][i].direct == 2) || (bullets[j][i].direct == 3)) {
      level_map[bullet_cell_y[j]][bullet_cell_x[j]]=0;
      if (level_map[bullet_cell_y[j]][bullet_cell_x[j]+1]==1) {
        level_map[bullet_cell_y[j]][bullet_cell_x[j]+1]=0;
      }
    }
    bullets[j].splice(i, 1);
  }
  //
  //collision with steel
  if(level_map[bullet_cell_y[j]][bullet_cell_x[j]]==2) {
    bullets[j].splice(i, 1);
  }
  //player collision
  /*for (var i=1; i<tank.length; i++) {
    if((bullet_cell_y[player]==tank_cell_y[i]) && (bullet_cell_x[player]==tank_cell_x[i])) {
      if(i!=player) {
        player_live[i] = false;
        bullets[player].splice(i, 1);
      }
    }
  }*/
}
