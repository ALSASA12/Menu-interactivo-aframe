AFRAME.registerComponent('select-bar', {
    init: function () {
      const plane = this.el.querySelector('a-plane');
      const options = this.el.querySelectorAll('a-text');
      const cursor = this.el.querySelector('a-cursor');
  
      let selectedOption = null;
  
      cursor.addEventListener('click', (event) => {
        const clickedOption = event.detail.target;
        if (clickedOption && options.includes(clickedOption)) {
          if (selectedOption) {
            selectedOption.setAttribute('material', 'color: #ffffff');
          }
          selectedOption = clickedOption;
          selectedOption.setAttribute('material', 'color: #000000');
  
          // Trigger an event to communicate the selected option
          this.el.emit('option-selected', { selected: selectedOption.getAttribute('value') });
        }
      });
  
      // Set initial option
      selectedOption = options[0];
      selectedOption.setAttribute('material', 'color: #000000');
    }
  });
  