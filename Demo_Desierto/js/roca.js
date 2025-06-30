AFRAME.registerComponent('roca', {
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
        modeloCama.setAttribute('id', 'roca');
        modeloCama.setAttribute('src', './assets/models/rock.obj');
    
        let materialCama = document.createElement('a-asset-item');
        materialCama.setAttribute('id', 'materialroca');
        materialCama.setAttribute('src', './assets/models/rock.mtl');
    
        assets.appendChild(modeloCama);
        assets.appendChild(materialCama);
    
        let collider = document.createElement('a-box');
        collider.setAttribute('color', 'red');
        collider.setAttribute('opacity', '0'); 
        collider.setAttribute('grabbable', '');
        collider.setAttribute('position', '0 0.5 -2');
        collider.setAttribute('rotation', '0 0 0');
        collider.setAttribute('width', 1.6);    // Anchura (X)
        collider.setAttribute('height', 1);   // Altura (Y)
        collider.setAttribute('depth', 1.5);    // Profundidad (Z) 
        collider.setAttribute('visible', 'true'); // Visible para debug, luego lo puedes ocultar
        
        let entity_front = document.createElement('a-entity');
        entity_front.setAttribute('obj-model', 'obj: #roca; mtl: #materialroca');
        entity_front.setAttribute('scale', '1 1 1');
        entity_front.setAttribute('position', '-1.3 1.3 1.3');
        collider.appendChild(entity_front)
        scene.appendChild(collider);
    },
});