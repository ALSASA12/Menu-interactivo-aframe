AFRAME.registerComponent('collision-handler', {
    init: function () {
        var el = this.el;//El es el objeto al que le pones la funcion 

        
        el.addEventListener('collidestart', function (e) { // Listener para el inicio de la colisión
            if (e.detail.body.el.id === 'LeftHand') { // Verificar si la colisión es con la mano izquierda
                console.log(el.id + ' ha colisionado con ' + e.detail.body.el.id);
                el.setAttribute('color', 'purple'); // Cambiar color de la caja al colisionar
              }
            if (e.detail.targetEl.id=='box'){
                e.detail.body.el.setAttribute('color', 'red');
                let newSquare = document.createElement('a-box');//Creamos cuadrado
                console.log(el.id + ' ha colisionado con ' + e.detail.targetEl.id);
                newSquare.setAttribute('position', '0 0 0');
                newSquare.setAttribute('color', 'purple');
                newSquare.setAttribute('width', '1');
                newSquare.setAttribute('height', '1');
                newSquare.setAttribute('depth', '1');
                document.querySelector('a-scene').appendChild(newSquare);//spawnear cuadrado
                console.log(el.id + ' ha colisionado con ' + e.detail.targetEl.id);//la variable e es el objeto que se choca no el que la recibe
            }
            //el.setAttribute('material', 'color', 'orange');  
            });
    },
          
});
