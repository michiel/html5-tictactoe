
tilesize = 100;

App = function() {
  this.canvasHeight = 0;
  this.canvasWidth  = 0;
  this.FSM = {
    state : 'boot',
    execute : function() {
      this[this.state]();
    },
    boot : function() {
      this.state = 'waiting';
    },
  }
}

Tile = function(ctxt, x, y, size, color) {
  var props = {
    x     : x,
    y     : y,
    size  : size || 100,
    color : color || '#000'
  }

  this.markX = function() {
  }

  this.markO = function() {
  }

  ctxt.fillStyle = props.color;
  ctxt.fillRect(x, y, x+size, y+size);

}

Game = function(ctxt, app) {
  var size = tilesize;
  var board = [];
  var getColor = function(x, y) {
    return ((x + y) % 2) ? '#000' : '#fff';
  }
  for (var x=0; x<3;x++){
    board[x] = [];
    for (var y=0; y<3; y++) {
      board[x][y] = new Tile(ctxt, x*size, y*size, size, getColor(x, y))
    }
  }
}

$(function () {
    var canvas = $("#canvas");
    var app = new App();
    app.canvasWidth  = canvas.width();
    app.canvasHeight = canvas.height();

    var ctxt = canvas[0].getContext("2d");
    var game = new Game(ctxt, app);

  });
