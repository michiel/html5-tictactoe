
//
// XXX : magic number 
//

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
  red   : '#f00',
  green : '#0f0',
  blue  : '#00f'
}

Tile = function(ctxt, x, y, size, color) {
  var props = {
    x     : x,
    y     : y,
    size  : size  || 100,
    color : color || Color.white
  }
  var mark      = null;
  var markValue = null;

  this.markX = function() {
    mark = Shape.Cross(ctxt, x, y, (x+size), (y+size), 4, Color.red); 
    markValue = 'X';
  }

  this.markO = function() {
    var half = size / 2;
    mark = Shape.Circle(ctxt, (x+half), (y+half), (half - (half/4)) , 4, Color.red); 
    markValue = 'O';
  }

  this.marked = function() {
    return markValue != null;
  }

  this.markedWith = function() {
    return markValue;
  }

  var shape = Shape.Square(ctxt, props.x, props.y, props.size, props.color)

}

Tictactoe = function(ctxt, app) {
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

  var freeTiles = function() {
    var tiles = [];
    for (var x=0; x<3;x++){
      for (var y=0; y<3; y++) {
        if (!board[x][y].marked()) {
          tiles.push([x,y]);
        }
      }
    }
    return tiles;
  }

  var eachtile = function(func) {
    var results = [];
    for (var x=0; x<3;x++){
      for (var y=0; y<3; y++) {
        results.push([x, y, func(board[x][y])]);
      }
    }
    return results;
  }

  this.eachTile = function(func) {
    return eachtile(func);
  }

  var mark = 'X';
  var tiles = freeTiles();
  while (tiles.length != 0) {
    var randomTile = tiles[(Math.floor(Math.random() * tiles.length))];
    board[randomTile[0]][randomTile[1]]['mark' + mark]();
    tiles = freeTiles();
    mark = (mark == 'X') ? 'O' : 'X';
  }

  var checkWin = function(arr) {
    for (var positions, i=0; positions=arr[i]; i++) {
      var owner, mark, x, y = null;
      for (var j=0; position = positions[j]; j++) {
        y = position[0];
        x = position[1];
        mark = board[x][y].markedWith();
        if (owner == null) {
          owner = mark; // 0
        } else {
          if (owner == mark) {
            // We're good, continue
          } else {
            // Not a winning combo, move on
            break;
          }
        }
      }
      if (owner == mark) {
        return owner;
      }
    }
    return false;
  }

  var winner = checkWin([

    //
    // Check horizontal values
    //


    [[0,0], [0,1], [0,2]],
    [[1,0], [1,1], [1,2]],
    [[2,0], [2,1], [2,2]],

    //
    // Check vertical values
    //

    [[0,0], [1,0], [2,0]],
    [[0,1], [1,1], [2,1]],
    [[0,2], [1,2], [2,2]],

    //
    // Check diagonal values
    //

    [[0,0], [1,1], [2,2]],
    [[2,0], [1,1], [0,2]]

    ]);

  if (winner) {
    alert("Winner is " + winner);
  }
}

$(function () {
    var canvas = $("#canvas");
    var app = new App();
    app.canvasWidth  = canvas.width();
    app.canvasHeight = canvas.height();

    var ctxt = canvas[0].getContext("2d");
    var game = new Tictactoe(ctxt, app);

  });

