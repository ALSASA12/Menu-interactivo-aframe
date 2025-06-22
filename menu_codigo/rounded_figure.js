AFRAME.registerComponent('rounded-plane', {
    schema: {
      width: { type: 'number', default: 1 },
      height: { type: 'number', default: 1 },
      radius: { type: 'number', default: 0.1 }
    },
    init: function () {
      const data = this.data;
      const shape = new THREE.Shape();
      const w = data.width / 2;
      const h = data.height / 2;
      const r = data.radius;
  
      shape.moveTo(-w + r, -h);
      shape.lineTo(w - r, -h);
      shape.quadraticCurveTo(w, -h, w, -h + r);
      shape.lineTo(w, h - r);
      shape.quadraticCurveTo(w, h, w - r, h);
      shape.lineTo(-w + r, h);
      shape.quadraticCurveTo(-w, h, -w, h - r);
      shape.lineTo(-w, -h + r);
      shape.quadraticCurveTo(-w, -h, -w + r, -h);
  
      const geometry = new THREE.ShapeGeometry(shape);
      const material = new THREE.MeshStandardMaterial({
        color: 'gray',
        metalness: 0.3,
        roughness: 0.3
      });
  
      const mesh = new THREE.Mesh(geometry, material);
      this.el.setObject3D('mesh', mesh);
    }
  });
  