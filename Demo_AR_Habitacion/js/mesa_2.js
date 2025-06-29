AFRAME.registerComponent('mesa_2', {
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
        modeloCama.setAttribute('id', 'modelomesa_2');
        modeloCama.setAttribute('src', './assets/models/mesa_2.obj');
    
        let materialCama = document.createElement('a-asset-item');
        materialCama.setAttribute('id', 'materialmesa_2');
        materialCama.setAttribute('src', './assets/models/mesa_2.mtl');
    
        assets.appendChild(modeloCama);
        assets.appendChild(materialCama);
        
        let collider = document.createElement('a-box');
        collider.setAttribute('color', 'red');
        collider.setAttribute('opacity', '0'); 
        collider.setAttribute('grabbable', '');
        collider.setAttribute('position', '0 0.5 -2');
        collider.setAttribute('rotation', '0 0 0');
        collider.setAttribute('width', 1.2);    // Anchura (X)
        collider.setAttribute('height', 1.75);   // Altura (Y)
        collider.setAttribute('depth', 1);    // Profundidad (Z) 
        collider.setAttribute('visible', 'true'); // Visible para debug, luego lo puedes ocultar
        
        let entity_front = document.createElement('a-entity');
        entity_front.setAttribute('obj-model', 'obj: #modelomesa_2; mtl: #materialmesa_2');
        entity_front.setAttribute('scale', '1 1 1');

        collider.appendChild(entity_front)
        scene.appendChild(collider);
    },
});