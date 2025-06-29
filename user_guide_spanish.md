# 📁 Guía de Usuario - Menú Interactivo en A-Frame

Este proyecto forma parte de **BabiaXR** y proporciona una librería de menús interactivos y personalizables para entornos de realidad extendida (XR) desarrollados en [A-Frame](https://aframe.io/). El sistema permite crear menús escalables, configurables y compatibles con interacción manual mediante hand-tracking, sin necesidad de controladores físicos.

---

## 🚀 Características principales

✅ Menús configurables mediante JSON.  
✅ Generación dinámica de botones y submenús.  
✅ Interacción natural mediante la punta del dedo (sin mandos).  
✅ Compatibilidad con imágenes personalizadas en los botones.  
✅ Diseño visual mejorado: botones redondeados y fondos estéticos.  
✅ Navegación fluida entre menús mediante flechas de transición.  
✅ Sistema modular y escalable, fácil de integrar en otros proyectos.  

---

## 📦 Requisitos

- Navegador compatible con WebXR (recomendado: Chrome, Edge).
- Dispositivo con soporte para seguimiento de manos (ejemplo: Meta Quest 2/3).
- Conocimientos básicos de A-Frame y estructura de escenas en HTML.
- Editor de texto para modificar archivos JSON.

---

## 🔧 Instalación

### Opción 1: Clonar el repositorio

```bash
git clone https://github.com/ALSASA12/Menu-interactivo-aframe.git
```

### Opción 2: Descarga manual

Accede al repositorio a la carpeta menu_codigo y descarga los archivos necesarios:

- `arrow_menu.js`
- `pressable-component.js`
- `rounded-plane.js`
- `menu.js`
- `sub-menu.js`
- Carpeta `assets/` con las imágenes de las flechas de navegación y los iconos de botones.

Tienes un formato del .json de ejemplo para generar menu.
---

## ⚙️ Configuración básica

### Ejemplo de estructura del archivo `.json`

Define los menús y botones de forma sencilla. En este ejemplo se crea un menú principal con 4 submenús, enlazados de forma circular mediante las flechas de dirección: Observar archivo menu_data.json en la carpeta menu_codigo.
A continuacion se puede ver un ejemplo simplificado para generar un unico menu con un boton:

```json
[
  {
    "menuId": "menuPrincipal",
    "menuLabel": "Menú inicial",
    "activo": true,
    "submenuDe": null,
    "menuSiguiente": null,
    "menuAnterior": null,
    "botones": [
      {
        "id": "boton1",
        "label": "Muebles",
        "accion": null,
        "img": "./assets/sofa_generico.png",
        "abreSubmenu": "submenu2-1"
      }
    ]
  }
]
```

Parámetros de los menús
| Campo          | Descripción                                      |
| -------------- | ------------------------------------------------ |
| `menuId`       | Identificador único del menú. Utilizado para vincular submenús.No puede repetirse                   |
| `menuLabel`    | Texto que aparece como título visible del menú.         |
| `activo`       |  Si es `true`, este menú se muestra al inicio. Solo uno debe tener `activo: true`. |
| `submenu`      | Si es un submenú, indica el `menuId` del menú padre. Si es principal, se deja en `null`. |
| `nextMenu`     | `menuId` del siguiente menú en la secuencia. Puede ser `null`.               |
| `previousMenu` | `menuId` del menú anterior. Puede ser `null`.                 |
| `buttons`      | Array de botones asociados al menú.              |


Cada botón puede tener:

| Campo         | Descripción                                      |
| ------------- | ------------------------------------------------ |
| `id`          | Identificador único del botón.No puede repetirse                   |
| `label`       | Texto que muestra el botón.                      |
| `action`      | Acción que se ejecuta al pulsar el botón. Puede ser `null` si abre submenú.         |
| `img`         | Ruta de la imagen que aparece en el botón.                 |
| `openSubmenu` | Si abre un submenú, indica el `menuId` correspondiente. `null` si no aplica. |

---

## 🖥️ Ejemplo de uso en una escena A-Frame

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

### 🎛️ Parámetros de configuración disponibles

| Parámetro            | Descripción                                     | Valor por defecto                         |
|----------------------|-------------------------------------------------|-------------------------------------------|
| `menu_data_path`     | Ruta al archivo `.json` de configuración.       | `./menu_data.json`                        |
| `menu_width`         | Anchura del menú (en metros).                   | `0.6`                                     |
| `menu_heigth`        | Altura total del menú (en metros).              | `0.4`                                     |
| `button_height`      | Altura de los botones individuales (en metros). | `0.025`                                   |
| `button_color`       | Color de fondo de los botones.                  | `#3B82F6`                                 |
| `button_label_color` | Color del texto de los botones.                 | `#FFFFFF`                                 |
| `menu_color`         | Color de fondo del menú.                        | `#374151`                                 |
| `menu_label_color`   | Color del texto del menú principal.             | `#93C5FD`                                 |
| `arrow_color`        | Color de las flechas de navegación.             | `#F59E0B`                                 |

---

## ✨ Interacción

La interacción se basa en el componente `pressable` que detecta la punta del dedo índice.

Cuando el dedo se acerca a un botón, se emite el evento `pressedstarted` y el evento `pressedended`, que se propaga por la escena y puede ser capturado en tus scripts.

### Ejemplo práctico de uso del evento:

```js
AFRAME.registerComponent('mi-componente-interactivo', {
  init: function () {
    this.onPressStart = this.onPressStart.bind(this);
    this.el.addEventListener('pressedended', this.onPressStart);
  },
  onPressStart: function (evt) {
    if (evt.target === this.el) {
      console.log("Botón pulsado, ejecutar acción personalizada.");
    }
  }
});
```

---

## 🎨 Personalización

✅ Modifica estilos visuales mediante `rounded-plane`.  
✅ Cambia iconos , imágenes , menus, el numero de botones y sus acciones desde `menu_data.json`.  
✅ Navega entre menús con `nextMenu` y `previousMenu`.  
✅ Personaliza colores, tamaño y estética desde los atributos HTML.  

---

## 🛡️ Licencia

Este proyecto se distribuye bajo la licencia **Apache License 2.0**, como parte de **BabiaXR**.

---

## 💡 Recomendaciones

- Optimiza las imágenes.  
- Verifica el funcionamiento del hand-tracking.  
- No recargar excesivamente la escena en dispositivos limitados.  
- Usa rutas relativas correctas en `menu_data.json`.  

---