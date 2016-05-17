function NpcMovement() {
  random_move = Math.floor((Math.random()*4)+1);
  switch (random_move) {
    case 1:
    _Tank_NPC.i = 1;

    var iCurCelX = (2 * _Tank_NPC.x) / 48;
    var iCurCelY = (2 * _Tank_NPC.y) / 48;
    var iTest1 = _Map[iCurCelY][iCurCelX-1];
    var iTest2 = _Map[iCurCelY+1][iCurCelX-1];

    if ((iTest1 == 0 || iTest1 == 3) && (iTest2 == 0 || iTest2 == 3)) {
      _Tank_NPC.x-=24;
      if (_Tank_NPC.x < 0) {
        _Tank_NPC.x = 0;
      }
    }
    break;

    case 2:
    _Tank_NPC.i = 2;

    var iCurCelX = (2 * _Tank_NPC.x) / 48;
    var iCurCelY = (2 * _Tank_NPC.y) / 48;
    if (iCurCelY) {
      var iTest1 = _Map[iCurCelY-1][iCurCelX];
      var iTest2 = _Map[iCurCelY-1][iCurCelX+1];

      if ((iTest1 == 0 || iTest1 == 3) && (iTest2 == 0 || iTest2 == 3)) {
        _Tank_NPC.y-=24;
        if (_Tank_NPC.y < 0) {
          _Tank_NPC.y = 0;
        }
      }
    }
    break;

    case 3:
    _Tank_NPC.i = 3;

    var iCurCelX = (2 * _Tank_NPC.x) / 48;
    var iCurCelY = (2 * _Tank_NPC.y) / 48;
    if (iCurCelY+2 < _Y_count) {
      var iTest1 = _Map[iCurCelY+2][iCurCelX];
      var iTest2 = _Map[iCurCelY+2][iCurCelX+1];

      if ((iTest1 == 0 || iTest1 == 3) && (iTest2 == 0 || iTest2 == 3)) {
        _Tank_NPC.y+=24;
        if (_Tank_NPC.y > 576) { //CellSize * (_Y_count-2)
          _Tank_NPC.y = 576;
        }
      }
    }
    break;

    case 4:
    _Tank_NPC.i = 0;

    var iCurCelX = (2 * _Tank_NPC.x) / 48;
    var iCurCelY = (2 * _Tank_NPC.y) / 48;
    var iTest1 = _Map[iCurCelY][iCurCelX+2];
    var iTest2 = _Map[iCurCelY+1][iCurCelX+2];

    if ((iTest1 == 0 || iTest1 == 3) && (iTest2 == 0 || iTest2 == 3)) {
      _Tank_NPC.x+=24;
      if (_Tank_NPC.x > 576) { //CellSize * (_X_count-2)
        _Tank_NPC.x = 576;
      }
    }
    break;
  }
}

function NpcShot() {
  npc_bullets.push(new Bullet(_Tank_NPC.i, _Tank_NPC.x+12, _Tank_NPC.y+12, 1));
}
