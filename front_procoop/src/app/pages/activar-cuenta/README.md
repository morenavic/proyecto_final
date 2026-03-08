# Componente Activar Cuenta

## Propósito del componente

El componente **ActivarCuenta** implementa el flujo de activación de una cuenta de usuario.  
Su objetivo es permitir que un usuario registre sus credenciales iniciales (email y contraseña) a partir de un número de cuenta existente, validando los datos ingresados y guiando el proceso hasta la redirección a la pantalla de acceso.

Este componente forma parte del flujo de autenticación inicial del sistema.

---

## Responsabilidades principales

- Mostrar un formulario de activación de cuenta.
- Validar los datos ingresados por el usuario según reglas definidas.
- Proveer feedback visual claro ante errores y estados válidos.
- Simular el envío exitoso del formulario (sin backend).
- Redirigir al usuario a la pantalla de acceso una vez completado el proceso.

---

## Flujo de funcionamiento

1. El componente renderiza un formulario de activación con los campos requeridos.
2. El formulario inicia en estado inválido hasta que se completen correctamente todos los campos.
3. A medida que el usuario interactúa, se muestran mensajes de error específicos por campo.
4. El botón de envío permanece deshabilitado mientras el formulario sea inválido.
5. Al enviar el formulario con datos válidos:
   - Se marca el estado de envío exitoso.
   - Se bloquea el formulario para evitar reenvíos.
   - Se muestra un mensaje de confirmación.
6. Luego de un breve intervalo, el usuario es redirigido a la pantalla de acceso (`/acceso`).

---

## Inputs / Outputs

Este componente no expone `@Input()` ni `@Output()`.

Todo el estado y comportamiento se gestiona de forma interna, ya que el flujo es autocontenido y no requiere comunicación directa con otros componentes.

---

## Dependencias importantes

- **Reactive Forms**: utilizado para centralizar el estado y las validaciones del formulario.
- **Router**: utilizado para redirigir al usuario luego de completar la activación.
- **Validador custom (`contraseniasIguales`)**: encargado de validar la coincidencia entre contraseña y confirmación.

---

## Decisiones técnicas relevantes

- Las validaciones se concentran en el formulario y no en la vista, para mantener una lógica clara y testeable.
- La validación de contraseñas se implementa a nivel formulario para permitir una comparación cruzada entre campos.
- El feedback visual se muestra solo luego de la interacción del usuario, evitando mensajes prematuros.
- El envío se simula sin backend para permitir completar el flujo y validar la experiencia de usuario.
- La redirección se ejecuta de forma diferida para reforzar visualmente el cierre del proceso.

---

## Consideraciones adicionales

- El componente está preparado para integrarse fácilmente con un backend real en una etapa posterior.
- El flujo completo cuenta con tests unitarios que validan tanto reglas de negocio como navegación.
- La estructura del componente prioriza claridad, mantenibilidad y experiencia de usuario.
