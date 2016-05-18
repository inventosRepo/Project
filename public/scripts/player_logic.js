function connect() {
  try {
    socket = new WebSocket (host);

    socket.onpong = function (value) {
      if (value.data == 1) {
        $.getScript ("scripts/player_1_logic.js");
      }
      if (value.data == 2) {
        $.getScript ("scripts/player_2_logic.js");
      }
    }
  } catch(exception) {
  addMessage("Error: " + exception);
  }
}

function addMessage(msg) {
  $("#chat-log").append("<p>" + msg + "</p>");
}
