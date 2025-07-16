(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{"./utils/utils.canvas.js":2}],2:[function(require,module,exports){
// /js/utils/utils.canvas.js

/** Determine the proper pixel ratio for the canvas */
getPixelRatio : function getPixelRatio(context) {
  console.log('Determining pixel ratio.');

  // I'd rather not have a giant var declaration block,
  // so I'm storing the props in an array to dynamically
  // get the backing ratio.
  var backingStores = [
    'webkitBackingStorePixelRatio',
    'mozBackingStorePixelRatio',
    'msBackingStorePixelRatio',
    'oBackingStorePixelRatio',
    'backingStorePixelRatio'
  ];

  var deviceRatio = window.devicePixelRatio;

  // Iterate through our backing store props and determine the proper backing ratio.
  var backingRatio = backingStores.reduce(function(prev, curr) {
    return (context.hasOwnProperty(curr) ? context[curr] : 1);
  });

  // Return the proper pixel ratio by dividing the device ratio by the backing ratio
  return deviceRatio / backingRatio;
}

/** Generate a canvas with the proper width / height
 * Based on: http://www.html5rocks.com/en/tutorials/canvas/hidpi/
 */
generateCanvas : function generateCanvas(w, h) {
  console.log('Generating canvas.');

  var canvas = document.createElement('canvas'),
      context = canvas.getContext('2d');
  // Pass our canvas' context to our getPixelRatio method
  var ratio = this.getPixelRatio(context);

  // Set the canvas' width then downscale via CSS
  canvas.width = Math.round(w * ratio);
  canvas.height = Math.round(h * ratio);
  canvas.style.width = w +'px';
  canvas.style.height = h +'px';
  // Scale the context so we get accurate pixel density
  context.setTransform(ratio, 0, 0, ratio, 0, 0);

  return canvas;
}
},{}]},{},[1]);
