window.onload = function() {
	var input = new pinput();
	setInterval(function() {
		input.update();
		if (input.isKeyDown('a'))
		{
			console.log('a');
		}
	}, 10);
}
