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
