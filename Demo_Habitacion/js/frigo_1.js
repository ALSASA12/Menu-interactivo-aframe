AFRAME.registerComponent('frigo_1', {
    schema: {
        menuId: { type: 'string' }
      },
    
    init: function () {
        this.onPressStart = this.onPressStart.bind(this);
        this.el.addEventListener('pressedstarted', this.onPressStart);
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
        modeloCama.setAttribute('id', 'frigo_1');
        modeloCama.setAttribute('src', './assets/models/frigo_1.obj');
    
        let materialCama = document.createElement('a-asset-item');
        materialCama.setAttribute('id', 'materialfrigo_1');
        materialCama.setAttribute('src', './assets/models/frigo_1.mtl');
    
        assets.appendChild(modeloCama);
        assets.appendChild(materialCama);
    
        let entity = document.createElement('a-entity');
        entity.setAttribute('obj-model', 'obj: #frigo_1; mtl: #materialfrigo_1');
        entity.setAttribute('position', '0 0.5 -2');
        entity.setAttribute('scale', '0.01 0.01 0.01');
        entity.setAttribute('rotation', '0 0 0');
        entity.setAttribute('grabbable', '');
        scene.appendChild(entity);
    },
});