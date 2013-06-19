(function() {
	var realState = {
		keyStates: new Array(256),
		mouseStates: new Array(3),
	}
	
	// initializes all the keyboard states
	pinput = function() {
		// creates arrays to store information about the state of 
		// each of the keys. true if pressed, false otherwise. the
		// *previousKeyStates* array is used to store the state of 
		// the keys during the previous update cycle.
		this.keyStates = new Array(256);
		this.previousKeyStates = new Array(256);

		// analogous to *keyStates* and *previousKeyStates* 
		this.mouseStates = new Array(3);
		this.previousMouseStates = new Array(3);

		// initializes all the keyStates to their resting 
		// position - not pressed
		for (var i = 0; i < this.keyStates.length; i++) {
			this.keyStates[i] = false;
			this.previousKeyStates[i] = false;
		}

		// same as *keyStates* initialization
		for (var i = 0; i < this.mouseStates.length; i++) {
			this.mouseStates[i] = false;
			this.previousMouseStates[i] = false;
		}
	};

	// checks if the browser is firefox. used for determining some 
	// edge cases, as some key codes differ from browser to browser.
	var isFireFox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

	// removes all whitespace from a given string.
	var removeWhiteSpace = function(string) {
		string = string + "";
		return string.replace(/\s+/, '');
	};

	// replaces all consecutive instances of whitespace in a given
	// string with one space.
	var stripWhiteSpace = function(string) {
		string = string + "";
		return string.replace(/\s+/, ' ');
	};

	// converts a string to a keycode
	var convertStringToKeycode = function(key) {
		key = removeWhiteSpace(key);
		key = key.toUpperCase();

		var keyCode = parseInt(key, 10);
		if (!isNaN(keyCode))
		{
			return keyCode;
		}

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
			default:
				return key.charCodeAt(0);

		}
	};

	// converts a string of space separated keys to an array
	// of keycodes which can be used to check their states
	var convertStringToKeyCombo = function(keyCombo) {
		keyComboString = stripWhiteSpace(keyComboString);
		var combo = keyComboString.split(' ');

		for (var i = 0; i < combo.length; i++) {
			combo[i] = convertStringToKeycode(combo[i]);
		};
		return combo;
	};

	// same as *convertStringToKeyCombo* but with mouse buttons
	var convertStringToButtonCode = function(buttonCode) {
		buttonCode = removeWhiteSpace(buttonCode);
		buttonCode = buttonCode.toUpperCase();
		
		var buttonCodeNumber = parseInt(buttonCode, 10);
		if (!isNaN(buttonCodeNumber))
		{
			return buttonCodeNumber;
		}
		
		switch(buttonCode) {
			case "LEFT":
				return 0;
			case "MIDDLE":
				return 1;
			case "RIGHT":
				return 2;
		}
	};

	// initializes the *realState* with the default values
	var init = function() {
		for (var i = 0; i < realState.keyStates.length; i++) {
			realState.keyStates[i] = false;
		}

		for (var i = 0; i < realState.mouseStates.length; i++) {
			realState.mouseStates[i] = false;
		}
	};

	// checks whether the given key is down in the given array.
	var isKeyDown = function(key, keyStateArray)
	{
		var keyCode = convertStringToKeycode(key);
		return keyStateArray[keyCode];
	};

	// same as *isKeyDown* but with mouse button
	var isButtonDown = function(button, buttonStateArray)
	{
		var buttonCode = convertStringToButtonCode(button);
		return buttonStateArray[buttonCode];
	};

	// checks if the key was clicked given an array of keystates and
	// an array of previous key states
	var isKeyClicked = function(key, currentKeyStateArray, previousKeyStateArray)
	{
		return isKeyDown(key, currentKeyStateArray) && !isKeyDown(key, previousKeyStateArray);
	};

	// same as *isKeyClicked* but with mouse buttons
	var isButtonClicked = function(key, currentButtonStateArray, previousButtonStateArray)
	{
		return isButtonDown(key, currentButtonStateArray) && !isButtonDown(key, previousButtonStateArray);
	};

	// checks if the key is down in the current *pinput* instance
	pinput.prototype.isKeyDown = function(key) {
		return isKeyDown(key, this.keyStates);
	};

	// checks if the key combo is down in the current *pinput* instance
	pinput.prototype.isKeyComboDown = function(keyCombo) {
		var combo = convertStringToKeyCombo(keyCombo);
		for (var i = 0; i < combo.length; i++) {
			if (!isKeyDown(combo[i], this.keyStates)) {
				return false;
			}
		}
		return true;
	};

	// checks if the mouse button is down in the current *pinput instance
	pinput.prototype.isMouseDown = function(button) {
		return isButtonDown(button, this.mouseStates);
	};

	// same as *isKeyDown* but checks the last frame
	pinput.prototype.isPreviousKeyDown = function(key) {
		return isKeyDown(key, this.previousKeyStates);
	};

	// same as *isMouseDown* but checks the last frame
	pinput.prototype.isPreviousMouseDown = function(button) {
		return isButtonDown(button, this.previousMouseStates);
	};

	// checks if the given key is clicked in the current *pinput* instance
	pinput.prototype.isKeyClicked = function(key) {
		return this.isKeyDown(key) && !this.isPreviousKeyDown(key) && this.isKeyDown(key);
	};

	// same as *isKeyClicked* but with the mouse button
	pinput.prototype.isMouseClicked = function(button) {
		return this.isMouseDown(button) && !this.isPreviousMouseDown(button) && this.isMouseDown(button);
	};

	// updates the key and mouse states of the current *pinput* instance.
	// the previous key and mouse states are set to the current ones, and
	// the current ones are set to reflect the actual state of the keyboard
	// and mouse.
	pinput.prototype.update = function() {
		this.previousKeyStates = this.keyStates.slice(0);
		this.keyStates = realState.keyStates.slice(0);

		this.previousMouseStates = this.mouseStates.slice(0);
		this.mouseStates = realState.mouseStates.slice(0);
	};	

	// creates event handlers which update they real state with 
	// values corresponding to the state of the mouse and the keyboard
	// at the exact moment in time.

	window.onkeydown = function(e) {
		if (e.which == 18)
			e.preventDefault();
		realState.keyStates[e.which] = true;
	};

	window.onkeyup = function(e) {
		realState.keyStates[e.which] = false;
	};

	window.onmousedown = function(e) {
		realState.mouseStates[e.button] = true;
	};

	window.onmouseup = function(e) {
		realState.mouseStates[e.button] = false;
	};

	// initializes *realState*
	init();
})();
