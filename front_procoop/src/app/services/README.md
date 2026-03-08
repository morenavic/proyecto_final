# Services de la aplicación

## Propósito del componente

Los **Services** concentran la lógica de negocio y la gestión de datos compartidos del sistema.  
Su objetivo es desacoplar los componentes visuales de la lógica funcional, manteniendo una arquitectura clara y mantenible.

Funcionan como la **fuente única de verdad** del estado y comportamiento del sistema.

Dentro de esta capa se encuentra el **AuthService**, encargado de centralizar toda la lógica de autenticación y sesión de usuarios.

---

## Responsabilidades principales

- Gestionar la autenticación y el estado de sesión mediante `AuthService`.
- Proveer métodos reutilizables a componentes y guards.
- Centralizar reglas de negocio del sistema.
- Simular o consumir fuentes de datos externas.
- Mantener coherencia y seguridad en el manejo de información sensible.

---

## Flujo de funcionamiento

1. Un componente o guard solicita una acción a un service.
2. El service correspondiente procesa la lógica solicitada.
3. En el caso de autenticación:
   - `AuthService` valida credenciales.
   - Determina el estado de sesión y el rol del usuario.
4. Se valida el estado o los datos involucrados.
5. Se devuelve el resultado al solicitante.
6. El componente decide cómo reflejar el resultado en la UI.

---

## Inputs / Outputs

- Métodos públicos expuestos por los services para componentes y guards.
- Respuestas estructuradas que representan:
  - Estado de autenticación.
  - Datos de usuario (incluyendo rol).
  - Estados de sesión.

---

## Dependencias importantes

- **Componentes**
  - Consumen los métodos de los services para ejecutar acciones del sistema.

- **Guards**
  - Consultan principalmente a `AuthService` para validar acceso a rutas.

- **AuthService**
  - Servicio central de autenticación.
  - Maneja login, logout y persistencia de sesión.
  - Provee información del usuario autenticado y su rol.

- **Persistencia local**
  - Utilizada para mantener la sesión activa entre recargas (si aplica).

---

## Decisiones técnicas relevantes

- `AuthService` actúa como punto único de autenticación del sistema.
- Los componentes no gestionan lógica de sesión ni roles directamente.
- Separación estricta entre lógica de presentación y lógica de negocio.
- Los services están diseñados para migrar a backend real sin refactorizar componentes.
- Se evita duplicación de lógica centralizando comportamiento en services.

---

## Consideraciones adicionales

- Esta arquitectura facilita testing unitario de lógica crítica.
- Permite escalar la aplicación agregando nuevos services sin impacto en la UI.
- `AuthService` puede evolucionar para manejar tokens, expiración de sesión o refresh sin modificar componentes.
- Refuerza una arquitectura limpia, mantenible y orientada a crecimiento.
