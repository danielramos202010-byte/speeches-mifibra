# Speeches MiFibra (v3.0)

Extensión de Chrome con fichas de respuesta rápida para chat de ventas de fibra
óptica. Los speeches **viven en este repositorio** (`speeches.json`): el administrador
los edita desde la propia extensión y publica; cada asesor los recibe al abrir.

## Cómo funciona la sincronización

- **Asesores (solo lectura):** al abrir la extensión descargan `speeches.json` del
  repo (raw de GitHub, sin token). Si no hay internet, usan la última copia en
  caché; y si nunca cargaron, usan los speeches de respaldo incluidos en la extensión.
- **Administrador:** en *Ajustes → 🔒 Modo administrador* puede agregar / editar /
  quitar speeches y **Publicar a todos** (hace un commit a `speeches.json` vía la
  API de GitHub). Los demás lo ven en ~5 min (caché del CDN de GitHub).

## Instalación (una sola vez)

1. **Edita `config.js`** y pon tu usuario y repo de GitHub:
   ```js
   const REMOTE_CONFIG = {
     owner:  'TU_USUARIO_GITHUB',
     repo:   'speeches-mifibra',
     branch: 'main',
     path:   'speeches.json'
   };
   ```
2. **Sube esta carpeta** a un repositorio **público** de GitHub con ese mismo nombre.
3. **Carga la extensión** en Chrome: `chrome://extensions` → activa *Modo
   desarrollador* → *Cargar descomprimida* → selecciona esta carpeta.
   (Repite este paso en la PC de cada asesor, o distribúyela empaquetada.)

## Publicar cambios (solo el administrador)

1. Crea un **token de acceso** en GitHub:
   *Settings → Developer settings → Fine-grained tokens → Generate new token*
   - Repository access: **solo este repo**.
   - Permisos: **Contents → Read and write**.
2. En la extensión: *Ajustes → 🔒 Modo administrador*, pega el token (se guarda solo
   en tu PC), edita los speeches y pulsa **🚀 Publicar a todos**.

> El token es personal y secreto. No se sube al repo ni lo ve ningún asesor.

## Archivos

| Archivo         | Rol |
|-----------------|-----|
| `manifest.json` | Manifiesto MV3 (permisos y metadatos). |
| `popup.html`    | Interfaz del popup + estilos. |
| `config.js`     | Usuario/repo de GitHub (editar aquí). |
| `data.js`       | Zonas y precios por región (oferta dinámica). |
| `popup.js`      | Lógica principal + lectura remota + respaldo. |
| `admin.js`      | Panel de administrador (CRUD + publicación). |
| `speeches.json` | **Fuente de verdad** de los speeches (editable por el admin). |
