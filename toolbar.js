document.querySelector('a-scene').addEventListener('loaded', function () {
    var leftHand = document.querySelector('#leftController');
    var select_bar = document.querySelector('#select-bar');

    document.querySelector('#Option 1').addEventListener('click', function () {
        var newSquare = document.createElement('a-box');//Creamos cuadrado
        var camera = document.querySelector('#camara');
        var cameraPosition = camera.getAttribute('position');

        newSquare.setAttribute('color', 'purple');//caracteristicas del cuadrado
        newSquare.setAttribute('width', '0.1');
        newSquare.setAttribute('height', '0.1');
        newSquare.setAttribute('depth', '0.1');

        newSquare.setAttribute('position', cameraPosition.x + ' ' + cameraPosition.y + ' ' + (cameraPosition.z - 1));//ubicacion de spawneo
        document.querySelector('a-scene').appendChild(newSquare);//spawnear cuadrado
    });

    // Actualizar la posición de la barra de herramientas para que esté en la mano derecha¿duda?
    leftHand.addEventListener('loaded', function () {
        var handPosition = new THREE.Vector3();
        leftHandHand.object3D.getWorldPosition(handPosition);
        select_bar.object3D.position.copy(handPosition);
    });

    // Actualizar continuamente la posición de la barra de herramientas
    leftHand.addEventListener('componentchanged', function (evt) {
        if (evt.detail.name === 'position') {
            var handPosition = new THREE.Vector3();
            rightHand.object3D.getWorldPosition(handPosition);
            select_bar.object3D.position.copy(handPosition);
        }
    });
});