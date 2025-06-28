# 📁 Guía de Usuario - Menú Interactivo en A-Frame

Este proyecto forma parte de **BabiaXR** y proporciona una librería de menús interactivos y personalizables para entornos de realidad extendida (XR) desarrollados en [A-Frame](https://aframe.io/). El sistema permite crear menús escalables, configurables y compatibles con interacción manual mediante hand-tracking, sin necesidad de controladores físicos.

## Características principales

✅ Menús configurables mediante JSON.  
✅ Generación dinámica de botones y submenús.  
✅ Interacción natural mediante la punta del dedo (sin mandos).  
✅ Compatibilidad con imágenes personalizadas en los botones.  
✅ Diseño visual mejorado: botones redondeados y fondos estéticos.  
✅ Navegación fluida entre menús mediante flechas de transición.  
✅ Sistema modular y escalable, fácil de integrar en otros proyectos.

---

## Requisitos

- Navegador compatible con WebXR (recomendado: Chrome, Edge).
- Dispositivo con soporte para seguimiento de manos (ejemplo: Meta Quest 2/3).
- Conocimientos básicos de A-Frame y estructura de escenas en HTML.
- Editor de texto para modificar archivos JSON.

---

## 🔧 Instalación

### Opción 1: Clonar el repositorio

```bash
git clone https://github.com/ALSASA12/Menu-interactivo-aframe.git
Opción 2: Descarga manual
Accede al repositorio y descarga los archivos necesarios:

- menu-component.js

- pressable-component.js

- rounded-plane.js

- Carpeta assets/ con las imageneces de la flecha derecha y la flecha izquierda


⚙️ Configuración básica
Estructura del archivo .json
Define los menús y botones de forma sencilla:

En este ejemplo podemos ver un menu principal con 4 submenus , y luego cada submenu unido de forma circular a atraves de las flechas de de direccion

[
  {
    "menuId": "menuPrincipal",
    "menuLabel":"Menu inicial",
    "activo": true,
    "submenu": null,
    "nextMenu": null,
    "previousMenu": null,
    "buttons": [
      {
        "id": "boton1",
        "label": "Muebles",
        "action": null,
        "img":"./assets/sofa_generico.png",
        "openSubmenu": "submenu2-1"
      },
      {
        "id": "boton2",
        "label": "Camas",
        "action": null,
        "img":"./assets/cama_generica.png",
        "openSubmenu": "submenu2-1"
      },
      {
        "id": "boton3",
        "label": "Mesas",
        "action": null,
        "img":"./assets/mesa_generica.png",
        "openSubmenu": "submenu2-3"
      },
      {
        "id": "boton4",
        "label": "Sillas",
        "action": null,
        "img":"./assets/silla_generica.png",
        "openSubmenu": "submenu2-4"
      }
    ]
  },
  {
    "menuId": "submenu2-1",
    "menuLabel":"Camas",
    "activo": false,
    "submenu": "menuPrincipal",
    "nextMenu": "submenu2-2",
    "previousMenu": "submenu2-4",
    "buttons": [
      {
        "id": "Boton2-1-1",
        "label": "Cama 1",
        "action": "cama_1",
        "img":"./assets/cama_1.png",
        "openSubmenu": null
      },
      {
        "id": "Boton2-1-2",
        "label": "Cama 2",
        "action": "cama_2",
        "img":"./assets/cama_2.png",
        "openSubmenu": null
      }
    ]
  },
  {
    "menuId": "submenu2-2",
    "menuLabel":"Mesas",
    "activo": false,
    "submenu": "menuPrincipal",
    "nextMenu": "submenu2-3",
    "previousMenu": "submenu2-1",
    "buttons": [
      {
        "id": "Boton2-2-1",
        "label": "Mesa 1",
        "action": "mesa_1",
        "img":"./assets/mesa_1.png",
        "openSubmenu": null
      },
      {
        "id": "Boton2-2-2",
        "label": "Mesa 2",
        "action": "mesa_2",
        "img":"./assets/mesa_2.png",
        "openSubmenu": null
      },
      {
        "id": "Boton2-2-3",
        "label": "Mesa 3",
        "action": "mesa_3",
        "img":"./assets/mesa_3.png",
        "openSubmenu": null
      }
    ]
  },
  {
    "menuId": "submenu2-3",
    "menuLabel":"Muebles mix",
    "activo": false,
    "submenu": "menuPrincipal",
    "nextMenu": "submenu2-4",
    "previousMenu": "submenu2-2",
    "buttons": [
      {
        "id": "Boton2-3-1",
        "label": "Frigorifico",
        "action": "frigo_1",
        "img":"./assets/frigo_1.png",
        "openSubmenu": null
      },
      {
        "id": "Boton2-2-3",
        "label": "Mesilla",
        "action": "mesilla_1",
        "img":"./assets/mesilla_1.png",
        "openSubmenu": null
      }
    ]
  },
  {
    "menuId": "submenu2-4",
    "menuLabel":"Sillas",
    "activo": false,
    "submenu": "menuPrincipal",
    "nextMenu": "submenu2-1",
    "previousMenu": "submenu2-3",
    "buttons": [
      {
        "id": "Boton2-4-1",
        "label": "Silla 1",
        "action": "Silla_1",
        "img":"./assets/silla_1.png",
        "openSubmenu": null
      }
    ]
  }
]

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


🖥️ Ejemplo de uso en una escena A-Frame
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

  <!-- Activación del hand-tracking -->
  <a-entity hand-tracking-controls="hand: left"></a-entity>
  <a-entity hand-tracking-controls="hand: right"></a-entity>
</a-scene>

🎛️ Parámetros de configuración disponibles
Puedes personalizar fácilmente las características visuales y estructurales del menú directamente desde los atributos en el HTML:

| Parámetro            | Descripción                                     | Valor por defecto                         |
| -------------------- | ----------------------------------------------- | ----------------------------------------- |
| `menu_data_path`     | Ruta al archivo `.json` de configuración.       | `./menu_data.json`                        |
| `menu_width`         | Anchura del menú (en metros).                   | `0.6`                                     |
| `menu_heigth`        | Altura total del menú (en metros).              | `0.4`                                     |
| `button_height`      | Altura de los botones individuales (en metros). | `0.025`                                   |
| `button_color`       | Color de fondo de los botones.                  | `#3B82F6` (azul profesional)              |
| `button_label_color` | Color del texto de los botones.                 | `#FFFFFF` (blanco, alto contraste)        |
| `menu_color`         | Color de fondo del menú.                        | `#374151` (gris oscuro elegante)          |
| `menu_label_color`   | Color del texto del menú principal.             | `#93C5FD` (azul claro, lectura agradable) |
| `arrow_color`        | Color de las flechas de navegación.             | `#F59E0B` (naranja intenso)               |

## ✨ Interacción

La detección de interacción manual funciona mediante el componente `pressable`, que se basa en el seguimiento de la posición de la punta del dedo índice.

Cuando el dedo se acerca a un botón u otro elemento interactivo a una distancia inferior al umbral definido, se dispara el evento personalizado `pressedstarted`. Este evento se propaga a lo largo de la escena de A-Frame, permitiendo que otros componentes o scripts puedan capturarlo y reaccionar de forma flexible.

### 🖱️ Funcionamiento del evento `pressedstarted`

- Se activa cuando la punta del dedo índice entra en la zona de interacción de un botón.
- El evento viaja por el árbol de entidades de A-Frame (`event bubbling`), permitiendo ser capturado en diferentes niveles.
- Incluye información relevante como la entidad objetivo y detalles del evento de interacción.
- El sistema permite que diferentes botones u objetos reaccionen de forma independiente al mismo evento.

### 🛠️ Ejemplo práctico: Detectar `pressedstarted`

Puedes capturar el evento en cualquier entidad utilizando el siguiente patrón de código:

```js
AFRAME.registerComponent('mi-componente-interactivo', {
  init: function () {
    // Se vincula el método para que "this" funcione correctamente
    this.onPressStart = this.onPressStart.bind(this);

    // Se añade el listener al evento 'pressedstarted'
    this.el.addEventListener('pressedstarted', this.onPressStart);
  },

  onPressStart: function (evt) {
    var targetEl = evt.target;

    // Comprobamos que el evento se originó en esta misma entidad
    if (targetEl === this.el) {
      console.log("Botón pulsado. Acción personalizada ejecutada.");
      // Aquí puedes definir la acción a realizar, por ejemplo:
      // Abrir un submenú, lanzar un sonido, cambiar de escena, etc.
    }
  }
});

🎨 Personalización
Puedes modificar:

✅ Estilo y forma de los botones mediante rounded-plane.
✅ Imágenes personalizadas en cada botón editando menu_data.json.
✅ Navegación entre menús usando los atributos nextMenu y previousMenu.
✅ Paletas de colores e iconos a tu gusto.

🔄 Navegación avanzada
Flechas de transición entre menús gestionadas con el componente arrow.

Creación de submenús ilimitados, simplemente editando el archivo menu_data.json.

Separación total entre la configuración visual y la lógica interna.

🛡️ Licencia
Este proyecto se distribuye bajo la licencia Apache License 2.0.

Al formar parte de BabiaXR, este sistema es de código abierto, lo que permite su uso, modificación y redistribución siempre respetando los términos de la licencia. Consulta el archivo LICENSE para más detalles.

💡 Recomendaciones
Optimiza las imágenes de los botones para mejorar el rendimiento.

Asegúrate de que el sistema de seguimiento de manos esté correctamente activado.

Evita menús excesivamente complejos en dispositivos de bajo rendimiento.

Utiliza rutas relativas adecuadas en el menu_data.json.

