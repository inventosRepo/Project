function connect() {
    if (player == 1) {
      $.getScript ("scripts/player_1_logic.js");
    }
    if (player == 2) {
      $.getScript ("scripts/player_2_logic.js");
    }
  }

function addMessage(msg) {
  $("#chat-log").append("<p>" + msg + "</p>");
}
