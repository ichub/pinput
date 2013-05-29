window.onload = function() {
	var input = new pinput();
	setInterval(function() {
		input.update();
		if (input.isKeyDown('b'))
		{
			console.log('b');
		}
	}, 10);
}
