#H1 Pinput

#H3 *A non event-based javascript input manager*

#H4 Overview

The majority of javascript input frameworks are event-based, which is fine in some contexts, but very frustrating in others. This script is unlike that, it saves the states of the keyboard and mouse keys, so that they are available for checking at any time, not just when an event is called.

#H4 Examples

Pinput creates an object called 'input' which can be accessed globaly, which can be used to check the keyboard and mouse states. The key and button states can be accessed not only by thier corresponding key or button codes, but by their names as well. It is important to note that key names are *not* case sensitive. For example, to access the state of the 'a' key, you could write either of the following:

```javascript
// key name option
if (input.isKeyDown('a')) {
  /* do something... */
}

// keycode option
if (input.isKeyDown(65)) {
  /* do something... */
}
```

Pinput also supports key combinations, saving the developer time. In other words, there is an alternative to manually checking each individual key state.

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

#H4 Special Keys

The keys that have no written representation can be refered to by name using these strings:

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
