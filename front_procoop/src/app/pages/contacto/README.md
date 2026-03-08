# Componente Contacto

## Propósito del componente

El componente **Contacto** implementa la sección de contacto institucional de la aplicación. Su objetivo es permitir que un usuario envíe una consulta básica a la empresa a través de un formulario, brindando feedback claro sobre el estado del envío y manteniendo buenas prácticas de validación y accesibilidad.

Este componente está pensado como una solución **frontend-only**, preparada para una futura integración con un backend real.

---

## Responsabilidades principales

* Mostrar un formulario de contacto con validaciones del lado cliente.
* Gestionar el estado del envío del formulario (enviando, éxito, error).
* Proveer feedback visual claro al usuario según el estado del proceso.
* Mostrar información de contacto adicional y un mapa embebido de ubicación.
* Mantener un diseño responsive y accesible.

---

## Flujo de funcionamiento

1. El usuario completa el formulario de contacto.
2. Las validaciones del lado cliente se ejecutan al interactuar con los campos.
3. Al enviar:

   * Si el formulario es inválido, se muestran los errores correspondientes.
   * Si el formulario es válido:

     * Se activa el estado `enviando`.
     * Se simula una operación asincrónica de envío.
4. Finalizada la simulación:

   * En caso exitoso, se muestra un mensaje de confirmación y se resetea el formulario.
   * En caso de error, se muestra un mensaje informativo al usuario.

---

## Inputs / Outputs

Este componente **no recibe inputs ni emite outputs**.

La lógica de contacto está encapsulada dentro del propio componente y no depende de componentes padres.

---

## Dependencias importantes

* **ReactiveFormsModule**: para la gestión del formulario y validaciones.
* **CommonModule**: para directivas estructurales utilizadas en la vista.
* **FormBuilder**: para la creación y mantenimiento del formulario.

No se utilizan servicios externos ni llamadas HTTP en esta implementación.

---

## Decisiones técnicas relevantes

* Se utilizó **Reactive Forms** para facilitar validaciones, control de estados y futura integración con backend.
* El envío del formulario se implementó como una **simulación asincrónica**, representando el comportamiento esperado de una llamada HTTP.
* Se limitaron los datos solicitados al usuario a información básica (nombre, email y mensaje) para evitar el manejo de datos sensibles.
* El mapa se integró mediante un `iframe` simple para evitar dependencias adicionales.
* El feedback al usuario se maneja mediante estados explícitos (`enviando`, `envioExitoso`, `envioError`).

---

## Consideraciones futuras (integración backend)

Cuando exista un backend real:

* La lógica dentro del método `enviarFormulario()` deberá reemplazar la simulación (`setTimeout`) por una llamada a un servicio HTTP.
* Los estados de envío se mapearán a la respuesta real del servidor.
* El reseteo del formulario dependerá de la confirmación del backend.
* Podrá agregarse manejo de errores más específico según el tipo de respuesta.

El diseño actual del componente ya contempla estos cambios sin requerir refacto
