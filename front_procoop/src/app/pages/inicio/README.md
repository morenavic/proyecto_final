# Componente: Inicio

## Propósito del componente

El componente **Inicio** representa la pantalla principal de la aplicación.  
Su objetivo es presentar de forma clara e institucional a la empresa y ofrecer accesos directos a las secciones clave del sitio (Productos y Servicios).

Es una vista **principalmente presentacional**, pensada para orientar al usuario y facilitar la navegación inicial.

---

## Responsabilidades principales

- Mostrar el mensaje institucional de la empresa.
- Destacar los accesos principales a:
  - Listado de productos
  - Servicios ofrecidos
- Actuar como punto de entrada visual y funcional de la aplicación.
- Mantener una estructura clara y coherente con el diseño global.

---

## Flujo de funcionamiento

1. Al cargar la ruta asociada al componente, se renderiza el hero principal.
2. Se muestra el título institucional y una breve descripción fija.
3. Se presentan dos tarjetas destacadas con información resumida:
   - Productos
   - Servicios
4. Cada tarjeta contiene un CTA que redirige a su sección correspondiente mediante navegación interna.
5. Se incluye una ilustración decorativa que acompaña visualmente el contenido.

No existen flujos condicionales ni lógica dinámica en esta etapa.

---

## Inputs / Outputs

Este componente **no recibe inputs ni emite outputs**.

Todo el contenido mostrado es estático y definido dentro del propio componente.

---

## Dependencias importantes

- **Router de Angular**  
  Utilizado para la navegación interna mediante `routerLink`.

- **Estilos globales de la aplicación**  
  El componente reutiliza variables de diseño, helpers de layout y estilos de botones definidos a nivel global.

No depende de servicios ni de librerías externas.

---

## Decisiones técnicas relevantes

- Se optó por un componente **presentacional**, sin lógica de negocio.
- Los estilos específicos del hero y de las tarjetas se encapsulan en el SCSS del componente.
- Se evita el uso de estilos inline para mantener separación de responsabilidades.
- Se reutilizan clases globales (`main-contenedor`, `fila`, `nav-link`) para mantener coherencia visual.
- La ilustración se marca como decorativa (`aria-hidden`) al no aportar información funcional.

---

## Consideraciones futuras (backend)

- El texto institucional y los descriptores de productos/servicios podrían obtenerse desde backend (CMS o endpoint de configuración).
- Las tarjetas podrían generarse dinámicamente a partir de datos recibidos desde una API.
- El componente podría evolucionar para mostrar contenido personalizado según el tipo de usuario o estado de sesión.

Actualmente, estas decisiones se mantienen fuera del alcance del componente para preservar su simplicidad.

---

## Notas adicionales

Este componente está pensado como una base estable y fácilmente escalable.  
Cualquier lógica futura debería incorporarse sin romper su rol principal: **introducir y orientar al usuario dentro de la aplicación**.
