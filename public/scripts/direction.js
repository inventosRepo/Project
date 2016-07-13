  window.onload = function() {
          var port = 3010;
          var host = "ws://"+window.location.hostname.toString()+":"+port;
          var socket = [];
          var btn_id;
          var bonus = 1;
          var move_speed = 300*bonus;
          var fire_speed = 700*bonus;

          function connect(player) {
            try {
              socket[player] = new WebSocket(host);

              socket[player].onopen = function () {
                var msg = {
                  player_id: player,
                  tank_id: id_tank,
                  button_id: 0,
                  player_id_field: player_id_field,
                  action: 'connect'
                };
                socket[player].send(JSON.stringify(msg));
              }
            } catch(exception) {
              addMessage("Error: " + exception);
            }
          }

          function send(player) {
            var msg = {
              player_id: player,
              button_id: btn_id,
              tank_id: id_tank,
              player_id_field: player_id_field,
              action: 'send'
            };
            try {
              socket[player].send(JSON.stringify(msg));
            } catch (exception) {
              addMessage("Failed To Send")
            }
          }



          function btn_event(id, bt_id, speed) {
            document.getElementById(id).ontouchstart =  function() {
            var my_interval = setInterval(function() { btn_id = bt_id; send(player); }, speed);
            this.ontouchend = function(){ clearInterval(my_interval); }
            }
          }

          function save_event(id, bt_id) {
            document.getElementById(id).onclick =  function() {
              btn_id = bt_id; send(player);
            }
          }

          function _port(id, prt) {
            document.getElementById(id).onclick =  function() {
              port = prt;
              host = "ws://"+window.location.hostname.toString()+":"+port;
              connect(player);
            }
          }

          connect(player);

          btn_event("left", 1, move_speed);
          btn_event("top", 2, move_speed);
          btn_event("down", 3, move_speed);
          btn_event("right", 4, move_speed);
          btn_event("fire", 5, fire_speed);
          save_event("save", 6);
        }
