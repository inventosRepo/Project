  window.onload = function(){
    var socket, host;
    host = "ws://"+ip+":"+port;
    function connect() {
      try {
        socket = new WebSocket(host);
        addMessage("Socket State: " + socket.readyState);

        socket.onopen = function() {
          addMessage("Socket Status: " + socket.readyState + " (open)");
        }

        socket.onclose = function() {
          addMessage("Socket Status: " + socket.readyState + " (closed)");
        }

        socket.onmessage = function(msg) {
          addMessage("Received: " + msg.data);
        }
      } catch(exception) {
        addMessage("Error: " + exception);
      }
    }
    function addMessage(msg) {
      $("#chat-log").append("<p>" + msg + "</p>");
    }
                function send() {
                        var button = btn_id;
      try {
                      socket.send(button);

      } catch(exception) {
        addMessage("Failed To Send")
      }
            }
    $(function() {
      connect();
    });

    var btn_id;
    var bonus = 1;
    var moveSpeed = 300*bonus;
    var fireSpeed = 700*bonus;
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
