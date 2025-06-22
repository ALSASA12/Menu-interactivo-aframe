AFRAME.registerComponent('cono', {
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
            this.spawnCone()
        }
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
});