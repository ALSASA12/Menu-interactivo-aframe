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
    this.boxButton1El = document.querySelector('#boxButton1');
    this.boxButton2El = document.querySelector('#boxButton2');
    this.boxButton3El = document.querySelector('#boxButton3');
    this.boxButton4El = document.querySelector('#boxButton4');
    this.leftArrowEl = document.querySelector('#leftArrow');
    this.rightArrowEl = document.querySelector('#rightArrow');
  },

  addInitialEventListeners: function () {
    this.boxButton1El.addEventListener('pinchedstarted', this.onPinch);
    this.boxButton2El.addEventListener('pinchedstarted', this.onPinch);
    this.boxButton3El.addEventListener('pinchedstarted', this.onPinch);
    this.boxButton4El.addEventListener('pinchedstarted', this.onPinch);
    this.leftArrowEl.addEventListener('pinchedstarted', this.onPinch);
    this.rightArrowEl.addEventListener('pinchedstarted', this.onPinch);
  },

  initializeStates: function () {
    this.boxButton1El.addState(String(1));
    this.boxButton2El.addState(String(1));
    this.boxButton3El.addState(String(1));
    this.boxButton4El.addState(String(1));
  },
  
  onPinch: function (evt) {
    var targetEl = evt.target;
    //Botones acciones
    if (targetEl === this.boxButton1El) {//Boton 1
      if (targetEl.is('1')) {
        this.spawnBox();
      } else if (targetEl.is('2')) {
          // Acción para boxButton1El en estado 2 (Cambio de ancho +)
      }
    } else if (targetEl === this.boxButton2El) { //Boton 2
      if (targetEl.is('1')) {
          this.spawnSphere()
      } else if (targetEl.is('2')) {
          // Acción para boxButton2El en estado 2 (Cambio de largo +)
      }
    } else if (targetEl === this.boxButton3El) {//Boton 3
      if (targetEl.is('1')) {
        this.spawnBed()
      } else if (targetEl.is('2')) {
          // Acción para boxButton3El en estado 2 (Cambio de ancho -)
      }
    } else if (targetEl === this.boxButton4El) {//Boton 4
      if (targetEl.is('1')) {
          // Rellenar con alguna 
      } else if (targetEl.is('2')) {
          // Acción para boxButton4El en estado 2 (Cambio de largo +)
      }
    } else if (targetEl==this.leftArrowEl) { //Flecha izquierda
      this.cambiarEstado("left");
    } else if (targetEl==this.rightArrowEl) { //Flecha derecha
      this.cambiarEstado("right");    
    }
  },
  spawnBox: function () {
    let newSquare = document.createElement('a-box');
    let scene = document.querySelector('a-scene');

    newSquare.setAttribute('position', '1 0 -2');
    newSquare.setAttribute('color', 'purple');
    newSquare.setAttribute('width', '1');
    newSquare.setAttribute('height', '1');
    newSquare.setAttribute('depth', '1');
    scene.appendChild(newSquare); 
  },

  spawnSphere: function () {
    let newSphere = document.createElement('a-sphere'); 
    let scene = document.querySelector('a-scene');

    newSphere.setAttribute('position', '-1 0 -2');
    newSphere.setAttribute('color', 'purple');
    newSphere.setAttribute('radius', '1');
    scene.appendChild(newSphere); 
  },
  spawnBed: function(){
    let scene = document.querySelector('a-scene');

    // Checkeamos si hay assets previos
    let assets = document.querySelector('a-assets');
    if (!assets) {
        assets = document.createElement('a-assets');
        scene.appendChild(assets);
    }

    // Creamos el <a-asset-item> para guardar info .obj y .mtl
    let modeloCama = document.createElement('a-asset-item');
    modeloCama.setAttribute('id', 'modeloCama_1');
    modeloCama.setAttribute('src', 'assets/models/cama_dibujo_animado.obj');

    let materialCama = document.createElement('a-asset-item');
    materialCama.setAttribute('id', 'materialCama_1');
    materialCama.setAttribute('src', 'assets/models/cama_dibujo_animado.mtl');

    assets.appendChild(modeloCama);
    assets.appendChild(materialCama);

    let entity = document.createElement('a-entity');
    entity.setAttribute('obj-model', 'obj: #modeloCama_1; mtl: #materialCama_1');
    entity.setAttribute('position', '0 0 -3');
    entity.setAttribute('scale', '1.5 1.5 1.5');
    entity.setAttribute('rotation', '0 0 0');

    scene.appendChild(entity);
  },
  cambiarEstado: function (direccion) {
    var estados = Array.from(this.boxButton1El.states);
    var estado_actual;
    var posible_states = ['1', '2'];
    
    for (var i = 0; i < posible_states.length; i++) {
        if (estados.includes(posible_states[i])) {
            estado_actual = posible_states[i];
            break;
        }
    }

    this.boxButton1El.removeState(estado_actual);
    estado_actual = parseInt(estado_actual);

    if (direccion === "left") {
        estado_actual = (estado_actual - 1 + posible_states.length) % posible_states.length;
    } else if (direccion === "right") {
        estado_actual = (estado_actual + 1 + posible_states.length) % posible_states.length;
    }

    this.boxButton1El.addState(String(estado_actual));
    this.boxButton2El.addState(String(estado_actual));
    this.boxButton3El.addState(String(estado_actual));
    this.boxButton4El.addState(String(estado_actual));
}
});
