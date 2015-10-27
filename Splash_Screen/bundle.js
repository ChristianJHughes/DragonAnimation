(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// example.js
//
// Author: Christian Hughes
// Orginal File Constructs: Nathan Bean
//
// This example creates a stack of GameStates, and establishes methods for pushing and popping states.
// It serves as the main entry point for the game. The "game" GameState runs by default.

// Wait for the window to load completely
window.onload = function() {
  var gameState = [];

  var pushState = function(state) {
    state.load({pushState: pushState, popState: popState});
    gameState.push(state);
  }

  var popState = function() {
    state = gameState.pop();
    if(state) state.exit();
    return state;
  }

  var game = require('./game');
  pushState(game);

  // Event handler for key events. Will send events to whichever GameState is on the top of the stack.
  window.onkeydown = function(event) {
    gameState[gameState.length-1].keyHandler(event);
  }

  // The game loop will render and update whatever GameState is in the top of the stack.
  function loop(elapsedTime) {
    gameState[gameState.length-1].update(elapsedTime);
    gameState[gameState.length-1].render(elapsedTime);
    window.requestAnimationFrame(loop);
  }
  window.requestAnimationFrame(loop);

};

},{"./game":2}],2:[function(require,module,exports){
// game.js
//
// Author: Christian Hughes
//
// In this example, it esentially serves as a dummy state for the bottom of the stack. There is no game logic, nor
// is anything rendered to the canvas.

// Gameplay game state defined using the Module pattern
module.exports = (function (){
  var screenCtx,
      stateManager;

  var load = function(sm) {
    stateManager = sm;

    // Set up the screen canvas. It will be of 1080 resolution, similar to the container that it resides in.
    var screen = document.createElement("canvas");
    screen.width = 1920;
    screen.height = 1080;
    screenCtx = screen.getContext("2d");
    document.getElementById("game-screen-container").appendChild(screen);
  }

  // Updates the game, though there is no game to update in this case.
  var update = function() {}

  // Renders the game, though there is no game to render in this case.
  var render = function() {}

  // Event handler for key events. The only listener resides on the escape key. Doing so will
  // add the main menu to the stack (and display it on screen), though it is also displayed by
  // default.
  var keyHandler = function(event) {
    switch(event.keyCode) {
      case 27: // ESC
        event.preventDefault();
        var mainMenu = require('./splash-screen');
        stateManager.pushState(mainMenu);
        break;
    }
  }

  // The game runs forever (or until the user closes the browser page), so this function is a no-op.
  var exit = function() {}

  // Return all functions, esentially "exposing methods."
  return {
    load: load,
    exit: exit,
    update: update,
    render: render,
    keyHandler: keyHandler
  }

})();

},{"./splash-screen":3}],3:[function(require,module,exports){
// splash-screen.js
//
// Author: Christian Hughes
//
// Hosts the functions that show and hide the HTML 5 monster splash screen.

// Main Menu game state defined using the Module pattern
module.exports = (function (){
  var menu = document.getElementById("splash-screen"),
      stateManager;

  /*
   * The load() method initializes the menu
   * and tells the DOM to render the menu HTML
   * parameters:
   * - sm the state manager
   */
  var load = function(sm) {
    stateManager = sm;
    menu.style.display = "flex";
  }

  /*
   * The exit() method hides the menu
   */
  var exit = function() {
    menu.style.display = "none";
  }

  /*
   * The update() method updates the menu
   * (in this case, a no-op)
   */
  var update = function() {}

  /*
   * The render() method renders the menu
   * (in this case, a no-op as the menu is
   * HTML elements renderd by the DOM)
   */
  var render = function() {}

  /*
   * The keyHander() method handles key
   * events for the menu.
   */
  var keyHandler = function(event) {
    switch(event.keyCode) {
      case 13: // ENTER
      case 32: // SPACE
      case 27: // ESC
        event.preventDefault();
        stateManager.popState();
        break;
    }
  }

  return {
    load: load,
    exit: exit,
    update: update,
    render: render,
    keyHandler: keyHandler
  }

})();

},{}]},{},[1]);
