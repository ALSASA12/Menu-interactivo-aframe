AFRAME.registerComponent('esfera', {
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
            this.spawnSphere()
        }
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
});