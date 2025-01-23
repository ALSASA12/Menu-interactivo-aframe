/* global AFRAME */
AFRAME.registerComponent('event-manager', {

  init: function () {
    this.bindMethods();
    this.initializeElements();
    this.addInitialEventListeners();
    this.initializeStates();
  },

  bindMethods: function () {
    this.onPinch = this.onPinch.bind(this);
  },

  initializeElements: function () {
    this.boxButtonEl = document.querySelector('#boxButton');
    this.leftArrowEl = document.querySelector('#leftArrow');
    this.rightArrowEl = document.querySelector('#rightArrow');
  },

  addInitialEventListeners: function () {
    this.boxButtonEl.addEventListener('pinchedstarted', this.onPinch);
    this.leftArrowEl.addEventListener('pinchedstarted', this.onPinch);
    this.rightArrowEl.addEventListener('pinchedstarted', this.onPinch);
  },

  initializeStates: function () {
    this.boxButtonEl.addState(String(2));
  },
  
  onPinch: function (evt) {
    var targetEl = evt.target;
    var posible_states = ['1', '2'];
      if (targetEl === this.boxButtonEl ) {
        //targetEl.addState('pressed');
        //this.boxButtonEl.removeState('pressed');
        if (targetEl.is('1')) {
          let newSquare = document.createElement('a-box'); // Creamos un cuadrado
          newSquare.setAttribute('position', '1 0 -2');
          newSquare.setAttribute('color', 'purple');
          newSquare.setAttribute('width', '1');
          newSquare.setAttribute('height', '1');
          newSquare.setAttribute('depth', '1');
          document.querySelector('a-scene').appendChild(newSquare); // Lo unimos a la etiqueta de la escena
        } else if (targetEl.is('2')) {
          let newSphere = document.createElement('a-sphere'); // Creamos una esfera
          newSphere.setAttribute('position', '-1 0 -2');
          newSphere.setAttribute('color', 'purple');
          newSphere.setAttribute('radius', '1'); // En A-Frame, usamos 'radius' en lugar de 'width', 'height', 'depth' para la esfera
          document.querySelector('a-scene').appendChild(newSphere); // Lo unimos a la etiqueta de la escena
        }
      }
      if (targetEl==this.leftArrowEl){
        var estados = Array.from(this.boxButtonEl.states);
        var estado_actual;
        
        for (var i = 0; i < posible_states.length; i++) {
          if (estados.includes(posible_states[i])) {
            estado_actual = posible_states[i];
            break;
          }
        }
        this.boxButtonEl.removeState(estado_actual);
        estado_actual = parseInt(estado_actual);
        estado_actual=(estado_actual - 1 + posible_states.length) % posible_states.length;
        this.boxButtonEl.addState(String(estado_actual))
      }
      if (targetEl==this.rightArrowEl){
        var estados = Array.from(this.boxButtonEl.states);
        var estado_actual;

        for (var i = 0; i < posible_states.length; i++) {
          if (estados.includes(posible_states[i])) {
            estado_actual = posible_states[i];
            break;
          }
        }
        this.boxButtonEl.removeState(estado_actual);
        estado_actual = parseInt(estado_actual);
        estado_actual=(estado_actual + 1 + posible_states.length) % posible_states.length;
        this.boxButtonEl.addState(String(estado_actual))
        
      }
      
  }
});
