# HeaderComponent

## Propósito del componente

El componente **Header** implementa la barra de navegación principal de la aplicación.  
Su función es permitir la navegación entre las secciones principales y gestionar menús desplegables (dropdowns) de forma controlada y predecible.

Es un componente persistente, pensado para estar visible durante toda la navegación del usuario.

---

## Responsabilidades principales

- Mostrar la navegación principal del sitio.
- Gestionar el estado de apertura y cierre de los dropdowns de:
  - Productos
  - Servicios
- Garantizar que solo un dropdown pueda estar abierto a la vez.
- Cerrar los dropdowns al navegar a una opción interna.
- Mantener una experiencia de navegación clara y consistente.

---

## Flujo de funcionamiento

1. El header se renderiza con todos los dropdowns cerrados por defecto.
2. Al interactuar con un botón de dropdown:
   - Se abre o cierra el dropdown correspondiente.
   - Cualquier otro dropdown abierto se cierra automáticamente.
3. Al hacer click en un ítem de un dropdown:
   - Se navega a la ruta seleccionada.
   - El dropdown se cierra explícitamente para evitar estados visuales inconsistentes.
4. La navegación principal utiliza rutas internas sin recarga de página.

---

## Inputs / Outputs

Este componente **no expone Inputs ni Outputs**.

Toda la lógica de estado es interna, ya que el comportamiento del header no depende de datos externos en su implementación actual.

---

## Dependencias importantes

- `RouterLink` y `RouterLinkActive`  
  Utilizados para la navegación interna y el manejo de estados visuales de rutas activas.

No depende de servicios ni de otros componentes para su funcionamiento.

---

## Decisiones técnicas relevantes

- **Estado local del componente**  
  Los dropdowns se manejan con variables booleanas internas para mantener la lógica simple y explícita.

- **Dropdowns mutuamente excluyentes**  
  Se decidió que nunca haya más de un dropdown abierto al mismo tiempo para:
  - Evitar superposición visual
  - Simplificar la experiencia de usuario
  - Reducir estados inválidos de UI

- **Cierre manual al navegar**  
  Los dropdowns se cierran al hacer click en un ítem para asegurar que el estado visual quede limpio tras un cambio de ruta.

- **Separación visual y lógica**  
  El control de apertura puede combinar comportamiento visual (hover/focus) con control explícito desde TypeScript cuando es necesario.

---

## Consideraciones y notas adicionales

- El componente está preparado para escalar agregando nuevos dropdowns siguiendo la misma lógica.
- Si el proyecto creciera, esta lógica podría migrarse a un servicio de layout compartido.
- El CSS asociado está pensado para aislarse fácilmente en estilos del componente sin depender del archivo global.
