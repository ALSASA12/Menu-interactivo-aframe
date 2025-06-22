# Design Room

**Design Room** es un menú personalizable para entornos en **A-Frame**, ideal para proyectos de realidad virtual o entornos 3D. El menú se genera automáticamente a partir de un archivo `menu_data.json`, permitiendo definir submenús, botones, acciones e imágenes sin modificar el código fuente.

---

## Instalación

Instala la librería mediante npm:

```bash
npm install design-room
```

O si prefieres usar el script directamente en el HTML:

```html
<script src="./ruta/a/design-room/index.js"></script>
```

---

## Uso

1. Coloca un archivo `menu_data.json` en el mismo directorio que tu archivo `.html`.

**Ejemplo de estructura de `menu_data.json`:**

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

### Explicación de los componentes del JSON

Cada menú o submenú se define como un objeto dentro del array principal:

- **menuId**: Identificador único del menú. Debe ser único y se utiliza para vincular submenús.
- **menuLabel**: Texto que aparecerá como título del menú.
- **activo**: Indica si este menú es el que se muestra inicialmente (`true`) o no (`false`). Solo un menú debe tener `activo: true`.
- **submenuDe**: Si es un submenú, aquí se coloca el `menuId` del menú padre. Si es un menú principal, debe ser `null`.
- **menuSiguiente**: `menuId` del siguiente submenú en la secuencia (para navegación cíclica o por botones "siguiente"). Puede ser `null` si no aplica.
- **menuAnterior**: `menuId` del submenú anterior en la secuencia. Puede ser `null` si no aplica.
- **botones**: Array de objetos que define los botones dentro del menú.

Cada botón tiene los siguientes campos:

- **id**: Identificador único del botón.
- **label**: Texto que aparecerá en el botón.
- **accion**: Acción o evento que se dispara al pulsar el botón. Si no tiene acción y abre un submenú, puede ser `null`.
- **img**: Ruta a la imagen que se mostrará en el botón.
- **abreSubmenu**: Si el botón abre otro submenú, aquí se indica el `menuId` correspondiente. Si no abre submenú, debe ser `null`.

---


2. En tu archivo `.html` importa la librería y A-Frame:

```html
<html>
  <head>
    <script src="https://aframe.io/releases/1.5.0/aframe.min.js"></script>
    <script src="./node_modules/design-room/index.js"></script>
  </head>
  <body>
    <a-scene>
      <!-- Tu entorno 3D -->
    </a-scene>
  </body>
</html>
```

La librería leerá automáticamente el archivo `menu_data.json` y generará el menú en tu escena.

---

## Características

✅ Generación automática de menús en A-Frame  
✅ Soporte para submenús encadenados  
✅ Configuración de imágenes, etiquetas y acciones por botón  
✅ Navegación entre menús (siguiente/anterior)  
✅ Personalización mediante JSON sin tocar el código  

---

## Contribuir

¿Quieres mejorar el proyecto? ¡Pull requests y sugerencias son bienvenidas! Solo asegúrate de que el código sea limpio y funcional.

---

## Licencia

Este proyecto está bajo la licencia ISC.
