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
        }
  let hue = 0,
      thickness = 100,
      isIncreaseThick = false,
      isDrawing = false;
  
  function isMouseBtnPressed(btnCode, pressed) {
    return (pressed & btnCode) === btnCode;
  }

  function changeHue() {
    if (event.shiftKey) {
      hue = hue > drawSettings.minHue ? (--hue) : drawSettings.maxHue;
    } else {
      hue = hue < drawSettings.maxHue ? (++hue) : drawSettings.minHue; 
    }
  }
  
  function changeThickness() {
    if (isIncreaseThick) {
      ++thickness;
      isIncreaseThick = thickness < drawSettings.maxThickness ? true : false;
    } else {
      --thickness;
      isIncreaseThick = thickness > drawSettings.minThickness ? false : true;
    }
  }

  function leftBtnPress() {
    if (isMouseBtnPressed(leftMouseBtnCode, event.buttons)) {
      changeHue();
      changeThickness();
    }
  }

  function drawOn(context) {
    const coords = [event.clientX, event.clientY],
          radius = thickness / 2;
    
    function drawCircle() {
      context.beginPath();
      context.lineJoin = 'round';
      context.lineCap = 'round';
      context.fillStyle = `hsl(${hue}, ${drawSettings.saturation * 100}%, ${drawSettings.lightness * 100}%)`;
      context.arc(...coords, radius, 0, 2 * Math.PI);
      context.fill();
      context.closePath();
    }
     
    if (isMouseBtnPressed(leftMouseBtnCode, event.buttons) && isDrawing) {
      drawCircle(context);  
    }
  }
  
  draw.addEventListener('mousedown', event => leftBtnPress());
  draw.addEventListener('mousedown', event => {
    isDrawing = true;
    drawOn(ctx);
  });
  draw.addEventListener('mousemove', event => drawOn(ctx));
  draw.addEventListener('mouseleave', () => isDrawing = false);
  draw.addEventListener('dblclick', () => refreshCanvas());
  window.addEventListener('resize', () => refreshCanvas());
}

document.addEventListener('DOMContentLoaded', () => {
  refreshCanvas();
  initDrawSettings();
});
