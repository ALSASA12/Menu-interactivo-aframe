/* global AFRAME, THREE */
AFRAME.registerComponent('pressable', {
  schema: {
    pressDistance: { default: 0.05 }
  },

  init: function () {
    this.worldPosition = new THREE.Vector3();
    this.handEls = document.querySelectorAll('[hand-tracking-controls]');
    this.pressed = false;
  },

  tick: function () {
    if (AFRAME.scenes[0].pressedObject && AFRAME.scenes[0].pressedObject !== this.el) {
      // Otro objeto ya está siendo presionado, no hacer nada.
      return;
    }

    var handEls = this.handEls;
    var handEl;
    var distance;
    for (var i = 0; i < handEls.length; i++) {
      handEl = handEls[i];
      distance = this.calculateFingerDistance(handEl.components['hand-tracking-controls'].indexTipPosition);
      if (distance < this.data.pressDistance) {
        if (!this.pressed) {
          this.el.emit('pressedstarted');
          AFRAME.scenes[0].pressedObject = this.el;
        }
        this.pressed = true;
        return;
      }
    }

    if (this.pressed) {
      this.el.emit('pressedended');
      if (AFRAME.scenes[0].pressedObject === this.el) {
        AFRAME.scenes[0].pressedObject = null;
      }
    }
    this.pressed = false;
  },

  calculateFingerDistance: function (fingerPosition) {
    var el = this.el;
    var worldPosition = this.worldPosition;

    worldPosition.copy(el.object3D.position);
    el.object3D.parent.updateMatrixWorld();
    el.object3D.parent.localToWorld(worldPosition);

    return worldPosition.distanceTo(fingerPosition);
  }
});
