/* global AFRAME */
AFRAME.registerComponent('menu', {
  schema: {
    button_id: {default: 'boton'},
    button_label: {default: 'label'},
    button_width: {default: 0.11},
    button_height: {default: 0.05},
    button_depth: {default:0.04},
    button_color: {default:'#3a50c5'},
    menu_width :{default: 0.6},
    menu_heigth:{default: 0.40},
    menu_depth: {default: 0.01}
  },

  init: function () {
    this.CreateMenu(); 
    this.Process_menu(); 
    this.AppendArrows();
  },
  CreateMenu: function () {
    let scene = this.el.sceneEl; 
    var menuBackGroundEl = document.createElement('a-entity');
    menuBackGroundEl.setAttribute('geometry', {
      primitive: 'box',
      width: this.data.menu_width,
      height: this.data.menu_heigth,
      depth: this.data.menu_depth
    });
    menuBackGroundEl.setAttribute('material', {
      color: 'gray'
    });
    menuBackGroundEl.setAttribute('position', '0 1.5 -0.4');
    menuBackGroundEl.setAttribute('rotation', '-45 0 0');
    menuBackGroundEl.setAttribute('id', 'menu');
    menuBackGroundEl.setAttribute('grabbable', '');

    scene.appendChild(menuBackGroundEl);
  },

  AppendArrows: function () {
    const menuEl = document.querySelector('#menu');
    if (!menuEl) {
      console.error('El menú no ha cargado correctamente.');
      return;
    }
  
    const arrowWidth = 0.05;
    const arrowHeight = this.data.menu_heigth - 0.1;
    const arrowDepth = 0.04;
    const arrowXOffset = (this.data.menu_width / 2) - (arrowWidth / 2) - 0.02;
  
    const createArrow = (id, color, xPosition) => {
      const arrow = document.createElement('a-entity');
      arrow.setAttribute('geometry', {
        primitive: 'box',
        width: arrowWidth,
        height: arrowHeight,
        depth: arrowDepth
      });
      arrow.setAttribute('material', { color });
      arrow.setAttribute('position', `${xPosition} 0 0`);
      arrow.setAttribute('id', id);
      arrow.setAttribute('pinchable', '');
      arrow.setAttribute('arrow', '')
      return arrow;
    };
  
    this.LeftArrow = createArrow('leftArrow', 'red', -arrowXOffset);
    this.RightArrow = createArrow('rightArrow', 'blue', arrowXOffset);
  
    menuEl.appendChild(this.LeftArrow);
    menuEl.appendChild(this.RightArrow);
  },
  
  
  AppendButtons: function(boton,menuId,activo,menuSiguiente,menuAnterior){
    var buttonEl = this.buttonEl= document.createElement('a-entity');
    var menuEl = document.querySelector('#menu');
    buttonEl.setAttribute('id', boton.id || this.data.button_id);
    buttonEl.setAttribute('geometry', {
      primitive: 'box',
      width: boton.width || this.data.button_width,
      height: boton.height|| this.data.button_height,
      depth: boton.depth || this.data.button_depth
    });
    buttonEl.setAttribute('material', {
      color: boton.color || this.data.button_color
    });
    //Menu al que pertenece , menu en actividad y movimiento entre menus
    buttonEl.setAttribute('menu-tag',menuId);
    buttonEl.setAttribute('activo',activo);
    buttonEl.setAttribute('menu-siguiente',menuSiguiente);
    buttonEl.setAttribute('menu-anterior',menuAnterior);
    //Añadimos la accion o el submenu
    if (boton.abreSubmenu && boton.abreSubmenu.trim() !== "") {
      console.log("Botón:", boton.id, "Submenu:", boton.abreSubmenu);
      buttonEl.setAttribute('sub-menu', '');
      buttonEl.setAttribute('submenu-id',boton.abreSubmenu);
    } else {
      buttonEl.setAttribute(boton.accion,'')
    };
    buttonEl.setAttribute('position', '-1000 -1000 -1000');
    buttonEl.setAttribute('pinchable','')

    // Crear una etiqueta de texto para cada botón
    var labelEl = this.labelEl= document.createElement('a-entity');
    labelEl.setAttribute('position', '0 0 0.02');
    labelEl.setAttribute('text', {
      value: boton.label || this.data.button_label,
      color: 'white',
      align: 'center'
    });
    labelEl.setAttribute('scale', '0.75 0.75 0.75');
    buttonEl.appendChild(labelEl);
    menuEl.appendChild(buttonEl);

  },
  AppendMenuLabel: function(menu_label,menuId,submenuDe){
    var menuEL =document.querySelector('#menu');
    var labelEl = this.labelEl= document.createElement('a-entity');
    labelEl.setAttribute('position', `-1000 -1000 -1000`);
    labelEl.setAttribute('text', {
      value: menu_label,
      color: 'white',
      align: 'center'
    });
    labelEl.setAttribute('scale', '0.75 0.75 0.75');
    labelEl.setAttribute('id', menuId);
    labelEl.setAttribute('menu-tag',menuId);
    labelEl.setAttribute('sub-menu','');
    labelEl.setAttribute('subMenuId',submenuDe);
    menuEL.appendChild(labelEl);
  },
  ubicar_menu: function(menuId,visible){
    const posiciones = {
      1: [ [0, 0, 0] ],
      2: [ [-0.1, 0, 0], [0.1, 0, 0] ],
      3: [ [-0.1, 0.05, 0], [0.1, 0.05, 0], [0, -0.5, 0] ],
      4: [ [-0.1, 0.05, 0], [0.1, 0.05, 0], [-0.1, -0.05, 0], [0.1, -0.05, 0] ]
    };
    let menuEl = document.querySelector('#menu');
    let elementosConMenuTag  = menuEl.querySelectorAll('[menu-tag]');
    let listaIds = Array.from(elementosConMenuTag).filter(el => el.getAttribute('menu-tag') === menuId).map(el => el.getAttribute('id'));
    let entidades = listaIds.map(id => menuEl.querySelector(`#${id}`));
    let botones = [];
    let label = null;

    // Detectar cuál es la label y cuáles son los botones
    entidades.forEach(el => {
    if (el.hasAttribute('text')) {
      label = el;
    } else {
      botones.push(el);
    }
    });
    const total = botones.length;
    const layout = posiciones[total];

    if (!layout) {
      console.warn(`Distribución no definida para ${total} botones`);
      return;
    }

    botones.forEach((boton, i) => {
      const pos = layout[i];
      if (visible){
        boton.setAttribute('position', `${pos[0]} ${pos[1]} ${pos[2]}`);
        boton.setAttribute('activo',true)
      } else {
        boton.setAttribute('position',`-1000 -1000 -1000`);
        boton.setAttribute('activo',false)
      }
      
    });

    if (label) {
      const labelYOffset = this.data.menu_heigth / 2 - 0.05;
      label.setAttribute('position', `0 ${labelYOffset} 0.02`);
    }
  },

  Process_menu: function () {
    var menuEl = document.querySelector('#menu');
    if (!menuEl) {
      alert('Error en el menu no cargo');
    }
    fetch('./js/menu_data.json')  // Se debe de poner la ruta desde index.html no la ruta desde este archivo
      .then(response => response.json())
      .then(data => {
        data.forEach((item) => {
          if (item.botones.length > 4) {//Controlamos que sean 4 botones o menos 
            console.error(`El menú "${item.menuId}" tiene más de 4 botones.`);
            alert(`Error: El menú "${item.menuId}" no puede tener más de 4 botones.`);
            return;
          }
          this.AppendMenuLabel(item.menuLabel,item.menuId,item.submenuDe)
          //Unimos todos los botones
          item.botones.forEach((boton) => {//Procesar botones
            this.AppendButtons(boton,item.menuId,item.activo,item.menuSiguiente,item.menuAnterior);
          });
          //Comprobamos cual es el menu con el que queremos empezar
          if (item.activo == 1 || item.activo == '1'){
            this.ubicar_menu(item.menuId,true);
          }
        });
      })
      .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
        alert('Error al cargar el archivo JSON. Revisa la consola para más detalles.');
      });
    
  },

});
