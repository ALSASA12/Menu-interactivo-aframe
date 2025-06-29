AFRAME.registerComponent('cama_1', {
    schema: {
        menuId: { type: 'string' }
      },
    
    init: function () {
        this.onPressStart = this.onPressStart.bind(this);
        this.el.addEventListener('pressedended', this.onPressStart);
    },
    onPressStart:function (evt) {
        var targetEl = evt.target;
        if (targetEl === this.el){
            this.spawnBed()
        }
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
        modeloCama.setAttribute('src', './assets/models/cama_dibujo_animado.obj');
    
        let materialCama = document.createElement('a-asset-item');
        materialCama.setAttribute('id', 'materialCama_1');
        materialCama.setAttribute('src', './assets/models/cama_dibujo_animado.mtl');
    
        assets.appendChild(modeloCama);
        assets.appendChild(materialCama);
    

        let collider = document.createElement('a-box');
        collider.setAttribute('color', 'red');
        collider.setAttribute('opacity', '0'); 
        collider.setAttribute('grabbable', '');
        collider.setAttribute('position', '0 0.5 -2');
        collider.setAttribute('rotation', '0 90 0');
        collider.setAttribute('width', 1.9);    // Anchura (X)
        collider.setAttribute('height', 1);   // Altura (Y)
        collider.setAttribute('depth', 2);    // Profundidad (Z) 
        collider.setAttribute('visible', 'true'); // Visible para debug, luego lo puedes ocultar
        
        let entity_front = document.createElement('a-entity');
        entity_front.setAttribute('obj-model', 'obj: #modeloCama_1; mtl: #materialCama_1');
        entity_front.setAttribute('scale', '1.5 1.5 1.5');

        collider.appendChild(entity_front)
        scene.appendChild(collider);
    },
});
  