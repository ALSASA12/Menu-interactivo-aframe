/* global AFRAME */
AFRAME.registerComponent('button', {
  schema: {
    label: {default: 'label'},
    width: {default: 0.11},
    height: {default: 0.05},
    depth: {default:0.04}
  },
  init: function () {
    var el = this.el;
    var labelEl = this.labelEl = document.createElement('a-entity');

    this.color = '#3a50c5';
    el.setAttribute('geometry', {
      primitive: 'box',
      width: this.data.width,
      height: this.data.height,
      depth: this.data.depth
    });

    el.setAttribute('material', {color: this.color});
    el.setAttribute('pinchable','')
    labelEl.setAttribute('position', '0 0 0.02');
    labelEl.setAttribute('text', {
      value: this.data.label,
      color: 'white',
      align: 'center'
    });

    labelEl.setAttribute('scale', '0.75 0.75 0.75');
    this.el.appendChild(labelEl);
  },
  
});
