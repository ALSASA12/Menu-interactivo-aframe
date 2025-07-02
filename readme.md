
# 🎨 Design Room - Customizable 3D Menu for A-Frame

---

## 🚀 Installation

Install the library via npm:

```bash
npm install design-room
```

Or include it directly in the browser:

```html
<script src="./path/to/design-room/index.js"></script>
```

---

## 🛠️ Basic Usage

1️⃣ Create a `menu_data.json` file in the same directory as your `.html` file.  
2️⃣ Define your menus in a hierarchical structure.  
3️⃣ The library will automatically generate the menu when the scene loads.

**Minimal example of `menu_data.json`:**

```json
[
  {
    "menuId": "mainMenu",
    "menuLabel": "Start Menu",
    "activo": true,
    "submenuDe": null,
    "menuSiguiente": null,
    "menuAnterior": null,
    "botones": [
      {
        "id": "button1",
        "label": "Furniture",
        "accion": null,
        "img": "./assets/sofa_generic.png",
        "abreSubmenu": "submenu2-1"
      }
    ]
  }
]
```

**Example of use in HTML:**

```html
<html>
  <head>
    <script src="https://aframe.io/releases/1.5.0/aframe.min.js"></script>
    <script src="./node_modules/design-room/index.js"></script>
  </head>
  <body>
    <a-scene>
      <!-- The menu will be generated here -->
    </a-scene>
  </body>
</html>
```

---

## 📁 JSON Structure - Full Explanation

Each menu or submenu is defined as an object within the main array:

| Field           | Description                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| `menuId`        | Unique identifier for the menu. Used to link submenus.                     |
| `menuLabel`     | Text displayed as the menu's visible title.                                |
| `activo`        | If `true`, this menu is shown at startup. Only one should be `true`.       |
| `submenuDe`     | If it's a submenu, indicates the parent menu's `menuId`. `null` otherwise.|
| `menuSiguiente` | `menuId` of the next menu in the sequence. Can be `null`.                  |
| `menuAnterior`  | `menuId` of the previous menu. Can be `null`.                             |
| `botones`       | Array of buttons in the menu. Each can trigger an action or open a submenu.|

**Inside each button:**

| Field            | Description                                                               |
|------------------|---------------------------------------------------------------------------|
| `id`             | Unique identifier for the button.                                         |
| `label`          | Text displayed on the button.                                             |
| `accion`         | Action executed when clicking the button. Can be `null` if it opens submenu.|
| `img`            | Path to the image displayed on the button.                                |
| `abreSubmenu`    | If it opens a submenu, specifies the corresponding `menuId`. `null` otherwise.|

---

## ✨ Features

✅ Automatic menu generation in A-Frame  
✅ Supports chained submenus and cyclic navigation  
✅ Custom images on buttons  
✅ Fully configurable via JSON  
✅ Compatible with VR and 3D web projects  

---

## 🤝 Contributing

Want to improve the project? Pull requests and suggestions are welcome!  
You can open an `Issue` or propose improvements directly.
