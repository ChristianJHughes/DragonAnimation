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
