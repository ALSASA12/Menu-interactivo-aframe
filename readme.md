# 🎨 Design Room - Menú 3D Personalizable para A-Frame
---

## 🚀 Instalación

Instala la librería mediante npm:

```bash
npm install design-room
```

O inclúyelo directamente en el navegador:

```html
<script src="./ruta/a/design-room/index.js"></script>
```

---

## 🛠️ Uso Básico

1️⃣ Crea un archivo `menu_data.json` en el mismo directorio que tu archivo `.html`.  
2️⃣ Define tus menús de manera jerárquica.  
3️⃣ La librería generará el menú automáticamente al cargar la escena.

**Ejemplo mínimo de `menu_data.json`:**

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

**Ejemplo de uso en HTML:**

```html
<html>
  <head>
    <script src="https://aframe.io/releases/1.5.0/aframe.min.js"></script>
    <script src="./node_modules/design-room/index.js"></script>
  </head>
  <body>
    <a-scene>
      <!-- Aquí se mostrará el menú generado -->
    </a-scene>
  </body>
</html>
```

---

## 📁 Estructura del JSON - Explicación Completa

Cada menú o submenú se define como un objeto dentro del array principal:

| Campo           | Descripción                                                                               |
|-----------------|-------------------------------------------------------------------------------------------|
| `menuId`       | Identificador único del menú. Utilizado para vincular submenús.                          |
| `menuLabel`    | Texto que aparece como título visible del menú.                                          |
| `activo`       | Si es `true`, este menú se muestra al inicio. Solo uno debe tener `activo: true`.        |
| `submenu`    | Si es un submenú, indica el `menuId` del menú padre. Si es principal, se deja en `null`.|
| `nextMenu`| `menuId` del siguiente menú en la secuencia. Puede ser `null`.                           |
| `previousMenu` | `menuId` del menú anterior. Puede ser `null`.                                            |
| `buttons`      | Array de botones que componen el menú. Cada uno puede tener acción o abrir un submenú.   |

**Dentro de cada botón:**

| Campo          | Descripción                                                                  |
|----------------|------------------------------------------------------------------------------|
| `id`           | Identificador único del botón.                                               |
| `label`        | Texto visible en el botón.                                                   |
| `action`       | Acción que se ejecuta al pulsar el botón. Puede ser `null` si abre submenú. |
| `img`          | Ruta de la imagen que aparece en el botón.                                   |
| `openSubmenu`  | Si abre un submenú, indica el `menuId` correspondiente. `null` si no aplica.|

---

## ✨ Características

✅ Generación automática de menús en A-Frame  
✅ Soporte para submenús encadenados y navegación cíclica  
✅ Imágenes personalizadas en los botones  
✅ Configuración 100% mediante JSON  
✅ Compatible con proyectos de realidad virtual y 3D en navegador  

---

## 🤝 Contribuciones

¿Quieres mejorar el proyecto? ¡Pull requests y sugerencias son bienvenidas!  
Puedes abrir un `Issue` o proponer mejoras directamente.


