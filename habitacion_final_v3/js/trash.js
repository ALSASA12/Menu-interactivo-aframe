AFRAME.registerComponent('delete_on_trash_collision', {
    init: function () {
        this.trashEl = document.querySelector('#trash');
        el.addEventListener('collidestart', function (evt) {
            var targetEl = evt.detail.body.el;
            if (targetEl==this.trashEl){
                this.el.parentNode.removeChild(this.el);
            }
        });
    },
});