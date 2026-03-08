# Guards de Autenticación

## Propósito del componente

Los **Guards de Autenticación** controlan el acceso a las rutas protegidas del sistema.  
Su objetivo es garantizar que solo los usuarios con sesión válida puedan navegar por las secciones privadas de la aplicación.

Este componente representa la **segunda capa de control de seguridad**, posterior al login.

---

## Responsabilidades principales

- Verificar si el usuario posee una sesión activa.
- Permitir o bloquear el acceso a rutas protegidas.
- Redirigir automáticamente al componente de acceso cuando corresponde.
- Centralizar la lógica de validación de navegación.

---

## Flujo de funcionamiento

1. El usuario intenta acceder a una ruta protegida.
2. El guard se ejecuta antes de activar la navegación.
3. Se consulta el estado de autenticación mediante el servicio correspondiente.
4. Resultado de la validación:
   - Si el usuario está autenticado, se permite la navegación.
   - Si no lo está, se cancela el acceso y se redirige al componente de acceso.

---

## Inputs / Outputs

Este componente **no expone Inputs ni Outputs**.

Actúa de forma transparente durante la navegación, sin interacción directa con el usuario.

---

## Dependencias importantes

- **AuthService**
  - Provee el estado actual de autenticación.
  - Indica si existe una sesión válida.

- **Router**
  - Utilizado para redirigir al login cuando el acceso es denegado.

---

## Decisiones técnicas relevantes

- El guard **no gestiona estado**, solo consulta y decide.
- No contiene lógica de negocio ni autenticación directa.
- Está diseñado para ser reutilizable en múltiples rutas.
- La validación se mantiene simple para facilitar mantenimiento y escalabilidad.

---

## Consideraciones adicionales

- Permite desacoplar la seguridad de los componentes visuales.
- Facilita agregar nuevos guards (roles, permisos, tiempo de sesión) sin modificar componentes existentes.
- Refuerza la coherencia del flujo de seguridad de la aplicación.
