// // /js/game.js
// var $container = document.getElementById('container');

// // Create base game class
// function Game() {
//     this.viewport = document.createElement('canvas');
//     this.context = viewport.getContext('2d');

//     this.viewport.width = 800;
//     this.viewport.height = 600;

//     // Append the canvas node to our container
//     $container.insertBefore(this.viewport, $container.firstChild);

//     // Toss some text into our canvas
//     this.context.font = '32px Arial';
//     this.context.fillText('It\'s dangerous to travel this route alone.', 5, 50, 800);

//     return this;
// }

// // Instantiate the game in a global
// window.game = new Game();

// // Export the game as a module
// module.exports = game;

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