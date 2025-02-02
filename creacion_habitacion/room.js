AFRAME.registerComponent('room-resizer', {
    schema: {
      altura: {type: 'number', default: 3},
      ancho: {type: 'number', default: 10},
      largo: {type: 'number', default: 10}
    },
    initializeElements: function () {
      this.wall1El = document.querySelector('#wall1');
      this.wall2El = document.querySelector('#wall2');
      this.wall3El = document.querySelector('#wall3');
      this.wall4El = document.querySelector('#wall4');
      this.roofEl = document.querySelector('#roof');
    },


    ajustarDimensiones: function () {
      var data = this.data;
      var medio_ancho = data.ancho / 2;
      var medio_largo = data.largo / 2;
      var medio_altura = data.altura / 2;

      // Paredes
      this.wall1El.setAttribute('geometry', `width: ${data.ancho}; height: ${data.altura}; depth: 0.1`);
      this.wall2El.setAttribute('geometry', `width: ${data.ancho}; height: ${data.altura}; depth: 0.1`);
      this.wall3El.setAttribute('geometry', `width: 0.1; height: ${data.altura}; depth: ${data.largo}`);
      this.wall4El.setAttribute('geometry', `width: 0.1; height: ${data.altura}; depth: ${data.largo}`);

      // Posiciones de las paredes
      this.wall1El.setAttribute('position', `0 ${medio_altura} ${-medio_largo}`);
      this.wall2El.setAttribute('position', `0 ${medio_altura} ${medio_largo}`);
      this.wall3El.setAttribute('position', `${-medio_ancho} ${medio_altura} 0`);
      this.wall4El.setAttribute('position', `${medio_ancho} ${medio_altura} 0`);

      // Techo
      this.roofEl.setAttribute('geometry', `width: ${data.ancho}; height: 0.1; depth: ${data.largo}`);
      this.roofEl.setAttribute('position', `0 ${data.altura} 0`);
    },

    cambiar_altura:function(evt){
      if (origen === 'box_1') {
        this.data.altura += 1; // Aumenta la altura
      } else if (origen === 'box_2') {
        this.data.altura -= 1; // Disminuye la altura
      }
      this.ajustarDimensiones();

    }
  });

