# Componente Empresa

## Propósito del componente

El componente **Empresa** representa la pantalla institucional “Nuestra empresa”.
Su objetivo es comunicar información corporativa clave (quiénes somos, perfil, filosofía, valores y certificaciones) reforzando credibilidad y posicionamiento de la organización.

Es un componente principalmente **informativo y presentacional**, sin lógica de negocio ni interacción compleja.

---

## Responsabilidades principales

- Mostrar contenido institucional de la empresa de forma clara y legible.
- Organizar información extensa en bloques visuales diferenciados.
- Reforzar confianza mediante datos de experiencia y certificaciones.
- Mantener una estética sobria, profesional y coherente con el sistema de diseño global.

---

## Flujo de funcionamiento

1. Al renderizar la pantalla, se muestra el encabezado con el título y el bloque de experiencia.
2. El cuerpo principal se divide en:
   - Un bloque de texto descriptivo con imágenes de apoyo.
   - Un bloque lateral de filosofía institucional en formato de tarjetas.
3. El enlace al certificado de calidad abre un PDF estático en una nueva pestaña.
4. El banner final cierra la sección reforzando trayectoria y posicionamiento institucional.

No existen estados internos ni flujos condicionales en esta versión.

---

## Inputs / Outputs

Este componente **no recibe Inputs ni emite Outputs**.

Todo el contenido es estático en esta etapa del proyecto.

---

## Dependencias importantes

- Variables y estilos definidos en el sistema de diseño global.
- Clases utilitarias reutilizables (`modo-contenedor`, tipografías, botones).
- Archivo PDF estático servido desde la carpeta `public/docs`.

No depende de servicios ni librerías externas.

---

## Decisiones técnicas relevantes

- Se separó claramente el contenido descriptivo del bloque de filosofía para mejorar escaneo visual.
- Se utilizaron tarjetas para información institucional resumida (misión, calidad, valores).
- El certificado de calidad se implementó como enlace directo a un archivo estático, evitando navegación interna.
- El banner final no funciona como CTA, sino como cierre institucional.

---

## Consideraciones futuras (backend)

- Los textos institucionales podrían provenir de un backend o CMS en lugar de estar hardcodeados.
- El bloque de “Años de experiencia” podría transformarse en un dato dinámico.
- Las imágenes podrían servirse desde un backend o CDN.
- El enlace al certificado de calidad podría obtenerse desde una configuración o endpoint en lugar de ser una ruta fija.

Estas modificaciones afectarían principalmente al **HTML del componente**, sin necesidad de cambios estructurales en estilos.
