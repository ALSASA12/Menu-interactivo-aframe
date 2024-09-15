let boton1 = document.getElementById('#boton1');
let boton2 = document.getElementById('#boton2');

boton1.addEventListener('pinchstarted', function () {
  let newSquare = document.createElement('a-box');//Creamos cuadrado
  let camera = document.querySelector('#camara');
  let cameraPosition = camera.getAttribute('position');

  newSquare.setAttribute('position',cameraPosition);
  newSquare.setAttribute('color', 'purple');//caracteristicas del cuadrado
  newSquare.setAttribute('width', '0.1');
  newSquare.setAttribute('height', '0.1');
  newSquare.setAttribute('depth', '0.1');

  newSquare.setAttribute('position', cameraPosition.x + ' ' + cameraPosition.y + ' ' + (cameraPosition.z - 1));//ubicacion de spawneo
  document.querySelector('a-scene').appendChild(newSquare);//spawnear cuadrado
});

boton2.addEventListener('click', function () {
  let newSquare = document.createElement('a-box');//Creamos cuadrado
  let camera = document.querySelector('#camara');
  let cameraPosition = camera.getAttribute('position');

  newSquare.setAttribute('position',cameraPosition);
  newSquare.setAttribute('color', 'purple');//caracteristicas del cuadrado
  newSquare.setAttribute('width', '0.1');
  newSquare.setAttribute('height', '0.1');
  newSquare.setAttribute('depth', '0.1');

  newSquare.setAttribute('position', cameraPosition.x + ' ' + cameraPosition.y + ' ' + (cameraPosition.z - 1));//ubicacion de spawneo
  document.querySelector('a-scene').appendChild(newSquare);//spawnear cuadrado
});
