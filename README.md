# Pinput - an input library for games

### Overview

The majority of javascript input frameworks are event-based, which is fine in some contexts, but very frustrating in others. When making games in javascript, developers often face the problems of getting keyboard input - checking of a key is down, if it's pressed and so on. Without having some sort of persistent view of the keyboard, it's hard to do. Most of the time it results in code like this:

```javascript
var isShiftDown = false;
var isSpaceDown = false
// ... and so on for all the keys that are to be kept track of

document.onKeyDown = function(e) {
  if (e.which == 16) 
    isShiftDown = true;
  else if (e.which == 32)
    isSpaceDown = true;
  // ... and so on
}

document.onKeyUp = function(e) {
  if (e.which == 16)
    isShiftDown = false;
  else if (e.which == 32)
    isSpaceDown = false;
  // ... and so on.
}
```

This code is very ugly, in that it takes up a lot of space, and has to be modified for every key that has to be tracked. Pinput, on the other hand, provides easy access to the keyboard and mouse states. Not just when an event is invoked.

### Examples

To start using pinput, simply create a pinput object to be used in your game loop. Do not forget to update every frame!

```javascript
var input = new pinput();

function main() {
  input.update() // updates the input to reflect the state at this frame.
  // some game logic
  // maybe draw some stuff on a canvas
}

setInterval(main, 10); // calls main every 10 milliseconds.
```

Now for the meat: getting key states. The key and button states can be accessed not only by their corresponding key or button codes, but by their names as well. It is important to note that key names are *not* case sensitive. For example, to access the state of the 'a' key, you could write any of the following:

```javascript
// key name option
if (input.isKeyDown('a')) {
  /* do something... */
}

// capitalized key
if (input.isKeyDown('A')) {
  /* do something... */
}
// keycode option
if (input.isKeyDown(65)) {
  /* do something... */
}
```

Pinput also supports key combinations, saving you time. In other words, there is an alternative to manually checking each individual key state.

```javascript
// instead of writing this:
if (input.isKeyDown('a') && input.isKeyDown('b') && input.isKeyDown('c')) {
  /* do something... */
}

// you can write this:
if (input.isKeyComboDown('a b c')) {
  /* do something... */
}
```

The *isKeyComboDown* takes a space-separated string of keys to check the state of, and returns true if they are all pressed, false otherwise. This method, however, only takes named keys as the parameter, not keycodes.

Lastly, pinput can check if a key was pressed and released. To do this, all you have to do is:
```javascript
  // checks if the a key was 'clicked'
  if (input.isKeyClicked('a')) {
    /* do something */
  }
```
### Special Keys

The keys that have no written representation can be refered to by name using these strings:

```
1. backspace - "backspace"
2. tab - "tab"
3. enter - "enter"
4. shift - "shift"
5. control - "control"
6. alt - "alt"
7. caps lock - "capslock"
8. escape - "escape"
9. page up - "pageup"
10. page down - "pagedown"
11. left arrow key - "arrowleft"
12. right arrow key - "arrowright"
13. up arrow key - "arrowup"
14. down arrow key - "arrowdown"
15. insert - "insert"
16. delete - "delete"
17. spacebar - "spacebar"
```
