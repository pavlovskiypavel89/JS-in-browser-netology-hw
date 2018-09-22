'use strict';
const draw = document.getElementById('draw');
const ctx = draw.getContext('2d');

function refreshCanvas() {
  draw.width = window.innerWidth;
  draw.height =  window.innerHeight;
  ctx.clearRect(0, 0, draw.width, draw.height); 
}

function initDrawSettings() {
  const leftMouseBtnCode = 2 ** 0,
        drawSettings = {
          minHue: 0,
          maxHue: 359,
          saturation: 1,
          lightness: 0.5,
          maxThickness: 100,
          minThickness: 5
        };
  drawSettings.hue = drawSettings.minHue;
  drawSettings.thickness = drawSettings.maxThickness;
  drawSettings.isIncreaseThick = false;
  drawSettings.isDrawing = false;
  
  function isMouseBtnPressed(btnCode, pressed) {
    return (pressed & btnCode) === btnCode;
  }

  function changeHue() {
    if (event.shiftKey) {
      drawSettings.hue = drawSettings.hue > drawSettings.minHue ? (--drawSettings.hue) : drawSettings.maxHue;
    } else {
      drawSettings.hue = drawSettings.hue < drawSettings.maxHue ? (++drawSettings.hue) : drawSettings.minHue; 
    }
  }
  
  function changeThickness() {
    if (drawSettings.isIncreaseThick) {
      ++drawSettings.thickness;
      drawSettings.isIncreaseThick = drawSettings.thickness < drawSettings.maxThickness ? true : false;
    } else {
      --drawSettings.thickness;
      drawSettings.isIncreaseThick = drawSettings.thickness > drawSettings.minThickness ? false : true;
    }
  }
  
  function drawLine(context, point) {
      context.beginPath();
      context.lineJoin = 'round';
      context.lineCap = 'round';
      context.lineWidth = drawSettings.thickness;
      context.strokeStyle = `hsl(${drawSettings.hue}, ${drawSettings.saturation * 100}%, ${drawSettings.lightness * 100}%)`;
      context.moveTo(...point);
      context.lineTo(...point);
      context.stroke();
      context.closePath();
    }

  function drawOn(context) {
    if (isMouseBtnPressed(leftMouseBtnCode, event.buttons) && drawSettings.isDrawing) {
      drawLine(context, [event.offsetX, event.offsetY]);
      changeThickness();
      changeHue();
    }
  }
  
  draw.addEventListener('mousedown', event => {
    drawSettings.isDrawing = true;
    drawOn(ctx);
  });
  draw.addEventListener('mousemove', event => drawOn(ctx));
  draw.addEventListener('mouseleave', () => drawSettings.isDrawing = false);
  draw.addEventListener('dblclick', () => refreshCanvas());
  window.addEventListener('resize', () => refreshCanvas());
}

document.addEventListener('DOMContentLoaded', () => {
  refreshCanvas();
  initDrawSettings();
});
