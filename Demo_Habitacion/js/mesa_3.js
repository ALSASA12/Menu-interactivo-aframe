AFRAME.registerComponent('mesa_3', {
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
        modeloCama.setAttribute('id', 'modelomesa_3');
        modeloCama.setAttribute('src', './assets/models/mesa_3.obj');
    
        let materialCama = document.createElement('a-asset-item');
        materialCama.setAttribute('id', 'materialmesa_3');
        materialCama.setAttribute('src', './assets/models/mesa_3.mtl');
    
        assets.appendChild(modeloCama);
        assets.appendChild(materialCama);
    
        let entity = document.createElement('a-entity');
        entity.setAttribute('obj-model', 'obj: #modelomesa_3; mtl: #materialmesa_3');
        entity.setAttribute('position', '0 0.2 -2');
        entity.setAttribute('scale', '1.5 1.5 1.5');
        entity.setAttribute('rotation', '0 0 0');
        entity.setAttribute('grabbable', '');
        scene.appendChild(entity);
    },
});