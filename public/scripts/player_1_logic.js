var player_1_socket = new WebSocket (host);

socket.onmessage = function(msg) {
       if (msg.data == 1) {
       _Tank_1.i = 1;

       var iCurCelX = (2 * _Tank_1.x) / 48;
       var iCurCelY = (2 * _Tank_1.y) / 48;
       var iTest1 = _Map[iCurCelY][iCurCelX-1];
       var iTest2 = _Map[iCurCelY+1][iCurCelX-1];

         if ((iTest1 == 0 || iTest1 == 3) && (iTest2 == 0 || iTest2 == 3)) {
           _Tank_1.x-=24;
             if (_Tank_1.x < 0) {
               _Tank_1.x = 0;
             }
         }
       }

     if (msg.data == 2) {
       _Tank_1.i = 2;

       var iCurCelX = (2 * _Tank_1.x) / 48;
       var iCurCelY = (2 * _Tank_1.y) / 48;
       if (iCurCelY) {
         var iTest1 = _Map[iCurCelY-1][iCurCelX];
         var iTest2 = _Map[iCurCelY-1][iCurCelX+1];

         if ((iTest1 == 0 || iTest1 == 3) && (iTest2 == 0 || iTest2 == 3)) {
           _Tank_1.y-=24;
           if (_Tank_1.y < 0) {
             _Tank_1.y = 0;
           }
         }
       }
     }

     if (msg.data == 3) {
       _Tank_1.i = 3;

       var iCurCelX = (2 * _Tank_1.x) / 48;
       var iCurCelY = (2 * _Tank_1.y) / 48;
       if (iCurCelY+2 < _Y_count) {
         var iTest1 = _Map[iCurCelY+2][iCurCelX];
         var iTest2 = _Map[iCurCelY+2][iCurCelX+1];

         if ((iTest1 == 0 || iTest1 == 3) && (iTest2 == 0 || iTest2 == 3)) {
           _Tank_1.y+=24;
           if (_Tank_1.y > 576) { //CellSize * (_Y_count-2)
             _Tank_1.y = 576;
           }
         }
       }
     }

     if (msg.data == 4) {
       _Tank_1.i = 0;

       var iCurCelX = (2 * _Tank_1.x) / 48;
       var iCurCelY = (2 * _Tank_1.y) / 48;
       var iTest1 = _Map[iCurCelY][iCurCelX+2];
       var iTest2 = _Map[iCurCelY+1][iCurCelX+2];

       if ((iTest1 == 0 || iTest1 == 3) && (iTest2 == 0 || iTest2 == 3)) {
         _Tank_1.x+=24;
         if (_Tank_1.x > 576) { //CellSize * (_X_count-2)
           _Tank_1.x = 576;
         }
       }
    }

    if (msg.data == 5) {
      bullets_1.push(new Bullet(_Tank_1.i, _Tank_1.x+12, _Tank_1.y+12, 1));
    }

    addMessage("Received: " + msg.data);
  }
