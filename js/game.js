var cUtils = require('./utils/utils.canvas.js'),
    $container = document.getElementById('container');

function Game(w, h) {
  // Generate a canvas and store it as our viewport
  this.viewport = cUtils.generateCanvas(w, h);
  this.viewport.id = "gameViewport"; // give the canvas an ID for easy CSS/JS targeting

  // Get and store the canvas context as a global
  this.context = this.viewport.getContext('2d');

  // Append our viewport into a container in the dom
  $container.insertBefore(this.viewport, $container.firstChild);

  // Spit out some text
  this.context.font = '32px Arial';
  this.context.fillStyle = '#fff';
  this.context.fillText('It\'s dangerous to travel this route alone.', 5, 50);

  return this;
}

// Instantiate a new game in the global scope at 800px by 600px
window.game = new Game(800, 600);

module.exports = game;

function Game(w, h, targetFps, showFps) {
    // Setup some constants
    this.constants = {
        width: w,
        height: h,
        targetFps: targetFps,
        showFps: showFps
    };

    // Instantiate an empty state object
    this.state = {};
    
    that = this;

var createPlayer = function createPlayer() {
    // Set the state.entities prop to an empty object if it does not exist
    that.state.entities = that.state.entities || {};
    // Instantiate a player as an active entity
    that.state.entities.player = new playerEnt(
        that,
        that.constants.width / 2,
        that.constants.height - 100
    );
}();

    $container.insertBefore(this.viewport, $container.firstChild);

    // Instantiate core modules with the current scope
    this.update = gameUpdate( this );
    this.render = gameRender( this );
    this.loop = gameLoop( this );

    return this;
}

// Instantiate a new game in the global scope at 800px by 600px
window.game = new Game(800, 600, 60, true);