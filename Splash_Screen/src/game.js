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
