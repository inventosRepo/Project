var socket, host;
var name = '<%=current_user.email %>';
host = "ws://192.168.1.80:3004";
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
        
        if (msg.data == 1) { 
          if ($("#block").position().left < $("#map").position().left+5) { return; }
          $("#tank").each(function() { this.src = this.getAttribute('left'); }); 
          $("#block").animate({"left": "-=5px"}, "fast");
        }
        if (msg.data == 2) { 
          if ($("#block").position().top < $("#map").position().top+5) { return; }
          $("#tank").each(function() { this.src = this.getAttribute('up'); }); 
          $("#block").animate({"top": "-=5px"}, "fast");
        }
        if (msg.data == 3) { 
          if ($("#block").position().top > $("#map").position().top+$("#map").height()-$("#block").height()-5) { return; }
          $("#tank").each(function() { this.src = this.getAttribute('down'); });         
          $("#block").animate({"top": "+=5px"}, "fast"); 
        }
        if (msg.data == 4) { 
          if ($("#block").position().left > $("#map").position().left+$("#map").width()-$("#block").width()-5) { return; }
          $("#tank").each(function() { this.src = this.getAttribute('right'); });
          $("#block").animate({"left": "+=5px"}, "fast"); 
        }
        if (msg.data == 5) { ; }
	addMessage("Received: " + msg.data);
      }
  } catch(exception) {
    addMessage("Error: " + exception);
    }
}
function addMessage(msg) { $("#chat-log").append("<p>" + msg + "</p>"); }

$(function() { connect(); });
