window.onload = function() {
	var input = new Pinput();
	setInterval(function() {
		input.update();
		if (input.isDown('b a'))
		{
			console.log('b');
		}
	}, 10);
}
