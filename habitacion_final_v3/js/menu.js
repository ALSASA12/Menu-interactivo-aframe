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
    this.createMenu(); 
    this.AppendButtons(); 
    this.AppendArrows();
    this.AppendMenuLabel();
    this.AppendEventManager();
  },

  createMenu: function () {
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
  AppendEventManager: function(){
    var menuEl = document.querySelector('#menu');
    menuEl.setAttribute('arrow_button_manager','')
    menuEl.setAttribute('event-manager','')
  },
  AppendArrows: function() {
    var menuEl = document.querySelector('#menu');
    if (!menuEl) {
      console.error('El menú no ha cargado correctamente.');
      return;
    }
  
    // Obtener dimensiones del menú
    const arrowWidth = 0.05; // Ancho de las flechas
    const arrowHeight = this.data.menu_heigth- 0.1; // Altura ajustada de las flechas
    const arrowDepth = 0.04; // Profundidad de las flechas
  
    // Calcular posiciones para que las flechas queden dentro del menú
    const arrowXOffset = (this.data.menu_width / 2) - (arrowWidth / 2) - 0.02; // Ajuste para mantenerlas dentro
  
    // Crear Left Arrow
    var LeftArrow = this.LeftArrow = document.createElement('a-entity');
    LeftArrow.setAttribute('geometry', {
      primitive: 'box',
      width: arrowWidth,
      height: arrowHeight,
      depth: arrowDepth
    });
    LeftArrow.setAttribute('material', { color: 'red' });
    LeftArrow.setAttribute('position', `${-arrowXOffset} 0 0`); // Posición corregida para estar dentro
    LeftArrow.setAttribute('id', 'leftArrow');
    LeftArrow.setAttribute('pinchable', '');
    // Crear Right Arrow
    var RightArrow = this.RightArrow = document.createElement('a-entity');
    RightArrow.setAttribute('geometry', {
      primitive: 'box',
      width: arrowWidth,
      height: arrowHeight,
      depth: arrowDepth
    });
    RightArrow.setAttribute('material', { color: 'blue' });
    RightArrow.setAttribute('position', `${arrowXOffset} 0 0`); // Posición corregida para estar dentro
    RightArrow.setAttribute('id', 'rightArrow');
    RightArrow.setAttribute('pinchable', '');
    // Añadir flechas al menú
    menuEl.appendChild(LeftArrow);
    menuEl.appendChild(RightArrow);
  },
  AppendMenuLabel: function(){
    var menuEL =document.querySelector('#menu');
    var labelEl = this.labelEl= document.createElement('a-entity');
    const labelYOffset = this.data.menu_heigth / 2 - 0.05;
    labelEl.setAttribute('position', `0 ${labelYOffset} 0.02`);
    labelEl.setAttribute('text', {
      value: 'Menu 1',
      color: 'white',
      align: 'center'
    });
    labelEl.setAttribute('scale', '0.75 0.75 0.75');
    labelEl.setAttribute('id', 'menuLabel');
    labelEl.addState(String(1));
    menuEL.appendChild(labelEl);
  },
  AppendButtons: function () {
    var menuEl = document.querySelector('#menu');
    if (!menuEl) {
      alert('Error en el menu no cargo')
    }
    fetch('./js/menu_data.json')  // Se debe de poner la ruta desde index.html no la ruta desde este archivo
      .then(response => response.json())
      .then(data => {
        const totalButtons = data.length;

        // Calcular el número de columnas y filas óptimo para que la distribución sea lo más cuadrada posible
        const columns = Math.ceil(Math.sqrt(totalButtons));  
        const rows = Math.ceil(totalButtons / columns);

        // Ajustar los desplazamientos de los botones
        const xOffset = 0.15;  // Espaciado en X
        const yOffset = 0.12;  // Espaciado en Y

        // Cálculo de las posiciones para que sea perfectamente simétrico
        const positions = [];

        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < columns; col++) {
            const index = row * columns + col;
            if (index < totalButtons) {
              // Cálculo simétrico centrado en el origen
              const x = (col - (columns - 1) / 2) * xOffset;
              const y = ((rows - 1) / 2 - row) * yOffset;
              positions.push({ x, y, z: 0 });
            }
          }
        }
        data.forEach((item, index) => {
          var buttonEl = this.buttonEl= document.createElement('a-entity');
          //Establecemos el id del boton
          buttonEl.setAttribute('id', item.id || this.data.button_id);
          //Establecemos la forma del boton con valores default o json
          buttonEl.setAttribute('geometry', {
            primitive: 'box',
            width: item.width || this.data.button_width,
            height: item.height|| this.data.button_height,
            depth: item.depth || this.data.button_depth
          });
          //Establecemos color del boton
          buttonEl.setAttribute('material', {
            color: item.color || this.data.button_color
          });
          //Añadimos todos los eventos que se desean cuando se le pulse al boton
          if (Array.isArray(item.evento) && item.evento.length > 0) {
            item.evento.forEach(event => {
              buttonEl.setAttribute(event, '');
            });
          }else if (typeof item.evento === 'string') {
            // Si es un solo evento en formato string, asignarlo directamente
            buttonEl.setAttribute(item.evento, '');
          }
          //Atributo para ser pulsado
          buttonEl.setAttribute('pinchable', '');

          //Estado del boton
          buttonEl.addState(String(1));
          
          const position = positions[index];
          if (position) {
            buttonEl.setAttribute('position', `${position.x} ${position.y} ${position.z}`);
          }

          // Crear una etiqueta de texto para cada botón
          var labelEl = this.labelEl= document.createElement('a-entity');
          labelEl.setAttribute('position', '0 0 0.02');
          labelEl.setAttribute('text', {
            value: item.label || this.data.button_label,
            color: 'white',
            align: 'center'
          });
          labelEl.setAttribute('scale', '0.75 0.75 0.75');

          // Añadir la etiqueta de texto al botón
          buttonEl.appendChild(labelEl);

          // Añadir el botón al menú
          menuEl.appendChild(buttonEl);
        });
      })
      .catch(error => {
        alert('Error al cargar el archivo JSON:',error);
      });
  },
});
