'use strict';
const wall = document.getElementById('wall');
const ctx = wall.getContext('2d');
wall.width =  window.innerWidth;
wall.height =  window.innerHeight;

/* Центр объекта перемещается функцией времени, при этом для каждого объекта необходимо выбрать случайным образом одну из двух 
предоставленных функций. Функция времени выбирается при создании  объекта и не должна меняться в дальнейшем при анимации. 
При этом вычислять текущее положение каждого объекта необходимо от его изначального положения, а не от измененного в предыдущий тик, 
так как формула расчета положения задаёт колебания вокруг базовой точки, координаты которой будут первично сгенерированы при создании объекта.*/
const timeFuncs = [
       function nextPoint(x, y, time) {
         return {
           x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
           y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
         };
       },
       function nextPoint(x, y, time) {
         return {
           x: x + Math.sin((x + (time / 10)) / 100) * 5,
           y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
         }
       }
     ];

function inRad(ang) {
	return ang * Math.PI / 180;
}

function getRandom(min, max) {
  return Number((min + (max - min) * Math.random()).toFixed(2)); 
}

// У всех объектов должен быть определен относительный размер size, случайное число от 0.1 до 0.6 единиц, который влияет на другие параметры объекта. 
// Все объекты имеют белую обводку. Толщина обводки равна 5 * size.
// Радиус круга равен 12 * size. Окружность закрашивать не нужно.
// Сторона крестика равна 20 * size. 
function getStartSettings(type) {
  const randomTimeFunc = timeFuncs[Math.round(Math.random())];
  const randomSize = getRandom(0.1, 0.6); 
  const strokeThickness = 5 * randomSize;
  const randomX = getRandom(0, wall.width);
  const randomY = getRandom(0, wall.height); 
  let snippetName, snippetValue;
  if (type === 'cross') {
    snippetName = 'side';
    snippetValue = 20 * randomSize;
  } else if (type === 'circle') {
    snippetName = 'radius';
    snippetValue = 12 * randomSize; 
  }
  
  return {
    center: [randomX, randomY],
    [snippetName]: snippetValue,
    thickness: strokeThickness,
    timeFunc: randomTimeFunc
  };
}

function drawCross(x, y, side, angle, strokeThickness) {
  ctx.save();
  ctx.translate(x , y);
  ctx.rotate(inRad(angle));
  ctx.translate(-x , -y);
  ctx.beginPath();
  ctx.lineWidth = strokeThickness;
  ctx.strokeStyle = 'white';
  ctx.moveTo(x - side / 2, y);
  ctx.lineTo(x + side / 2, y);
  ctx.moveTo(x, y - side / 2);
  ctx.lineTo(x, y + side / 2);
  ctx.stroke();
  ctx.restore();
  ctx.closePath();
}

// У крестика необходимо определить угол поворота от 0 до 360 градусов. 
function createCross() {
  const settings = getStartSettings('cross'); 
  settings.angle = getRandom(0, 360);
  drawCross(...settings.center, settings.side, settings.angle, settings.strokeThickness);
  return settings;
}

function drawCircle(x, y, radius, strokeThickness) {
  ctx.beginPath();
  ctx.lineWidth = strokeThickness;
  ctx.strokeStyle = 'white';
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();
}

function createCircle() {
  const settings = getStartSettings('circle');
  drawCircle(...settings.center, settings.radius, settings.strokeThickness);
  return settings;
}

// Фон должен перерисовываться со скоростью 20 кадров в секунду.
// Задаем FPS, функцию и временную метку начала отрисовки:
const fps = 20,
      animateInterval = 1000 / fps;
let timeStamp = Date.now();

function renderAnimate() {
  ctx.clearRect(0, 0, wall.width, wall.height); 
  
  circles.forEach(({ center, radius, thickness, timeFunc }) => {
    const { x, y } = timeFunc(...center, timeStamp);
    drawCircle(x, y, radius, thickness);
  });
  
  // Крестик должен медленно поворачиваться со случайной скоростью в диапазоне -0.2 до 0.2 на тик (один этап перерисовки). 
  crosses.forEach(cross => { 
    const { center, side, thickness, timeFunc, angle } = cross;
    const { x, y } = timeFunc(...center, timeStamp);
    const turnSpeed = getRandom(1.2, 2.2); // У меня сейчас в диапазоне от 1.2 до 2.2, иначе нет плавного вращения по оси.
    cross.angle += turnSpeed;
    if (cross.angle > 360) {
      cross.angle -= 360;
    } else if (cross.angle < 0) {
      cross.angle += 360;
    }
    drawCross(x, y, side, cross.angle, thickness);
  });
  
  timeStamp += animateInterval;
}

//Создаем крестики и нолики, запускаем рэндеринг анимации с интервалом в 20FPS: 
const crosses = [],
      circles = [];
//Для анимации необходимо создать случайное количество объектов в диапазоне от 50 до 200. При этом количество крестиков и кружочков должно быть равным.
for (let i = 1; i <= Math.round(getRandom(50, 200)); i++) {
  crosses.push(createCross());
  circles.push(createCircle());
}
setInterval(renderAnimate, animateInterval);
