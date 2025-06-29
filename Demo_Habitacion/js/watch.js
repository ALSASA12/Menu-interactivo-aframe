AFRAME.registerComponent('watch', {
    init: function () {
      var watch = document.createElement('a-entity');
      this.onPressStart = this.onPressStart.bind(this);
      // Establecer atributos para el hijo
      watch.setAttribute('geometry', 'primitive: box; width: 0.2; height: 0.05; depth: 0.02'); // Ahora es visible
      watch.setAttribute('material', 'color: black'); // Se agrega color
      watch.setAttribute('position', '0 0.1 -0.1'); // Lo movemos un poco más arriba y adelante para que sea visible
      watch.setAttribute('id', 'watch');
      watch.setAttribute('pinchable', '');

      watch.addEventListener('pinchedstarted', this.onPressStart);
      watch.addState('1')
      
      this.el.appendChild(watch);
    },
    onPressStart:function (evt) {
      var targetEl = evt.target;
      var watch=document.querySelector('#watch');
      var menuEl = document.querySelector('#menu');
      if (targetEl==watch){
        if (targetEl.is('1')){
          menuEl.setAttribute('position', '0 -20 0');
          //Ponemos el estado contrario
          watch.removeState('1')
          watch.addState('2')
        } else if (targetEl.is('2')) {
          menuEl.setAttribute('position', '0 1.5 -0.4');
          //Ponemos el estado contrario
          watch.removeState('2')
          watch.addState('1')
        };
      }
    },

  });