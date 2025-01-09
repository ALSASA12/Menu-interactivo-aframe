AFRAME.registerComponent('pressable', {
    schema: {
      pressDistance: { default: 0.06 }
    },
  
    init: function () {
      this.worldPosition = new THREE.Vector3();
      this.hand = document.querySelectorAll('[hand-tracking-grab-controls]');
      this.pressed = false;
    },
  
    tick: function () {
      var hand = this.hand;
      var handEl;
      var distance;
      
      for (var i = 0; i < hand.length; i++) {
        handEl = hand[i];
        //handEl.getAttribute('position') genera un AFRAME.Vector3 que debe ser convertiod a THREE.Vector3
        let handPosition = new THREE.Vector3().copy(handEl.getAttribute('position'));
        
        distance = this.calculateFingerDistance(handPosition);
        //No se puede usar indexTipPosition con hand-tracking-grab-control por que es un evento solo de hand-tracking-controls
        //distance = this.calculateFingerDistance(handEl.components['hand-tracking-controls'].indexTipPosition);
        if (distance < this.data.pressDistance) {
          alert(`cargo ${distance}`)
          if (!this.pressed) { this.el.emit('pressedstarted'); }
          this.pressed = true;
          return;
        }
      }
      if (this.pressed) { this.el.emit('pressedended'); }
      this.pressed = false;
    },
    //Calculamos la distancia del objeto en funcion de la mano
    calculateFingerDistance: function (fingerPosition) {
      var el = this.el;
      var worldPosition = this.worldPosition;
  
      worldPosition.copy(el.object3D.position);
      el.object3D.parent.updateMatrixWorld();
      el.object3D.parent.localToWorld(worldPosition);
  
      return worldPosition.distanceTo(fingerPosition);
    }
  });