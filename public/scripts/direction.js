  window.onload = function() {
    var host = "ws://"+ip+":"+port;
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
            button_id: 0,
            connect_id: 'connected'
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
        button_id: btn_id
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

    connect(player);

    btn_event("left", 1, move_speed);
    btn_event("top", 2, move_speed);
    btn_event("down", 3, move_speed);
    btn_event("right", 4, move_speed);
    btn_event("fire", 5, fire_speed);
}
