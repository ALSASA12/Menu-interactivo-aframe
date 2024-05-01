AFRAME.registerComponent('select-bar', {
  init: function () {
    var el = this.el; // id=menu
    var option1Text = document.querySelector('#Option 1'); // Opcion 1
    var option2Text = document.querySelector('#Option 2'); // Opcion 2

    function seleccionarOpcion(texto, nuevoColor) {
      if (texto.getAttribute('color') !== nuevoColor) {
        texto.setAttribute('color', nuevoColor);
        console.log('Texto de opción cambió de color');
      }
    }

    option1Text.addEventListener('raycaster-intersected', function () {//El puntero alcanza la opcion 1
      seleccionarOpcion(option1Text, '#00ff00'); 
    });

    option2Text.addEventListener('raycaster-intersected', function () {//El puntero alcanza la opcion 2
      seleccionarOpcion(option2Text, '#00ff00'); 
    });

    option1Text.addEventListener('raycaster-intersected-cleared', function () {//el puntero deja de aputnar a la opcion 1
      seleccionarOpcion(option1Text, '#000000'); // Restaurar color original al dejar de intersectar
    });

    option2Text.addEventListener('raycaster-intersected-cleared', function () {//El puntero deja de apuntar a la opcion 2
      seleccionarOpcion(option2Text, '#000000'); 
    });

    option1Text.addEventListener('triggerdown', function () {
      seleccionarOpcion(option1Text, '#FF0000')
    });
  }
});

  