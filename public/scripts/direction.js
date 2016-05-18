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

      document.getElementById("left").ontouchstart =  function(){
        var myInterval = setInterval(function() { btn_id = 1; send(player); }, moveSpeed);
        this.ontouchend = function(){ clearInterval(myInterval); }
      }

      document.getElementById("top").ontouchstart =  function(){
        var myInterval = setInterval(function() { btn_id = 2; send(player); }, moveSpeed);
        this.ontouchend = function(){ clearInterval(myInterval); }
      }

      document.getElementById("down").ontouchstart =  function(){
        var myInterval = setInterval(function() { btn_id = 3; send(player); }, moveSpeed);
        this.ontouchend = function(){ clearInterval(myInterval); }
      }

      document.getElementById("right").ontouchstart =  function(){
        var myInterval = setInterval(function() { btn_id = 4; send(player); }, moveSpeed);
        this.ontouchend = function(){ clearInterval(myInterval); }
      }

      document.getElementById("fire").ontouchstart =  function(){
        var myInterval = setInterval(function() { btn_id = 5; send(player); }, fireSpeed);
        this.ontouchend = function(){ clearInterval(myInterval); }
      }
    });
}
