AFRAME.registerComponent('arrow', {
    schema: {
      menuId: { type: 'string' }
    },
  
    init: function () {
        this.onPressStart = this.onPressStart.bind(this);
        this.el.addEventListener('pinchedstarted', this.onPressStart);
    },
    onPressStart:function (evt) {
        var targetEl = evt.target;
        var arrowId = this.el.id;
        var activos = document.querySelector('#menu').querySelectorAll('[activo="true"]');
        var activosArray = Array.from(activos);
        var siguienteMenu = activosArray.find(el => el.hasAttribute('menu-siguiente')).getAttribute('menu-siguiente');
        var anteriorMenu = activosArray.find(el => el.hasAttribute('menu-anterior')).getAttribute('menu-anterior');
        var menuId = activosArray.find(el => el.hasAttribute('menu-tag')).getAttribute('menu-tag');
        if (targetEl === this.el){
            
            if (arrowId=='leftArrow'){
                if (anteriorMenu){
                    this.ubicar_menu(menuId,false);
                    this.ubicar_menu(anteriorMenu,true);
                };            
            } else if (arrowId=='rightArrow') {
                if (siguienteMenu){
                    this.ubicar_menu(menuId,false);
                    this.ubicar_menu(siguienteMenu,true);
                };
            };
        }
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
          const labelYOffset = 0.40 / 2 - 0.05;
          if (visible){
            label.setAttribute('position', `0 ${labelYOffset} 0.02`);
            label.setAttribute('activo',true)
          } else {
            label.setAttribute('position',`-1000 -1000 -1000`);
            label.setAttribute('activo',false)
          }
            
        }
      },
  });
  