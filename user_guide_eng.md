
# 📁 User Guide - Interactive Menu in A-Frame

This project is part of **BabiaXR** and provides a customizable, interactive menu library for extended reality (XR) environments developed with [A-Frame](https://aframe.io/). The system allows for scalable, configurable menus with hand-tracking interaction, eliminating the need for physical controllers.

---

## 🚀 Main Features

✅ Menus configurable via JSON.  
✅ Dynamic generation of buttons and submenus.  
✅ Natural interaction using the fingertip (no controllers required).  
✅ Supports custom images on buttons.  
✅ Enhanced visual design with rounded buttons and stylish backgrounds.  
✅ Smooth menu navigation with directional arrows.  
✅ Modular and scalable system, easy to integrate into other projects.  

---

## 📦 Requirements

- WebXR compatible browser (recommended: Chrome, Edge).
- Device with hand-tracking support (e.g., Meta Quest 2/3).
- Basic knowledge of A-Frame and HTML scene structure.
- Text editor to modify JSON files.

---

## 🔧 Installation

### Option 1: Clone the repository

```bash
git clone https://github.com/ALSASA12/Menu-interactivo-aframe.git
```

### Option 2: Manual download

Download the required files from the repository:

- `menu-component.js`
- `pressable-component.js`
- `rounded-plane.js`
- `assets/` folder with navigation arrows and button icons.

---

## ⚙️ Basic Configuration

### Example of `.json` structure

Menus and buttons are defined simply. See `menu_data.json` inside the `menu_codigo` folder for examples.

### Menu Parameters

| Field          | Description                                                |
|----------------|------------------------------------------------------------|
| `menuId`      | Unique menu identifier. Used to link submenus. Must be unique. |
| `menuLabel`   | Text displayed as the menu title.                          |
| `activo`      | If `true`, this menu appears on startup. Only one can be `true`. |
| `submenu`     | For submenus, indicates the parent `menuId`. Leave `null` if main menu. |
| `nextMenu`    | `menuId` of the next menu in sequence. Can be `null`.      |
| `previousMenu`| `menuId` of the previous menu. Can be `null`.              |
| `buttons`     | Array of buttons associated with the menu.                 |

### Button Parameters

| Field          | Description                                                |
|----------------|------------------------------------------------------------|
| `id`          | Unique button identifier. Must not repeat.                 |
| `label`       | Text displayed on the button.                              |
| `action`      | Action executed when pressed. Can be `null` if opens submenu. |
| `img`         | Image displayed on the button.                             |
| `openSubmenu` | `menuId` of the submenu to open, or `null`.               |

---

## 🖥️ A-Frame Scene Example

```html
<a-scene>
  <a-entity id="menuContainer"
            menu="json: ./menu_data.json;
                  menu_width: 0.6;
                  menu_heigth: 0.4;
                  button_height: 0.025;
                  button_color: #3B82F6;
                  button_label_color: #FFFFFF;
                  menu_color: #374151;
                  menu_label_color: #93C5FD;
                  arrow_color: #F59E0B">
  </a-entity>

  <a-entity hand-tracking-controls="hand: left"></a-entity>
  <a-entity hand-tracking-controls="hand: right"></a-entity>
</a-scene>
```

### 🎛️ Available Configuration Parameters

| Parameter           | Description                                       | Default Value                            |
|---------------------|---------------------------------------------------|-------------------------------------------|
| `menu_data_path`    | Path to the configuration `.json` file.           | `./menu_data.json`                        |
| `menu_width`        | Menu width (in meters).                           | `0.6`                                     |
| `menu_heigth`       | Total menu height (in meters).                    | `0.4`                                     |
| `button_height`     | Height of individual buttons (in meters).         | `0.025`                                   |
| `button_color`      | Button background color.                          | `#3B82F6`                                 |
| `button_label_color`| Button text color.                                | `#FFFFFF`                                 |
| `menu_color`        | Menu background color.                            | `#374151`                                 |
| `menu_label_color`  | Main menu text color.                             | `#93C5FD`                                 |
| `arrow_color`       | Navigation arrows color.                          | `#F59E0B`                                 |

---

## ✨ Interaction

The system uses the `pressable` component to detect fingertip proximity.

When the finger approaches a button, a `pressedstarted` event is emitted, which propagates through the scene and can be captured by your scripts.

### Example of Capturing the Event

```js
AFRAME.registerComponent('my-interactive-component', {
  init: function () {
    this.onPressStart = this.onPressStart.bind(this);
    this.el.addEventListener('pressedended', this.onPressStart);
  },
  onPressStart: function (evt) {
    if (evt.target === this.el) {
      console.log("Button pressed, custom action triggered.");
    }
  }
});
```

---

## 🎨 Customization

✅ Modify visual styles using `rounded-plane`.  
✅ Change icons or images via `menu_data.json`.  
✅ Navigate between menus with `nextMenu` and `previousMenu`.  
✅ Customize colors, size, and appearance using HTML attributes.  

---

## 🛡️ License

This project is licensed under the **Apache License 2.0**, as part of **BabiaXR**.

---

## 💡 Recommendations

- Optimize button images for better performance.  
- Verify hand-tracking functionality before use.  
- Avoid overloading the scene on low-performance devices.  
- Use correct relative paths in `menu_data.json`.  

---
