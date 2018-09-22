const ctx = document.getElementById('chart').getContext('2d');
const realtime = new Chart(ctx).Bar({
  labels: [],
  datasets: [{
    fillColor: 'rgba(0,60,100,1)',
    strokeColor: 'black',
    data: []
  }]
}, {
  responsive: true,
  barValueSpacing: 2
});

const ws = new WebSocket('wss://neto-api.herokuapp.com/realtime');
let isFirst = true;
ws.addEventListener('message', event => {
  if (isFirst) {
    JSON.parse(event.data).reverse().forEach(({ time, online }) => realtime.addData([online], time));
    isFirst = false;
  } else {
    const { time, online } = JSON.parse(event.data);
    realtime.removeData();
    realtime.addData([online], time);
  }
});
