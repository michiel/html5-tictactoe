
App = {
  canvasHeight : 0,
  canvasWidth  : 0,
  FSM : {
    state : 'boot',
    execute : function() {
      this[this.state]();
    },
    boot : function() {
      this.state = 'waiting';
    },
  }
}

$(function () {
    var canvas = $("#canvas");
    App.canvasWidth  = canvas.width();
    App.canvasHeight = canvas.height();

    var context = canvas[0].getContext("2d");
  });

