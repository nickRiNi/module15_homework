const wsUri = "wss://ws.ifelse.io/";
const btnSend = document.querySelector('.chat__send');
const btnGeo = document.querySelector('.chat__geo');
const chatMessages = document.querySelector('.chat__messages');

var websocket = new WebSocket(wsUri);

websocket.onmessage = function(evt) {
  if (!evt.data.includes('Request served by') && !evt.data.includes('GeoServerSend')) {
    writeToScreen(evt.data, "server");
  }
};

websocket.onclose = function(evt) {
  websocket = new WebSocket(wsUri);
  console.log("DISCONNECTED");
};

websocket.onopen = function(evt) {
  console.log("CONNECTED");
};

//Функция отрисовки сообщения 
function writeToScreen(message, subj) {
  var mes;
  if (subj === "client") {
    mes = `<div class="msg client__msg"><p class="msg__text">${message}</p></div>`;
  } else {
    mes = `<div class="msg server__msg"><p class="msg__text">${message}</p></div>`;
  }
  chatMessages.innerHTML = mes + chatMessages.innerHTML;
}

//Кнопка отправки сообщения
btnSend.addEventListener('click', () => {
  const inp = document.querySelector('.chat__input');
  const message = inp.value;
  if (message.length === 0) {
    return;
  }
  writeToScreen(message, "client");
  inp.value = '';
  inp.focus();
  websocket.send(message);
});

//Кнопка отправки геопозиции
btnGeo.addEventListener('click', () => {
  if (!navigator.geolocation) {
    writeToScreen("Отправка геопозиции не разрешена", "client");
  } else {
    navigator.geolocation.getCurrentPosition(geoPositionSuccess, geoPositionError);
  }
  document.querySelector('.chat__input').focus();
});


// Функция, срабатывающая при ошибке получении геолокации
const geoPositionError = () => {
  writeToScreen("Отправка геопозиции не разрешена", "client");
  console.log("Отправка геопозиции не разрешена");
}

// Функция, срабатывающая при успешном получении геолокации
const geoPositionSuccess = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  var message = `GeoServerSend Широта: ${latitude} °, Долгота: ${longitude} °`;
  var mes = `<div class="msg client__msg"><a class="msg__text" target="_blank" href="https://www.openstreetmap.org/#map=18/${latitude}/${longitude}">Geoposition</a></div>`;
  
  websocket.send(message);
  chatMessages.innerHTML = mes + chatMessages.innerHTML;
}

