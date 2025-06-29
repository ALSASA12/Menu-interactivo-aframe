AFRAME.registerSystem('pressable-manager', {
  init: function () {
    this.activePress = null;
  },

  setActivePress: function (el) {
    this.activePress = el;
  },

  clearActivePress: function () {
    this.activePress = null;
  },

  isPressActive: function () {
    return this.activePress !== null;
  }
});

AFRAME.registerComponent('pressable', {
  schema: {
    pressDistance: { default: 0.05 },
    delay: { default: 1000 } // Puedes configurarlo por entidad
  },

  init: function () {
    this.worldPosition = new THREE.Vector3();
    this.handEls = document.querySelectorAll('[hand-tracking-controls]');
    this.pressed = false;
    this.pressStartTime = null;
    this.system = this.el.sceneEl.systems['pressable-manager'];
  },

  tick: function () {
    const now = Date.now();

    if (this.system.isPressActive() && this.system.activePress !== this.el) {
      this.reset();
      return;
    }

    for (let i = 0; i < this.handEls.length; i++) {
      const handEl = this.handEls[i];
      const distance = this.calculateFingerDistance(handEl.components['hand-tracking-controls'].indexTipPosition);

      if (distance < this.data.pressDistance) {
        if (this.pressStartTime === null) {
          this.pressStartTime = now;
        }

        if (!this.pressed && now - this.pressStartTime >= this.data.delay) {
          this.el.emit('pressedstarted');
          this.system.setActivePress(this.el);
          this.pressed = true;
        }
        return;
      }
    }

    if (this.pressed) {
      this.el.emit('pressedended');
      this.system.clearActivePress();
    }
    this.reset();
  },

  reset: function () {
    this.pressed = false;
    this.pressStartTime = null;
  },

  calculateFingerDistance: function (fingerPosition) {
    const worldPosition = this.worldPosition;
    worldPosition.copy(this.el.object3D.position);
    this.el.object3D.parent.updateMatrixWorld();
    this.el.object3D.parent.localToWorld(worldPosition);
    return worldPosition.distanceTo(fingerPosition);
  }
});
