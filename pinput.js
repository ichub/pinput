window.onload = function() {
	var pinput = function() {
		this.keyStates = new Array(256);
		this.mouseStates = new Array(3);
	};

	removeWhiteSpace = function(string) {
		return string.replace(/\s+/, '');
	};

	stripWhiteSpace = function(string) {
		return string.replace(/\s+/, ' ');
	};

	convertStringToKeycode = function(key) {
		key = removeWhiteSpace(key);
		key = key.toUpperCase();

		switch(key) {
			case "BACKSPACE":
				return 8;
			case "TAB":
				return 9;
			case "ENTER":
				return 13;
			case "SHIFT":
				return 16;
			case "CONTROL":
				return 17;
			case "ALT":
				return 18;
			case "CAPSLOCK":
				return 20;
			case "ESCAPE":
				return 27;
			case "PAGEUP":
				return 33;
			case "PAGEDOWN":
				return 34;
			case "ARROWLEFT":
				return 37;
			case "ARROWUP":
				return 38;
			case "ARROWRIGHT":
				return 38;
			case "ARROWDOWN":
				return 40;
			case "INSERT": 
				return 45;
			case "DELETE":
				return 46;
		}
		return key.charCodeAt(0);
	};

	convertStringToKeyCombo = function(keyCombo) {
		keyComboString = stripWhiteSpace(keyComboString);
		var combo = keyComboString.split(' ');

		for (var i = 0; i < combo.length; i++) {
			combo[i] = convertStringToKeycode(combo[i]);
		};
		return combo;
	};

	convertStringToButtonCode = function(buttonCode) {
		buttonCode = removeWhiteSpace(buttonCode);
		buttonCode = buttonCode.toUpperCase();

		switch(buttonCode) {
			case "LEFT":
				return 0;
			case "MIDDLE":
				return 1;
			case "RIGHT":
				return 2;
		}
	}

	pinput.prototype.isKeyDown = function(key) {
		if (typeof key == "string")
			key = convertStringToKeycode(key);

		return this.keyStates[key];
	};

	pinput.prototype.isKeyComboDown = function(keyCombo) {
		var combo = convertStringToKeyCombo(keyCombo);
		for (var i = 0; i < combo.length; i++) {
			if (!this.isKeyDown(combo[i])) {
				return false;
			}
		}
		return true;
	};

	pinput.prototype.isMouseDown = function(button) {
		if (typeof button === "string")
			button = convertStringToButtonCode(button);
		return this.mouseStates[button];
	};
		
	input = new pinput();

	window.onkeydown = function(e) {
		if (e.which == 18)
			e.preventDefault();
		input.keyStates[e.which] = true;
	}
	window.onkeyup = function(e) {
		input.keyStates[e.which] = false;
	}

	window.onmousedown = function(e) {
		console.log(e.button)
		input.mouseStates[e.button] = true;
	}

	window.onmouseup = function(e) {
		input.mouseStates[e.button] = false;
	}
};
