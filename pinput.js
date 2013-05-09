keyStates = [];
for (var i = 0; i < 256; i++) {
	keyStates[i] = false;
}

document.onkeydown = function(e) {
	keyStates[e.which] = true;
};

document.onkeyup = function(e) {
	keyStates[e.which] = false;
};

function convertStringToKeycode(key) {
	var key = key.toUpperCase();
	return key.charCodeAt(0);
}

function convertStringToKeyCombo(keyComboString) {
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
	if (isKeyComboDown('a b')) {
		console.log("DUN");
	}
}

setInterval(dothing, 1);