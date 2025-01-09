AFRAME.registerComponent('interaction-hands', {
    init: function () {
      var el = this.el
      el.addEventListener('pinchstarted', function () {
        var selectedObject = el.components.grab.getGrabbedEntity();
      
      if (selectedObject) {
        selectedObject.setAttribute('color', 'red');
      }
      })

      el.addEventListener('pinchended', function () {
        var selectedObject = el.components.grab.getGrabbedEntity();
        if (selectedObject) {
          selectedObject.setAttribute('color', 'blue');
        }
      })

    }
  });