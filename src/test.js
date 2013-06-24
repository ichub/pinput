window.onload = function() {
	var input = new pinput();
	setInterval(function() {
		input.update();
		if (input.isClicked('b a left'))
		{
			console.log('b');
		}
	}, 10);
}
