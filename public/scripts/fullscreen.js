document.cancelFullScreen = document.cancelFullScreen || document.webkitCancelFullScreen ||      document.mozCancelFullScreen;

function enterFullscreen() {
	var el =  document.getElementById("keys");
	var onfullscreenchange =  function(e){
		var fullscreenElement = document.fullscreenElement || document.mozFullscreenElement || document.webkitFullscreenElement;
		var fullscreenEnabled = document.fullscreenEnabled || document.mozFullscreenEnabled || document.webkitFullscreenEnabled;
		console.log( 'fullscreenEnabled = ' + fullscreenEnabled, ',  fullscreenElement = ', fullscreenElement, ',  e = ', e);
	}

	el.addEventListener("webkitfullscreenchange", onfullscreenchange);
	el.addEventListener("mozfullscreenchange",     onfullscreenchange);
	el.addEventListener("fullscreenchange",             onfullscreenchange);

	if (el.webkitRequestFullScreen) {
		el.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
	} else {
		el.mozRequestFullScreen();
	}
}
