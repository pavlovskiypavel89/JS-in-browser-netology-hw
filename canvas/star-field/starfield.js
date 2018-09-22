'use strict';
const starfield = document.getElementById('starfield');
starfield.width = starfield.clientWidth;
starfield.height = starfield.clientHeight;

function initStarField(canvas) {
  const ctx = canvas.getContext('2d'),
        bgColor = 'black',
        bgSettings = [0, 0, canvas.width, canvas.width, bgColor],
        starsSettings = {
          colors: ['#ffffff', '#ffe9c4', '#d4fbff'],
          get lastColorsNum() {
            return this.colors.length - 1;
          },
          minAlphaValue: 0.8,
          maxAlphaValue: 1,
          minDiametr: 0,
          maxDiametr: 1.1,
          minAmnt: 200,
          maxAmnt: 400
        }

  function getRandom(min, max) {
    return Number((min + (max - min) * Math.random()).toFixed(2));
  }
  
  function drawStar(context) {
    const starColorNum = Math.round(getRandom(0, starsSettings.lastColorsNum)),
          starColor = starsSettings.colors[starColorNum],
          starOpacity = getRandom(starsSettings.minAlphaValue, starsSettings.maxAlphaValue),
          x = getRandom(0, canvas.width),
          y = getRandom(0, canvas.height),
          starCoords = [x, y],
          starRadius = getRandom(starsSettings.minDiametr, starsSettings.maxDiametr) / 2;
    
    context.beginPath();
    context.fillStyle = starColor;
    context.globalAlpha = starOpacity;
    context.arc(...starCoords, starRadius, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
    //console.log(...starCoords, starRadius, context.fillStyle, context.globalAlpha);
  }
  
  function drawBackground(context, settings) {
    context.beginPath();
    context.fillStyle = settings.pop();
    context.fillRect(...settings);
    context.closePath();
  }
  
  drawBackground(ctx, bgSettings);
  const starsAmnt = getRandom(starsSettings.minAmnt, starsSettings.maxAmnt);
  for (let i = 1; i <= starsAmnt; i++) {
    //console.log(`Звезда №${i}:`);
    drawStar(ctx);
  }
}

document.addEventListener('DOMContentLoaded', () => initStarField(starfield));
starfield.addEventListener('click', event => initStarField(event.currentTarget));
