AFRAME.registerComponent('cactus', {
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
        modeloCama.setAttribute('id', 'cactus');
        modeloCama.setAttribute('src', './assets/models/cactus.obj');
    
        let materialCama = document.createElement('a-asset-item');
        materialCama.setAttribute('id', 'materialcactus');
        materialCama.setAttribute('src', './assets/models/cactus.mtl');
    
        assets.appendChild(modeloCama);
        assets.appendChild(materialCama);
    
        let collider = document.createElement('a-box');
        collider.setAttribute('color', 'red');
        collider.setAttribute('opacity', '0'); 
        collider.setAttribute('grabbable', '');
        collider.setAttribute('position', '0 1 -2');
        collider.setAttribute('rotation', '-90 0 0');
        collider.setAttribute('width', 1);    // Anchura (X)
        collider.setAttribute('height', 1);   // Altura (Y)
        collider.setAttribute('depth', 7);    // Profundidad (Z) 
        collider.setAttribute('visible', 'true'); // Visible para debug, luego lo puedes ocultar
        collider.setAttribute('scale', '0.5 0.5 0.5');
        let entity_front = document.createElement('a-entity');
        entity_front.setAttribute('obj-model', 'obj: #cactus; mtl: #materialcactus');
        entity_front.setAttribute('scale', '1 1 1');
        entity_front.setAttribute('position', '26.537390 -7.315264 -37.839401');

        collider.appendChild(entity_front)
        scene.appendChild(collider);
    },
});