var realState = {
	keyStates: new Array(256),
	mouseStates: new Array(3),
}
	
pinput = function() {
	this.keyStates = new Array(256);
	this.previousKeyStates = new Array(256);
	this.mouseStates = new Array(3);
	this.previousMouseStates = new Array(3);

	for (var i = 0; i < this.keyStates.length; i++) {
		this.keyStates[i] = false;
		this.previousKeyStates[i] = false;
	}
	for (var i = 0; i < this.mouseStates.length; i++) {
		this.mouseStates[i] = false;
		this.previousMouseStates[i] = false;
	};
};

var isFireFox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

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
		case "SPACEBAR":
			return 32;
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
		case "+":
			return isFireFox ? 61 : 187;
		case "=":
			return isFireFox ? 61 : 187;
		case "-":
			return isFireFox ? 173 : 189;
		case "[":
			return 219;
		case "]":
			return 221;
		case "/":
			return 191;
		case "\\":
			return 220;

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

init = function() {
	for (var i = 0; i < realState.keyStates.length; i++) {
		realState.keyStates[i] = false;
	}

	for (var i = 0; i < realState.mouseStates.length; i++) {
		realState.mouseStates[i] = false;
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

pinput.prototype.isPreviousKeyDown = function(key) {
	if (typeof key == "string")
		key = convertStringToKeycode(key);

	return this.previousKeyStates[key];
};

pinput.prototype.isPreviousMouseDown = function(button) {
	if (typeof button == "string")
		button = convertStringToButtonCode(button);

	return this.previousMouseStates[button];
};

pinput.prototype.isKeyClicked = function(key) {
	return this.isKeyDown(key) && !this.isPreviousKeyDown(key) && this.isKeyDown(key) == true;
};

pinput.prototype.isMouseClicked = function(button) {
	return this.isMouseDown(button) && !this.isPreviousMouseDown(button) && this.isMouseDown(button) == true;
};

pinput.prototype.update = function() {
	this.previousKeyStates = this.keyStates.slice(0);
	this.keyStates = realState.keyStates.slice(0);

	this.previousMouseStates = this.mouseStates.slice(0);
	this.mouseStates = realState.mouseStates.slice(0);
}	

window.onkeydown = function(e) {
	if (e.which == 18)
		e.preventDefault();
	realState.keyStates[e.which] = true;
}
window.onkeyup = function(e) {
	realState.keyStates[e.which] = false;
}

window.onmousedown = function(e) {
	realState.mouseStates[e.button] = true;
}

window.onmouseup = function(e) {
	realState.mouseStates[e.button] = false;
}
init();
