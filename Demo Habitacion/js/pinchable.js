/* global AFRAME, THREE */
AFRAME.registerComponent('pinchable', {
  schema: {
    pinchDistance: { default: 0.1 }
  },

  init: function () {
    var sceneEl = this.el.sceneEl;
    this.worldPosition = new THREE.Vector3();
    this.bindMethods();
    this.pinched = false;
    sceneEl.addEventListener('pinchstarted', this.onPinch);
    sceneEl.addEventListener('pinchended', this.onPinch);
    sceneEl.addEventListener('pinchmoved', this.onPinch);
  },

  bindMethods: function () {
    this.onPinch = this.onPinch.bind(this);
  },

  onPinch: function (evt) {
    var pinchDistance = this.calculatePinchDistance(evt.detail.position);

    if (evt.type === 'pinchstarted' && pinchDistance < this.data.pinchDistance) {
      if (!this.pinched) {
        this.el.emit('pinchedstarted');
        this.pinched = true;
      }
    } 
    else if ((evt.type === 'pinchmoved' || evt.type === 'pinchended') && this.pinched) {
      if (pinchDistance >= this.data.pinchDistance || evt.type === 'pinchended') {
        this.el.emit('pinchedended');
        this.pinched = false;
      }
    }
  },

  calculatePinchDistance: function (pinchWorldPosition) {
    var el = this.el;
    var worldPosition = this.worldPosition;
    var pinchDistance;

    worldPosition.copy(el.object3D.position);
    el.object3D.parent.updateMatrixWorld();
    el.object3D.parent.localToWorld(worldPosition);

    pinchDistance = worldPosition.distanceTo(pinchWorldPosition);

    return pinchDistance;
  },
});
