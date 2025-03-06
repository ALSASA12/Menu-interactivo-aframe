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

  //Funcion que se encarga de realizar el evento
  onPinch:async function (evt) {
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
        this.spawnCylinder()
      } else if (targetEl.is('2')) {
        this.spawnCone()  
        // Acción para boxButton4El en estado 2 (Cambio de largo +)
      }
    } else if (targetEl === this.leftArrowEl) {
      this.cambiarEstado(-1);
    } else if (targetEl === this.rightArrowEl) {
      this.cambiarEstado(1);
    }
    // Pausar la ejecución por 1 segundo
    await sleep(1000);

    function sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

  },
  
  //Funciones para spawnear distintos objetos
  spawnBox: function () {
    let newSquare = document.createElement('a-box');
    let scene = document.querySelector('a-scene');

    newSquare.setAttribute('position', '1 0 -2');
    newSquare.setAttribute('color', 'purple');
    newSquare.setAttribute('width', '1');
    newSquare.setAttribute('height', '1');
    newSquare.setAttribute('depth', '1');
    newSquare.setAttribute('delete_on_trash_collision', '');
    scene.appendChild(newSquare); 
  },
  spawnCylinder: function () {
    let newCylinder = document.createElement('a-cylinder'); 
    let scene = document.querySelector('a-scene');

    newCylinder.setAttribute('position', '0 0 -2.5');
    newCylinder.setAttribute('color', 'blue');
    newCylinder.setAttribute('radius', '0.5');
    newCylinder.setAttribute('height', '2');
    newCylinder.setAttribute('delete_on_trash_collision', '');
    
    scene.appendChild(newCylinder); 
  },
  spawnCone: function () {
    let newCone = document.createElement('a-cone'); 
    let scene = document.querySelector('a-scene');

    newCone.setAttribute('position', '0 0 -1');
    newCone.setAttribute('color', 'orange');
    newCone.setAttribute('radius-bottom', '1');  // Base del cono
    newCone.setAttribute('height', '2');         // Altura del cono
    newCone.setAttribute('delete_on_trash_collision', '');
    
    scene.appendChild(newCone); 
},

  spawnSphere: function () {
    let newSphere = document.createElement('a-sphere'); 
    let scene = document.querySelector('a-scene');

    newSphere.setAttribute('position', '-1 0 -2');
    newSphere.setAttribute('color', 'purple');
    newSphere.setAttribute('radius', '1');
    newSphere.setAttribute('delete_on_trash_collision', '');
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
    entity.setAttribute('delete_on_trash_collision', '');
    scene.appendChild(entity);
  },

  //Funcion para el cambio de estado con las flechas de direccion
  cambiarEstado: function (direccion) {
    var posible_states = ['1', '2'];
    var estados = Array.from(this.boxButton1El.states);
    var estado_actual = posible_states.find(state => estados.includes(state)) || posible_states[0];

    //Eliminacion de estados
    this.boxButton1El.removeState(estado_actual);
    this.boxButton2El.removeState(estado_actual);
    this.boxButton3El.removeState(estado_actual);
    this.boxButton4El.removeState(estado_actual);

    let nuevo_estado = String((parseInt(estado_actual) - 1 + direccion + posible_states.length) % posible_states.length + 1);

    //Añadir nuevos estados
    this.boxButton1El.addState(nuevo_estado);
    this.boxButton2El.addState(nuevo_estado);
    this.boxButton3El.addState(nuevo_estado);
    this.boxButton4El.addState(nuevo_estado);

    //Cambiar valor del label de texto 
    this.cambiarTextoMenu(nuevo_estado)
  },
  cambiarTextoMenu: function(nuevo_estado) {
    let menu = document.querySelector('#menuLabel');
    let textAttributes = menu.getAttribute('text') || {}; // Obtener los atributos actuales

    // Modificar solo el valor sin eliminar los otros atributos
    textAttributes.value = (nuevo_estado === '1') ? 'Menu 1' : 'Menu 2';

    menu.setAttribute('text', textAttributes); // Aplicar cambios
  }

});
