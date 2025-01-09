AFRAME.registerComponent('arrow-button', {
    init: function () {
        var el = this.el;
        var labelEl = this.labelEl = document.createElement('a-entity');
        this.color = '#3a50c5';
        el.setAttribute('geometry', {
            primitive: 'box',
            width: this.data.width,
            height: 0.05,
            depth: 0.04
        });
        
})