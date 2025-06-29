AFRAME.registerComponent('dark_mode', {
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
            this.dark_mode()
        }
    },
    
    dark_mode: function(){
        const cielo = document.querySelector('a-sky');
        const luz = document.querySelector('[light]');
        const sol = document.querySelector('a-sphere[color="#ffdd33"]');

        if (!cielo || !luz || !sol) return;

        // Detectar color actual del cielo
        const colorCielo = cielo.getAttribute('color');
        
        if (colorCielo === '#0d1b2a') {
            // Está en modo noche, pasar a día
            cielo.setAttribute('color', '#f7d9aa');
            luz.setAttribute('intensity', '1.2');
            sol.setAttribute('visible', 'true');
        } else {
            // Está en modo día, pasar a noche
            cielo.setAttribute('color', '#0d1b2a');
            luz.setAttribute('intensity', '0.2');
            sol.setAttribute('visible', 'false');
        
        } 
    },
});