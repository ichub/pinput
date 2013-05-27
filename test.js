var input = new pinput();
setInterval(function() {
	input.update();
	console.log(input.isKeyClicked('a') || input.isKeyClicked('b'));
}, 1);
