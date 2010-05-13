
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

Shape = {
  Circle : function(ctxt, x, y, radius, linewidth, color) {
    ctxt.strokeStyle = color;
    ctxt.lineWidth = linewidth || 1;
    ctxt.beginPath();
    ctxt.arc(x, y, radius, 0, 360, false);
    ctxt.stroke();
    ctxt.closePath();
  },

  Square : function(ctxt, x, y, size, color) {
    ctxt.fillStyle = color;
    ctxt.fillRect(x, y, x+size, y+size);
  },

  Line : function(ctxt, x1, y1, x2, y2, linewidth, color) {
    ctxt.strokeStyle = color || Color.red;
    ctxt.lineWidth   = linewidth || 1;
    ctxt.beginPath();
    ctxt.moveTo(x1, y1);
    ctxt.lineTo(x2, y2);
    ctxt.stroke();
    ctxt.closePath();
  },

  Cross : function(ctxt, x1, y1, x2, y2, linewidth, color) {
    var line1 = Shape.Line(ctxt, x1, y1, x2, y2, linewidth, color);
    var line2 = Shape.Line(ctxt, x2, y1, x1, y2, linewidth, color);
  }

}

Color = {
  black : '#000',
  white : '#fff',
  red   : '#f00'
}

Tile = function(ctxt, x, y, size, color) {
  var props = {
    x     : x,
    y     : y,
    size  : size  || 100,
    color : color || Color.white
  }
  var mark = null;

  this.markX = function() {
    mark = Shape.Cross(ctxt, x, y, (x+size), (y+size), 4, Color.red); 
  }

  this.markO = function() {
    var half = size / 2;
    mark = Shape.Circle(ctxt, (x+half), (y+half), (half - (half/4)) , 4, Color.red); 
  }

  var shape = Shape.Square(ctxt, props.x, props.y, props.size, props.color)

}

Game = function(ctxt, app) {
  var size = tilesize;
  var board = [];
  var getColor = function(x, y) {
    return ((x + y) % 2) ? Color.black : Color.white;
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

