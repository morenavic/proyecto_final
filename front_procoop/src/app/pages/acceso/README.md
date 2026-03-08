# Componente Acceso

## Propósito del componente

El componente **Acceso** es el punto de entrada al sistema.  
Su objetivo es permitir que un usuario se autentique mediante email y contraseña, brindando una experiencia clara, controlada y profesional, y redirigirlo al panel correspondiente según el rol asignado por el sistema.

Este componente centraliza toda la lógica de **login**, **feedback de usuario** y **primer control de flujo** de la aplicación.

---

## Responsabilidades principales

- Gestionar el formulario de acceso mediante Reactive Forms.
- Validar credenciales antes de intentar autenticación.
- Ejecutar el proceso de login a través del servicio de autenticación.
- Proveer feedback UX claro durante todo el flujo (carga, error, confirmación).
- Redirigir al usuario al panel correspondiente según su rol.
- Mostrar mensajes críticos mediante un modal bloqueante.
- Mantener el componente desacoplado del backend real.

---

## Flujo de funcionamiento

1. El usuario ingresa email y contraseña.
2. Al enviar el formulario:
   - Se valida el estado del formulario.
   - Si es inválido, se muestra un modal con mensaje de corrección.
3. Si el formulario es válido:
   - Se activa el estado de carga.
   - Se ejecuta el login mediante el `AuthService`.
4. Se simula un delay para mejorar la percepción de proceso.
5. Resultado del login:
   - Si falla, se muestra un modal con el error correspondiente.
   - Si es exitoso, se redirige según el rol del usuario:
     - Cliente → panel cliente
     - Administrador → panel administrador
6. El usuario confirma los mensajes del sistema mediante un botón explícito.

---

## Inputs / Outputs

Este componente **no expone Inputs ni Outputs**.

Funciona como pantalla autónoma y controla su propio estado interno, delegando únicamente la autenticación al servicio correspondiente.

---

## Dependencias importantes

- **AuthService**
  - Encargado de autenticar al usuario.
  - Devuelve el usuario con su rol asignado.
  - Maneja la persistencia de sesión.

- **Router**
  - Utilizado para redirección post-login según rol.
  - Utilizado para cierre de sesión.

- **Modal interno**
  - Implementado directamente en el template.
  - Centraliza el feedback crítico del flujo de acceso.

---

## Decisiones técnicas relevantes

- El componente **no decide roles**, solo reacciona a la información provista por el servicio.
- El rol del usuario no proviene del formulario, sino del sistema.
- Se utiliza un **modal bloqueante** para errores en lugar de mensajes inline, priorizando claridad UX.
- El estado de carga se refleja directamente en el botón principal.
- Se simula un delay intencional para una experiencia más realista.
- El componente está preparado para reemplazar el mock por backend real sin refactor.

---

## Consideraciones adicionales

- El método de cierre de sesión se incluye para permitir reutilización del componente en flujos futuros.
- El modal puede evolucionar a un componente reutilizable para otros estados del sistema.
- El componente está pensado como parte del flujo de seguridad inicial de la aplicación, no como simple formulario visual.
