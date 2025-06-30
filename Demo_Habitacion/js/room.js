AFRAME.registerComponent('room-resizer', {
  schema: {
      altura: { type: 'number', default: 3 },
      ancho: { type: 'number', default: 12 },
      largo: { type: 'number', default: 12 }
  },
  
  init: function () {
      this.createRoom(); 
      this.ajustarDimensiones(); 
  },

  createRoom: function () {
      let scene = this.el.sceneEl; 
      
      this.wall1El = this.createWall(scene);
      this.wall2El = this.createWall(scene);
      this.wall3El = this.createWall(scene);
      this.wall4El = this.createWall(scene);
      
      this.roofEl = this.createWall(scene);
      this.floorEl = this.createFloor(scene);
  },

    createWall: function (parent) {
        let wall = document.createElement('a-entity');
        wall.setAttribute('geometry', 'primitive: box');
        parent.appendChild(wall);
        return wall;
    },

  createFloor: function (parent) {
        let floor = document.createElement('a-entity');
        floor.setAttribute('gltf-model', './assets/models/wood_floor.glb');
        floor.setAttribute('scale', '2.5 2.5 2.5');
        floor.setAttribute('ammo-body', 'type: static');
        floor.setAttribute('ammo-shape', 'type: box');
        parent.appendChild(floor);
        return floor;
  },

  ajustarDimensiones: function () {
      let data = this.data;
      let medio_ancho = data.ancho / 2;
      let medio_largo = data.largo / 2;
      let medio_altura = data.altura / 2;

      //Tamaño de las paredes
      this.wall1El.setAttribute('geometry', `width: ${data.ancho}; height: ${data.altura}; depth: 0.1`);
      this.wall2El.setAttribute('geometry', `width: ${data.ancho}; height: ${data.altura}; depth: 0.1`);
      this.wall3El.setAttribute('geometry', `width: 0.1; height: ${data.altura}; depth: ${data.largo}`);
      this.wall4El.setAttribute('geometry', `width: 0.1; height: ${data.altura}; depth: ${data.largo}`);

      this.wall1El.setAttribute('material', {
        shader: 'standard',
        src: 'url(./assets/textures/brick_wall_door.png)',
        normalMap: 'url(./assets/textures/brick_wall_001_nor_gl_4k.jpg)',
        roughnessMap: 'url(./assets/textures/brick_wall_001_rough_4k.jpg)',
        displacementMap: 'url(./assets/textures/brick_wall_001_displacement_4k.png)',
        repeat: '1 1'
      });
      this.wall2El.setAttribute('material', {
        shader: 'standard',
        src: 'url(./assets/textures/brick_wall_painting.png)',
        normalMap: 'url(./assets/textures/brick_wall_001_nor_gl_4k.jpg)',
        roughnessMap: 'url(./assets/textures/brick_wall_001_rough_4k.jpg)',
        displacementMap: 'url(./assets/textures/brick_wall_001_displacement_4k.png)',
        repeat: '1 1',
      });
      this.wall3El.setAttribute('material', {
        shader: 'standard',
        src: 'url(./assets/textures/brick_wall_window.png)',
        normalMap: 'url(./assets/textures/brick_wall_001_nor_gl_4k.jpg)',
        roughnessMap: 'url(./assets/textures/brick_wall_001_rough_4k.jpg)',
        displacementMap: 'url(./assets/textures/brick_wall_001_displacement_4k.png)',
        repeat: '1 1',
      });
      this.wall4El.setAttribute('material', {
        shader: 'standard',
        src: 'url(./assets/textures/brick_wall_flower.png)',
        normalMap: 'url(./assets/textures/brick_wall_001_nor_gl_4k.jpg)',
        roughnessMap: 'url(./assets/textures/brick_wall_001_rough_4k.jpg)',
        displacementMap: 'url(./assets/textures/brick_wall_001_displacement_4k.png)',
        repeat: '1 1',
      });
      
      // Posicion paredes
      this.wall1El.setAttribute('position', `0 ${medio_altura} ${-medio_largo}`);
      this.wall2El.setAttribute('position', `0 ${medio_altura} ${medio_largo}`);
      this.wall3El.setAttribute('position', `${-medio_ancho} ${medio_altura} 0`);
      this.wall4El.setAttribute('position', `${medio_ancho} ${medio_altura} 0`);

      // Techo
      this.roofEl.setAttribute('geometry', `width: ${data.ancho}; height: 0.1; depth: ${data.largo}`);
      this.roofEl.setAttribute('position', `0 ${data.altura} 0`);
      this.roofEl.setAttribute('material', 'color', 'white');
      // Suelo
      this.floorEl.setAttribute('geometry', `width: ${data.ancho}; height: 0.2; depth: ${data.largo}`);
      this.floorEl.setAttribute('position', `0 -0.1 0`);
  },
});
