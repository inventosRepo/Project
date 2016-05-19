  window.onload = function() {
    var host = "ws://"+ip+":"+port;
    var socket = [];
    var btn_id;
    var bonus = 1;
    var moveSpeed = 300*bonus;
    var fireSpeed = 700*bonus;

    function connect(player) {
      try {
        socket[player] = new WebSocket(host);

        socket[player].onopen = function () {
          socket.send(player);
        }
      } catch(exception) {
        addMessage("Error: " + exception);
      }
    }

    function send(player) {
      var button = btn_id;
      var data = player*10+btn_id;
      try {
        socket[player].send(data);
      } catch (exception) {
        addMessage("Failed To Send")
      }
    }

    $(function() {
      connect(player);

	function btnEvent(id, bt_id,speed){
		document.getElementById(id).ontouchstart =  function(){
		var myInterval = setInterval(function() { btn_id = bt_id; send(player); }, speed);
		this.ontouchend = function(){ clearInterval(myInterval); }
		}
	}
	btnEvent("left", 1, moveSpeed);
	btnEvent("top", 2, moveSpeed);
	btnEvent("down", 3, moveSpeed);
	btnEvent("right", 4, moveSpeed);
	btnEvent("fire", 5, fireSpeed)
     
    });
}
