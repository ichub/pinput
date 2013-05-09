window.onload = function() {
	var pinput = function() {
		this.keyStates = new Array(256);
	};

	pinput.prototype.removeWhiteSpace = function(string) {
		return string.replace(/\s+/, '');
	};

	pinput.prototype.stripWhiteSpace = function(string) {
		return string.replace(/\s+/, ' ');
	};

	pinput.prototype.convertStringToKeycode = function(key) {
		key = this.removeWhiteSpace(key);
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

	pinput.prototype.convertStringToKeyCombo = function(keyCombo) {
		keyComboString = this.stripWhiteSpace(keyComboString);
		var combo = keyComboString.split(' ');

		for (var i = 0; i < combo.length; i++) {
			combo[i] = this.convertStringToKeycode(combo[i]);
		};
		return combo;
	};

	pinput.prototype.isKeyDown = function(key) {
		if (typeof key == "string")
			key = this.convertStringToKeycode(key);

		return this.keyStates[key];
	};

	pinput.prototype.isKeyComboDown = function(keyCombo) {
		var combo = this.convertStringToKeyCombo(keyCombo);
		for (var i = 0; i < combo.length; i++) {
			if (!this.isKeyDown(combo[i])) {
				return false;
			}
		}
		return true;
	};
		
	input = new pinput();
	document.onkeydown = function(e) {
		if (e.which == 18)
			e.preventDefault();
		input.keyStates[e.which] = true;
	}
	document.onkeyup = function(e) {
		input.keyStates[e.which] = false;
	}

	setInterval(function() {
		if (input.isKeyDown('a')) {
			console.log("test");
		}
	});
};
