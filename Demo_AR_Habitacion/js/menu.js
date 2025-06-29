/* global AFRAME */
AFRAME.registerComponent('menu', {
  schema: {
    //button_radius_bottom: {default: 0.4},
    button_height: {default: 0.025},
    //button_radius_top: {default:0.04},
    
    menu_width :{default: 0.6},
    menu_heigth:{default: 0.40},
    //menu_depth: {default: 0.01},
    button_color:        { default: '#3B82F6' }, // azul profesional (como botones de sistemas modernos)
    button_label_color:  { default: '#FFFFFF' }, // blanco para alto contraste
    menu_color:          { default: '#374151' }, // gris oscuro azulado (fondo elegante y neutro)
    menu_label_color:    { default: '#93C5FD' }, // azul claro suave (lectura agradable)
    arrow_color:         { default: '#F59E0B' }, // naranja intenso (para navegación o destacar 
  },

  init: function () {
    this.CreateMenu(); 
    this.Process_menu(); 
    this.AppendArrows();
  },
  
  CreateMenu: function () {
    let scene = this.el.sceneEl; 
    var menuFront = document.createElement('a-entity');
    var menuCollision = document.createElement('a-entity');

    menuFront.setAttribute('rounded-plane', {
      width: this.data.menu_width,
      height: this.data.menu_heigth,
      radius: 0.05
    });
    menuFront.setAttribute('material', {
      color:  this.data.menu_color,
      metalness:"0.3",
      roughness:"0.3"
    });
    menuCollision.setAttribute('geometry', {
      primitive: 'box',
      depth: "0.01",
      width: this.data.menu_width,
      height: this.data.menu_heigth,
    });
    menuCollision.setAttribute('material', {
      opacity: 0,
      transparent: true
    });
    menuCollision.setAttribute('position', '0 1.5 -0.4');
    menuCollision.setAttribute('rotation', '-45 0 0');
    menuCollision.setAttribute('id', 'menu');
    menuCollision.setAttribute('grabbable', '');
    menuCollision.appendChild(menuFront);
    scene.appendChild(menuCollision);
  },

  AppendArrows: function () {
    const menuEl = document.querySelector('#menu');
    if (!menuEl) {
      console.error('El menú no ha cargado correctamente.');
      return;
    }
  
    const arrowWidth = 0.05;
    const arrowHeight = 0.1;
    const arrowDepth = 0.001;
    const arrowXOffset = (this.data.menu_width / 2) - (arrowWidth / 2) - 0.02;
    const arrowYOffset =(this.data.menu_heigth / 2) - 0.07
    const createArrow = (id, color,img, xPosition,yPosition) => {
      const arrow = document.createElement('a-entity');
      arrow.setAttribute('geometry', {
        primitive: 'box',
        width: arrowWidth,
        height: arrowHeight,
        depth: arrowDepth
      });
      arrow.setAttribute('material', { 
        color: color ,
        src:img,
        transparent: true,
        opacity: 1,
        color: '#ffffff'
      });
      arrow.setAttribute('position', `${xPosition} ${yPosition} 0.01`);
      arrow.setAttribute('id', id);
      arrow.setAttribute('pressable', '');
      arrow.setAttribute('arrow', '')
      return arrow;
    };
  
    this.LeftArrow = createArrow('leftArrow',  this.data.arrow_color,'./assets/flecha_izquierda.png', -arrowXOffset,arrowYOffset);
    this.RightArrow = createArrow('rightArrow',  this.data.arrow_color,'./assets/flecha_derecha.png', arrowXOffset,arrowYOffset);
    menuEl.appendChild(this.LeftArrow);
    menuEl.appendChild(this.RightArrow);
  },
  
  
  AppendButtons: function(boton,menuId,activo,menuSiguiente,menuAnterior){
    var buttonEl = this.buttonEl= document.createElement('a-entity');
    var menuEl = document.querySelector('#menu');

    buttonEl.setAttribute('id', boton.id );
    buttonEl.setAttribute('geometry', {
      primitive: 'cylinder',
      radius:'0.05',
      height: boton.height|| this.data.button_height,
    });
    buttonEl.setAttribute('material',{
      color: this.data.button_color,
      src: boton.img,
      transparent: true,
      opacity: 1,
      color: '#ffffff'
    })
    buttonEl.setAttribute('rotation','90 0 0')
    //Menu al que pertenece , menu en actividad y movimiento entre menus
    buttonEl.setAttribute('menu-tag',menuId);
    buttonEl.setAttribute('activo',activo);
    buttonEl.setAttribute('menu-siguiente',menuSiguiente);
    buttonEl.setAttribute('menu-anterior',menuAnterior);
    //Añadimos la accion o el submenu
    if (boton.openSubmenu && boton.openSubmenu.trim() !== "") {
      buttonEl.setAttribute('sub-menu', '');
      buttonEl.setAttribute('submenu-id',boton.openSubmenu);
    } else {
      buttonEl.setAttribute(boton.action,'')
    };
    buttonEl.setAttribute('position', '-1000 -1000 -1000');
    buttonEl.setAttribute('pressable','')

    // Crear una etiqueta de texto para cada botón
    var labelEl = this.labelEl= document.createElement('a-entity');
    labelEl.setAttribute('position', '0 0.01 0.07');
    labelEl.setAttribute('text', {
      value: boton.label ,
      color:  this.data.button_label_color,
      align: 'center'
    });
    labelEl.setAttribute('scale', '0.6 0.6 0.6');
    labelEl.setAttribute('rotation','-90 0 0')
    buttonEl.appendChild(labelEl);
    menuEl.appendChild(buttonEl);

  },
  AppendMenuLabel: function(menu_label,menuId,submenu){
    var menuEL =document.querySelector('#menu');
    var labelEl = this.labelEl= document.createElement('a-entity');
    labelEl.setAttribute('position', `-1000 -1000 -1000`);
    labelEl.setAttribute('scale','0.18 0.18 0.18')
    labelEl.setAttribute('geometry', {
      primitive: 'plane',
      width: menu_label.length * 0.018 + 0.02,
      height: 0.05,
      depth: 0.01
    });
    labelEl.setAttribute('material', {
      transparent: true,
      opacity: 0.0
    });
    labelEl.setAttribute('id', menuId);
    labelEl.setAttribute('menu-tag',menuId);
    labelEl.setAttribute('sub-menu','');
    labelEl.setAttribute('subMenu-Id',submenu);
    labelEl.setAttribute('label','')
    labelEl.setAttribute('pressable','')
    // Crear subentidad de texto visible
    const textEl = document.createElement('a-text');
    textEl.setAttribute('value', menu_label);
    textEl.setAttribute('color',  this.data.menu_label_color);
    textEl.setAttribute('align', 'center');
    textEl.setAttribute('font', 'dejavu');
    textEl.setAttribute('position', '0 0 0.06');
    labelEl.appendChild(textEl)
    menuEL.appendChild(labelEl);
  },
  ubicar_menu: function(menuId,visible){
    const posiciones = {
      1: [ [0, 0, 0] ],
      2: [ [-0.1, 0, 0], [0.1, 0, 0] ],
      3: [ [-0.1, 0.05, 0], [0.1, 0.05, 0], [0, -0.1, 0] ],
      4: [ [-0.1, 0.05, 0], [0.1, 0.05, 0], [-0.1, -0.1, 0], [0.1, -0.1, 0] ]
    };
    let menuEl = document.querySelector('#menu');
    let elementosConMenuTag  = menuEl.querySelectorAll('[menu-tag]');
    let listaIds = Array.from(elementosConMenuTag).filter(el => el.getAttribute('menu-tag') === menuId).map(el => el.getAttribute('id'));
    let entidades = listaIds.map(id => menuEl.querySelector(`#${id}`));
    let botones = [];
    let label = null;

    // Detectar cuál es la label y cuáles son los botones
    entidades.forEach(el => {
    if (el.hasAttribute('label')) {
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
    fetch('./menu_data.json')  // Se debe de poner la ruta desde index.html no la ruta desde este archivo
      .then(response => response.json())
      .then(data => {
        data.forEach((item) => {
          if (item.buttons.length > 4) {//Controlamos que sean 4 botones o menos 
            console.error(`El menú "${item.menuId}" tiene más de 4 botones.`);
            alert(`Error: El menú "${item.menuId}" no puede tener más de 4 botones.`);
            return;
          }
          this.AppendMenuLabel(item.menuLabel,item.menuId,item.submenu)
          //Unimos todos los botones
          item.buttons.forEach((boton) => {//Procesar botones
            this.AppendButtons(boton,item.menuId,item.activo,item.nextMenu,item.previousMenu);
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
