function move_bullets() {
  if (player == 1) {
    for (var i = 0; i < bullets_1.length; i++) {
      if (bullets_1[i].direct==2) {
        bullets_1[i].bull_y-=10;
      }
      else if (bullets_1[i].direct==3) {
        bullets_1[i].bull_y+=10;
      }
      else if (bullets_1[i].direct==0) {
        bullets_1[i].bull_x+=10;
      }
      else if (bullets_1[i].direct==1) {
        bullets_1[i].bull_x-=10;
      }
      bullet_collision(i);
    }
  }

  if (player==2) {
    for (var i = 0; i < bullets_2.length; i++) {
      if (bullets_2[i].direct==2){
        bullets_2[i].bull_y-=10;
      }
      else if (bullets_2[i].direct==3) {
        bullets_2[i].bull_y+=10;
      }
      else if (bullets_2[i].direct==0) {
        bullets_2[i].bull_x+=10;
      }
      else if (bullets_2[i].direct==1) {
        bullets_2[i].bull_x-=10;
      }
      bullet_collision(i);
    }
  }
}

function bullet_collision (i) {
  tank_1_cell_x = parseInt(tank_1.x/cell_size);
  tank_1_cell_y = parseInt(tank_1.y/cell_size);
  tank_2_cell_x = parseInt(tank_2.x/cell_size);
  tank_2_cell_y = parseInt(tank_2.y/cell_size);

  if (player == 1) {
    bullet_1_cell_x = parseInt(bullets_1[i].bull_x/cell_size);
    bullet_1_cell_y = parseInt(bullets_1[i].bull_y/cell_size);

    if (bullet_1_cell_x < 0) {
      bullets_1.splice(i, 1);
    }
    if (bullet_1_cell_x > 26) {
      bullets_1.splice(i, 1);
    }
    if (bullet_1_cell_y < 0) {
      bullets_1.splice(i, 1);
    }
    if (bullet_1_cell_y > 26) {
      bullets_1.splice(i, 1);
    }
    if(level_map[bullet_1_cell_y][bullet_1_cell_x]==1) {
      if ((bullets_1[i].direct == 0) || (bullets_1[i].direct == 1)) {
        level_map[bullet_1_cell_y][bullet_1_cell_x]=0;
        level_map[bullet_1_cell_y+1][bullet_1_cell_x]=0;
      }
      if ((bullets_1[i].direct == 2) || (bullets_1[i].direct == 3)) {
        level_map[bullet_1_cell_y][bullet_1_cell_x]=0;
        level_map[bullet_1_cell_y][bullet_1_cell_x+1]=0;
      }
      bullets_1.splice(i, 1);
    }
    if(level_map[bullet_1_cell_y][bullet_1_cell_x]==2) {
      bullets_1.splice(i, 1);
    }
    if((bullet_1_cell_y==tank_2_cell_y) && (bullet_1_cell_x==tank_2_cell_x)) {
      player_2_live = false;
      bullets_1.splice(i, 1);
    }
  }

  if (player == 2) {
    bullet_2_cell_x = parseInt(bullets_2[i].bull_x/cell_size);
    bullet_2_cell_y = parseInt(bullets_2[i].bull_y/cell_size);

    if (bullet_2_cell_x < 0) {
      bullets_2.splice(i, 1);
    }
    if (bullet_2_cell_x > 24) {
      bullets_2.splice(i, 1);
    }
    if (bullet_2_cell_y < 0) {
      bullets_2.splice(i, 1);
    }
    if (bullet_2_cell_y > 24) {
      bullets_2.splice(i, 1);
    }
    if(level_map[bullet_2_cell_y][bullet_2_cell_x]==1) {
      level_map[bullet_2_cell_y][bullet_2_cell_x]=0;
      bullets_2.splice(i, 1);
    }
    if(level_map[bullet_2_cell_y][bullet_2_cell_x]==2) {
      bullets_2.splice(i, 1);
    }
    if((bullet_2_cell_y==tank_1_cell_y) && (bullet_2_cell_x==tank_1_cell_x)) {
      player_1_live = false;
      bullets_2.splice(i, 1);
    }
  }
}

function move_npc_bullets() {
  for (var i = 0; i < npc_bullets.length; i++) {
    if (npc_bullets[i].direct==2){
      npc_bullets[i].bull_y-=10;
    }
    else if (npc_bullets[i].direct==3) {
      npc_bullets[i].bull_y+=10;
    }
    else if (npc_bullets[i].direct==0) {
      npc_bullets[i].bull_x+=10;
    }
    else if (npc_bullets[i].direct==1) {
      npc_bullets[i].bull_x-=10;
    }
    npc_bullet_collision(i);
  }
}

function npc_bullet_collision(i) {
  npc_bullet_cell_x = parseInt(npc_bullets[i].bull_x/cell_size);
  npc_bullet_cell_y = parseInt(npc_bullets[i].bull_y/cell_size);
  npctank_cell_x = parseInt(tank_NPC.x/cell_size);
  npctank_cell_y = parseInt(tank_NPC.y/cell_size);

  if (npc_bullet_cell_x < 0) {
    npc_bullet_cell_x = 0;
  }
  if (npc_bullet_cell_x > cell_size * (_X_count-2)) {
    npc_bullet_cell_x = cell_size * (_X_count-2);
  }
  if (npc_bullet_cell_y < 0) {
    npc_bullet_cell_y = 0;
  }
  if (npc_bullet_cell_y > cell_size * (_Y_count-2)) {
    npc_bullet_cell_y = cell_size * (_Y_count-2);
  }
  if((npc_bullet_cell_y==tank_cell_y) && (npc_bullet_cell_x==tank_cell_x)) {
    npc_bullets.splice(i, 1);
    alert('Game over!');
    window.location.reload();
  }
  if(level_map[npc_bullet_cell_y][npc_bullet_cell_x]==1) {
    level_map[npc_bullet_cell_y][npc_bullet_cell_x]=0;
    npc_bullets.splice(i, 1);
  }
  if(level_map[npc_bullet_cell_y][npc_bullet_cell_x]==2) {
    npc_bullets.splice(i, 1);
  }
}
