keyStates = [];
for (var i = 0; i < 256; i++) {
	keyStates[i] = false;
}

document.onkeydown = function(e) {
	if (e.which == 18)
		e.preventDefault();
	keyStates[e.which] = true;
};

document.onkeyup = function(e) {
	keyStates[e.which] = false;
};

function removeWhiteSpace(string) {
	return string.replace(/\s+/, '')
}

function stripWhiteSpace(string) {
	return string.replace(/\s+/, ' ')
}

function convertStringToKeycode(key) {
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
}

function convertStringToKeyCombo(keyComboString) {
	keyComboString = stripWhiteSpace(keyComboString);
	var combo = keyComboString.split(' ');

	for (var i = 0; i < combo.length; i++) {
		combo[i] = convertStringToKeycode(combo[i]);
	};
	return combo;
}

function isKeyDown(key) {
	if (typeof key == "string")
		key = convertStringToKeycode(key);

	return keyStates[key];
};

function isKeyComboDown(keyCombo) {
	var combo = convertStringToKeyCombo(keyCombo);
	for (var i = 0; i < combo.length; i++) {
		if (!isKeyDown(combo[i])) {
			return false;
		}
	}
	return true;
}

function dothing() {
	if (isKeyComboDown('alt control f')) {
		console.log('asd');
	}
}

setInterval(dothing, 1);