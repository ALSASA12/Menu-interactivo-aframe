AFRAME.registerComponent('mesa_2', {
    schema: {
        menuId: { type: 'string' }
      },
    
    init: function () {
        this.onPressStart = this.onPressStart.bind(this);
        this.el.addEventListener('pressedstarted', this.onPressStart);
        this.spawnBed()
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
    
        let entity = document.createElement('a-entity');
        entity.setAttribute('obj-model', 'obj: #modelomesa_2; mtl: #materialmesa_2');
        entity.setAttribute('position', '0 0.5 -2');
        entity.setAttribute('scale', '1 1 1');
        entity.setAttribute('rotation', '0 0 0');
        entity.setAttribute('grabbable', '');
        scene.appendChild(entity);
    },
});