/* global AFRAME, THREE */
AFRAME.registerComponent('pressable', {
  schema: {
    pressDistance: { default: 0.05 }
  },

  init: function () {
    this.worldPosition = new THREE.Vector3();
    this.handEls = document.querySelectorAll('[hand-tracking-controls]');
    this.pressed = false;
    this.pressStartTime = null;
    this.delay = 1000; // 1 segundo en milisegundos
  },

  tick: function () {
    var handEls = this.handEls;
    var handEl;
    var distance;
    var now = Date.now();

    for (var i = 0; i < handEls.length; i++) {
      handEl = handEls[i];
      distance = this.calculateFingerDistance(handEl.components['hand-tracking-controls'].indexTipPosition);

      if (distance < this.data.pressDistance) {
        // Si no se había empezado a contar el tiempo, lo iniciamos
        if (this.pressStartTime === null) {
          this.pressStartTime = now;
        }

        // Si ha pasado el delay y aún no se ha enviado el evento
        if (!this.pressed && now - this.pressStartTime >= this.delay) {
          this.el.emit('pressedstarted');
          this.pressed = true;
        }
        return; // Ya está en rango, no seguimos buscando
      }
    }

    // Si no está en rango, reseteamos todo
    if (this.pressed) {
      this.el.emit('pressedended');
    }
    this.pressed = false;
    this.pressStartTime = null;
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
