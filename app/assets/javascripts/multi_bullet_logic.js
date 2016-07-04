function move_bullets() {
  for (var j = 1; j < tank.length; j++) {
    if (tank[j]!=null) {
      tank_cell_x[j] = parseInt(tank[j].x/cell_size);
      tank_cell_y[j] = parseInt(tank[j].y/cell_size);
    }
    for (var i = 0; i < bullets[j].length; i++) {
      if (bullets[j][i].direct==2) {
        bullets[j][i].bull_y-=cell_size/2;
      }
      else if (bullets[j][i].direct==3) {
        bullets[j][i].bull_y+=cell_size/2;
      }
      else if (bullets[j][i].direct==0) {
        bullets[j][i].bull_x+=cell_size/2;
      }
      else if (bullets[j][i].direct==1) {
        bullets[j][i].bull_x-=cell_size/2;
      }
      bullet_cell_x[j] = parseInt(bullets[j][i].bull_x/cell_size);
      bullet_cell_y[j] = parseInt(bullets[j][i].bull_y/cell_size);
      bullet_collision(i, j);
    }
  }
}

function bullet_collision (i, j) {
  //
  //bullet out of level
  if (bullet_cell_x[j] < 0) {
    bullets[j].splice(i, 1);
  }
  if (bullet_cell_x[j] > x_count) {
    bullets[j].splice(i, 1);
  }
  if (bullet_cell_y[j] < 0) {
    bullets[j].splice(i, 1);
  }
  if (bullet_cell_y[j] > y_count-1) {
    bullets[j].splice(i, 1);
  }
  //
  //collisions
  if ((bullets[j][i].direct == 0) || (bullets[j][i].direct == 1)) {
    //
    //collision with brick
    if(level_map[bullet_cell_y[j]][bullet_cell_x[j]]==1) {
      level_map[bullet_cell_y[j]][bullet_cell_x[j]]=0;
      if (level_map[bullet_cell_y[j]+1][bullet_cell_x[j]]==1) {
        level_map[bullet_cell_y[j]+1][bullet_cell_x[j]]=0;
      }
      bullets[j].splice(i, 1);
    }
    if(level_map[bullet_cell_y[j]+1][bullet_cell_x[j]]==1) {
      level_map[bullet_cell_y[j]+1][bullet_cell_x[j]]=0;
      bullets[j].splice(i, 1);
    }
    //
    //collision with steel
    if((level_map[bullet_cell_y[j]][bullet_cell_x[j]]==2) || (level_map[bullet_cell_y[j]+1][bullet_cell_x[j]]==2)) {
      bullets[j].splice(i, 1);
    }
  }
  else {
    if ((bullets[j][i].direct == 2) || (bullets[j][i].direct == 3)) {
      //
      //collision with brick
      if(level_map[bullet_cell_y[j]][bullet_cell_x[j]]==1) {
        level_map[bullet_cell_y[j]][bullet_cell_x[j]]=0;
        if (level_map[bullet_cell_y[j]][bullet_cell_x[j]+1]==1) {
          level_map[bullet_cell_y[j]][bullet_cell_x[j]+1]=0;
        }
        bullets[j].splice(i, 1);
      }
      if(level_map[bullet_cell_y[j]][bullet_cell_x[j]+1]==1) {
        level_map[bullet_cell_y[j]][bullet_cell_x[j]+1]=0;
        bullets[j].splice(i, 1);
      }
      //
      //collision with steel
      if((level_map[bullet_cell_y[j]][bullet_cell_x[j]]==2) || (level_map[bullet_cell_y[j]][bullet_cell_x[j]+1]==2)) {
        bullets[j].splice(i, 1);
      }
    }
  };
  for (x = 1; x < tank.length; x++) {
    if(((bullet_cell_y[player]==tank_cell_y[x]) || (bullet_cell_y[player]+1==tank_cell_y[x]) || (bullet_cell_y[player]-1==tank_cell_y[x])) &&
       ((bullet_cell_x[player]==tank_cell_x[x]) || (bullet_cell_x[player]+1==tank_cell_x[x]) || (bullet_cell_x[player]-1==tank_cell_x[x]))) {
        if(x!=player) {
          player_live[x] = false;
          delete tank[x].x;
          delete tank[x].y;
          bullets[player].splice(i, 1);
        }
    }
  }
}
