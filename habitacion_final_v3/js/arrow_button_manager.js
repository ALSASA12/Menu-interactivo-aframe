/* global AFRAME */
AFRAME.registerComponent('arrow_button_manager', {
    init: function(){
        this.bindMethods();
        this.initializeElements();
        this.addInitialEventListeners();
    },

    bindMethods: function () {
        this.onPressStart = this.onPressStart.bind(this);
    },

    initializeElements: function () {
        this.leftArrowEl = document.querySelector('#leftArrow');
        this.rightArrowEl = document.querySelector('#rightArrow');
        this.menuLabel =document.querySelector('#menuLabel')
    },

    addInitialEventListeners: function () {
        this.leftArrowEl.addEventListener('pinchedstarted', this.onPressStart);
        this.rightArrowEl.addEventListener('pinchedstarted', this.onPressStart);
    },
    removeStateFromChildren:function (parentId, estado_actual) {
        var parentEl = document.querySelector(`#${parentId}`);
        if (!parentEl) {
            console.error(`No se encontró la entidad con ID: ${parentId}`);
            return;
        }
        
        var childEntities = Array.from(parentEl.children); 
        
        childEntities.forEach(child => {
            if (child.hasAttribute(estado_actual)) {
            child.removeState(estado_actual);
            }
        });
    },
    addStateToChildren: function (parentId, nuevo_estado) {
        var parentEl = document.querySelector(`#${parentId}`);
        if (!parentEl) {
            console.error(`No se encontró la entidad con ID: ${parentId}`);
            return;
        }

        var childEntities = Array.from(parentEl.children); 

        childEntities.forEach(child => {
            child.addState(nuevo_estado);
        });
    },
    cambiarTextoMenu: function(nuevo_estado,estado_actual) {
        //Actualizamos el estado
        this.menuLabel.removeState(estado_actual)
        this.menuLabel.addState(nuevo_estado)
        //Modificamos el texto de la label
        let textAttributes = this.menuLabel.getAttribute('text') || {}; // Obtener los atributos actuales
        textAttributes.value = `Menu ${nuevo_estado}`; // Asignar el nuevo texto

        this.menuLabel.setAttribute('text', textAttributes); // Aplicar cambios
    },    
    //Funcion para el cambio de estado con las flechas de direccion
    cambiarEstado: function (direccion) {
        var posible_states = ['1', '2'];
        var estados = Array.from(this.menuLabel.states);
        var estado_actual = posible_states.find(state => estados.includes(state)) || posible_states[0];
        
        //Eliminacion de estados
        this.removeStateFromChildren('menu', estado_actual)

        let nuevo_estado = String((parseInt(estado_actual) - 1 + direccion + posible_states.length) % posible_states.length + 1);

        //Añadir nuevos estados
        this.addStateToChildren('menu', nuevo_estado)

        //Cambiar valor del label de texto 
        this.cambiarTextoMenu(nuevo_estado,estado_actual)
    },

    onPressStart: function(evt){
        var targetEl = evt.target;
        if (targetEl === this.leftArrowEl) {
            this.cambiarEstado(-1);
        } else if (targetEl === this.rightArrowEl) {
            this.cambiarEstado(1);
        }
    },
    
});