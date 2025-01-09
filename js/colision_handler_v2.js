AFRAME.registerComponent('collision-handler', {

  init: function () {
      this.bindMethods();
      //Aqui seleccionamos los botones segun id
      this.boxButtonEl = document.querySelector('#boxButton');

      //Añadimos evento de click al boton
      this.boxButtonEl.addEventListener('click', this.onClick);
      //Si queremos que el boton empiece presionado o no 
      //this.boxButtonEl.addState('pressed');
  },

  bindMethods: function () {
      this.onClick = this.onClick.bind(this);
  },

  onClick: function (evt) {
      var targetEl = evt.target;
      if (targetEl === this.boxButtonEl ) {
        this.boxButtonEl.removeState('pressed');
        let newSquare = document.createElement('a-box');//Creamos cuadrado
        newSquare.setAttribute('position', '0 0 0');
        newSquare.setAttribute('color', 'purple');
        newSquare.setAttribute('width', '1');
        newSquare.setAttribute('height', '1');
        newSquare.setAttribute('depth', '1');
        document.querySelector('a-scene').appendChild(newSquare);
      }
  }
  });
