window.onload = function() {
	var input = new pinput();
	setInterval(function() {
		input.update();
		if (input.isKeyClicked('b'))
		{
			console.log('b');
		}
	}, 10);
}
