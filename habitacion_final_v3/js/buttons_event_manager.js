/* global AFRAME */
AFRAME.registerComponent('event-manager', {

  init: function () {
    this.bindMethods();
    document.addEventListener('DOMContentLoaded', () => {
      this.initializeElements();
      this.addInitialEventListeners();
    });
  },
  bindMethods: function () {
    this.onPressStart = this.onPressStart.bind(this);
  },

  initializeElements: function () {
      this.boxButton1El = document.querySelector('#boxButton1');
      this.boxButton2El = document.querySelector('#boxButton2');
      this.boxButton3El = document.querySelector('#boxButton3');
      this.boxButton4El = document.querySelector('#boxButton4');
  },

  addInitialEventListeners: function () {
    this.boxButton1El.addEventListener('pinchedstarted', this.onPressStart);
    this.boxButton2El.addEventListener('pinchedstarted', this.onPressStart);
    this.boxButton3El.addEventListener('pinchedstarted', this.onPressStart);
    this.boxButton4El.addEventListener('pinchedstarted', this.onPressStart);
  },

  //Funcion que se encarga de realizar el evento
  onPressStart:function (evt) {
    var targetEl = evt.target;
    //Botones acciones
    if (targetEl === this.boxButton1El) {//Boton 1
      if (targetEl.is('1')) {
        this.spawnBox();

      } else if (targetEl.is('2')) {
          // Acción para boxButton1El en estado 2 (
      }
    } else if (targetEl === this.boxButton2El) { //Boton 2
      if (targetEl.is('1')) {
          this.spawnSphere()

      } else if (targetEl.is('2')) {
          // Acción para boxButton2El en estado 2
      }
    } else if (targetEl === this.boxButton3El) {//Boton 3
      if (targetEl.is('1')) {
        this.spawnBed()

      } else if (targetEl.is('2')) {
          // Acción para boxButton3El en estado 2
      }
    } else if (targetEl === this.boxButton4El) {//Boton 4
      if (targetEl.is('1')) {
        this.spawnCylinder()
      } else if (targetEl.is('2')) {
        this.spawnCone()  
        // Acción para boxButton4El en estado 2
      }
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
});
