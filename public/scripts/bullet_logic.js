function movebullets()
{
    for (var i = 0; i < bullets.length; i++) {
        if (bullets[i].direct==2){
            bullets[i].bullY-=10;
        }
        else if (bullets[i].direct==3) {
            bullets[i].bullY+=10;
        }
        else if (bullets[i].direct==0) {
            bullets[i].bullX+=10;
        }
        else if (bullets[i].direct==1) {
            bullets[i].bullX-=10;
        }
        bulletCollision(i);
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
    bullet_cell_x = parseInt(bullets[i].bullX/CellSize);
    bullet_cell_y = parseInt(bullets[i].bullY/CellSize);
    tank_cell_x = parseInt(_Tank.x/CellSize);
    tank_cell_y = parseInt(_Tank.y/CellSize);

    if (bullet_cell_x < 0) {
      bullet_cell_x = 0;
    }
    if (bullet_cell_x > CellSize * (_X_count-2)) {
      bullet_cell_x = CellSize * (_X_count-2);
    }
    if (bullet_cell_y < 0) {
      bullet_cell_y = 0;
    }
    if (bullet_cell_y > CellSize * (_Y_count-2)) {
      bullet_cell_y = CellSize * (_Y_count-2);
    }
    if(_Map[bullet_cell_y][bullet_cell_x]==1) {
      _Map[bullet_cell_y][bullet_cell_x]=0;
      bullets.splice(i, 1);
    }
    if(_Map[bullet_cell_y][bullet_cell_x]==2) {
      bullets.splice(i, 1);
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
