AFRAME.registerComponent('room-resizer', {
    schema: {
      altura: {type: 'number', default: 3},
      ancho: {type: 'number', default: 10},
      largo: {type: 'number', default: 10}
    },
    init: function () {
      this.ajustarDimensiones();
    },
    ajustarDimensiones: function () {
      var data = this.data;
      var medio_ancho = data.ancho / 2;
      var medio_largo = data.largo / 2;
      var medio_altura = data.altura / 2;

      // Paredes
      this.el.querySelector('#wall1').setAttribute('geometry', `width: ${data.ancho}; height: ${data.altura}; depth: 0.1`);
      this.el.querySelector('#wall2').setAttribute('geometry', `width: ${data.ancho}; height: ${data.altura}; depth: 0.1`);
      this.el.querySelector('#wall3').setAttribute('geometry', `width: 0.1; height: ${data.altura}; depth: ${data.largo}`);
      this.el.querySelector('#wall4').setAttribute('geometry', `width: 0.1; height: ${data.altura}; depth: ${data.largo}`);

      // Posiciones de las paredes
      this.el.querySelector('#wall1').setAttribute('position', `0 ${medio_altura} ${-medio_largo}`);
      this.el.querySelector('#wall2').setAttribute('position', `0 ${medio_altura} ${medio_largo}`);
      this.el.querySelector('#wall3').setAttribute('position', `${-medio_ancho} ${medio_altura} 0`);
      this.el.querySelector('#wall4').setAttribute('position', `${medio_ancho} ${medio_altura} 0`);

      // Techo
      this.el.querySelector('#roof').setAttribute('geometry', `width: ${data.ancho}; height: 0.1; depth: ${data.largo}`);
      this.el.querySelector('#roof').setAttribute('position', `0 ${data.altura} 0`);
    }
  });

