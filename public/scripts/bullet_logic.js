function movebullets() {
  switch (player) {
    case 1:
    for (var i = 0; i < bullets_1.length; i++) {
        if (bullets_1[i].direct==2){
            bullets_1[i].bullY-=10;
        }
        else if (bullets_1[i].direct==3) {
            bullets_1[i].bullY+=10;
        }
        else if (bullets_1[i].direct==0) {
            bullets_1[i].bullX+=10;
        }
        else if (bullets_1[i].direct==1) {
            bullets_1[i].bullX-=10;
        }
        bulletCollision(i);
    }
    break;

    case 2:
    for (var i = 0; i < bullets_2.length; i++) {
        if (bullets_2[i].direct==2){
            bullets_2[i].bullY-=10;
        }
        else if (bullets_2[i].direct==3) {
            bullets_2[i].bullY+=10;
        }
        else if (bullets_2[i].direct==0) {
            bullets_2[i].bullX+=10;
        }
        else if (bullets_2[i].direct==1) {
            bullets_2[i].bullX-=10;
        }
        bulletCollision(i);
    }
    break;
  }
}

function movenpcbullets()
{
    for (var i = 0; i < npc_bullets.length; i++) {
        if (npc_bullets[i].direct==2){
            npc_bullets[i].bullY-=10;
        }
        else if (npc_bullets[i].direct==3) {
            npc_bullets[i].bullY+=10;
        }
        else if (npc_bullets[i].direct==0) {
            npc_bullets[i].bullX+=10;
        }
        else if (npc_bullets[i].direct==1) {
            npc_bullets[i].bullX-=10;
        }
        npc_bulletCollision(i);
    }
}

function bulletCollision(i) {
  tank_1_cell_x = parseInt(_Tank_1.x/CellSize);
  tank_1_cell_y = parseInt(_Tank_1.y/CellSize);
  tank_2_cell_x = parseInt(_Tank_2.x/CellSize);
  tank_2_cell_y = parseInt(_Tank_2.y/CellSize);

  switch (player) {
    case 1:
    bullet_1_cell_x = parseInt(bullets_1[i].bullX/CellSize);
    bullet_1_cell_y = parseInt(bullets_1[i].bullY/CellSize);

    if (bullet_1_cell_x < 0) {
      bullets_1.splice(i, 1);
    }
    if (bullet_1_cell_x > 25) {
      bullets_1.splice(i, 1);
    }
    if (bullet_1_cell_y < 0) {
      bullets_1.splice(i, 1);
    }
    if (bullet_1_cell_y > 26) {
      bullets_1.splice(i, 1);
    }
    if(_Map[bullet_1_cell_y][bullet_1_cell_x]==1) {
      if ((bullets_1[i].direct == 0) || (bullets_1[i].direct == 1)) {
        _Map[bullet_1_cell_y][bullet_1_cell_x]=0;
        _Map[bullet_1_cell_y+1][bullet_1_cell_x]=0;
      }
      if ((bullets_1[i].direct == 2) || (bullets_1[i].direct == 3)) {
        _Map[bullet_1_cell_y][bullet_1_cell_x]=0;
        _Map[bullet_1_cell_y][bullet_1_cell_x+1]=0;
      }
      bullets_1.splice(i, 1);
    }
    if(_Map[bullet_1_cell_y][bullet_1_cell_x]==2) {
      bullets_1.splice(i, 1);
    }
    if((bullet_1_cell_y==tank_2_cell_y) && (bullet_1_cell_x==tank_2_cell_x)) {
      _Tank_2.image = imgBrokenTank;
      player_2_live = false;
      bullets_1.splice(i, 1);
    }
    break;

    case 2:
    bullet_2_cell_x = parseInt(bullets_2[i].bullX/CellSize);
    bullet_2_cell_y = parseInt(bullets_2[i].bullY/CellSize);

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
    if(_Map[bullet_2_cell_y][bullet_2_cell_x]==1) {
      _Map[bullet_2_cell_y][bullet_2_cell_x]=0;
      bullets_2.splice(i, 1);
    }
    if(_Map[bullet_2_cell_y][bullet_2_cell_x]==2) {
      bullets_2.splice(i, 1);
    }
    break;
  }
}

function npc_bulletCollision(i) {
    npc_bullet_cell_x = parseInt(npc_bullets[i].bullX/CellSize);
    npc_bullet_cell_y = parseInt(npc_bullets[i].bullY/CellSize);
    npc_tank_cell_x = parseInt(_Tank_NPC.x/CellSize);
    npc_tank_cell_y = parseInt(_Tank_NPC.y/CellSize);

    if (npc_bullet_cell_x < 0) {
      npc_bullet_cell_x = 0;
    }
    if (npc_bullet_cell_x > CellSize * (_X_count-2)) {
      npc_bullet_cell_x = CellSize * (_X_count-2);
    }
    if (npc_bullet_cell_y < 0) {
      npc_bullet_cell_y = 0;
    }
    if (npc_bullet_cell_y > CellSize * (_Y_count-2)) {
      npc_bullet_cell_y = CellSize * (_Y_count-2);
    }

    if((npc_bullet_cell_y==tank_cell_y) && (npc_bullet_cell_x==tank_cell_x)) {
      npc_bullets.splice(i, 1);
      alert('Game over!');
      window.location.reload();
    }
    if(_Map[npc_bullet_cell_y][npc_bullet_cell_x]==1) {
      _Map[npc_bullet_cell_y][npc_bullet_cell_x]=0;
      npc_bullets.splice(i, 1);
    }
    if(_Map[npc_bullet_cell_y][npc_bullet_cell_x]==2) {
      npc_bullets.splice(i, 1);
    }
}
