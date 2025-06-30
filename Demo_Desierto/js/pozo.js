AFRAME.registerComponent('pozo', {
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
        modeloCama.setAttribute('id', 'pozo');
        modeloCama.setAttribute('src', './assets/models/pozo.obj');
    
        let materialCama = document.createElement('a-asset-item');
        materialCama.setAttribute('id', 'materialpozo');
        materialCama.setAttribute('src', './assets/models/pozo.mtl');
    
        assets.appendChild(modeloCama);
        assets.appendChild(materialCama);
    
        let collider = document.createElement('a-cylinder');
        collider.setAttribute('color', 'red');
        collider.setAttribute('opacity', '0'); 
        collider.setAttribute('grabbable', '');
        collider.setAttribute('position', '0 0 -2');
        collider.setAttribute('rotation', '0 0 0');
        collider.setAttribute('radius',0.9)
        collider.setAttribute('height',0.5)    // Profundidad (Z) 
        collider.setAttribute('visible', 'true'); // Visible para debug, luego lo puedes ocultar
        
        let entity_front = document.createElement('a-entity');
        entity_front.setAttribute('obj-model', 'obj: #pozo; mtl: #materialpozo');
        entity_front.setAttribute('scale', '0.01 0.01 0.01');

        collider.appendChild(entity_front)
        scene.appendChild(collider);
    },
});