  window.onload = function() {
    var socket, host;
    var btn_id;
    var player = 1;
    var bonus = 1;
    var moveSpeed = 300*bonus;
    var fireSpeed = 700*bonus;

    host = "ws://"+ip+":"+port;


    function connect() {
      try {
        socket = new WebSocket(host);
        socket.onopen = function() {
          socket.ping(player);
          num_player++;
        };

        socket.onclose;

      } catch(exception) {
        addMessage("Error: " + exception);
      }
    }

    function send() {
      var button = btn_id;
      try {
        socket.ping(button);
      } catch (exception) {
        addMessage("Failed To Send")
      }
    }

    $(function() {
      connect();
    });

    document.getElementById("left").ontouchstart =  function(){
      var myInterval = setInterval(function() { btn_id = 1; send(); }, moveSpeed);
      this.ontouchend = function(){ clearInterval(myInterval); }
    }

    document.getElementById("top").ontouchstart =  function(){
      var myInterval = setInterval(function() { btn_id = 2; send()}, moveSpeed);
      this.ontouchend = function(){ clearInterval(myInterval); }
    }

    document.getElementById("down").ontouchstart =  function(){
      var myInterval = setInterval(function() { btn_id = 3; send()}, moveSpeed);
      this.ontouchend = function(){ clearInterval(myInterval); }
    }

    document.getElementById("right").ontouchstart =  function(){
      var myInterval = setInterval(function() { btn_id = 4; send()}, moveSpeed);
      this.ontouchend = function(){ clearInterval(myInterval); }
    }

    document.getElementById("fire").ontouchstart =  function(){
      var myInterval = setInterval(function() { btn_id = 5; send()}, fireSpeed);
      this.ontouchend = function(){ clearInterval(myInterval); }
    }
}
