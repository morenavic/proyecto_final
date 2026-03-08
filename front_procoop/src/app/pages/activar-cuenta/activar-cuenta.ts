import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { contraseniasIguales } from './validadores';

@Component({
  selector: 'app-activar-cuenta',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './activar-cuenta.html',
  styleUrl: './activar-cuenta.scss',
})
export class ActivarCuenta {
  /*
    Inyección de dependencias mediante inject().
    Se utiliza esta estrategia para mantener el constructor limpio
    y mejorar la legibilidad del componente.
  */
  private fb = inject(FormBuilder);
  private router = inject(Router);

  /*
    Estado visual que indica si el proceso de activación fue exitoso.
    Se utiliza únicamente para controlar feedback en la interfaz.
  */
  envioExitoso = false;

  /*
    Definición del formulario reactivo de activación.
    Incluye:
    - validaciones individuales por campo
    - validación cruzada a nivel formulario para confirmar contraseñas
  */
  activarForm = this.fb.group(
    {
      numeroCuenta: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
        ],
      ],
      passwordRepeat: ['', Validators.required],
    },
    {
      /*
        Validador aplicado a nivel formulario.
        Permite comparar campos relacionados y centralizar la lógica
        de confirmación de contraseña.
      */
      validators: contraseniasIguales,
    }
  );

  /*
    Maneja el envío del formulario de activación.
    El flujo contempla:
    - validación previa
    - marcado de campos tocados en caso de error
    - simulación de envío exitoso
    - bloqueo del formulario
    - redirección diferida para reforzar el feedback visual
  */
  activarCuenta(): void {
    if (this.activarForm.invalid) {
      this.activarForm.markAllAsTouched();
      return;
    }

    // Simulación de persistencia de datos (sin backend)
    console.log(this.activarForm.value);

    this.envioExitoso = true;
    this.activarForm.disable();

    // Redirección posterior para cerrar el flujo de activación
    setTimeout(() => {
      this.router.navigate(['/acceso']);
    }, 2000);
  }
}


/*
  ⚠️ NOTA FUTURA – Integración con backend real

  Al implementar el backend, este componente deberá ajustarse en los siguientes puntos:

  1. Envío de datos
     - Reemplazar la simulación actual (console.log + setTimeout)
       por una llamada a un service de activación.
     - El componente debe delegar la lógica de negocio al service
       y reaccionar únicamente al resultado (éxito / error).

  2. Estado de carga
     - Incorporar un estado de "cargando" mientras se espera la respuesta del backend.
     - Deshabilitar el formulario durante la petición para evitar reenvíos.
     - Eliminar el uso de setTimeout para la redirección.

  3. Manejo de errores del servidor
     - Mostrar mensajes de error globales cuando la API devuelva errores de negocio
       (cuenta inexistente, cuenta ya activada, datos incorrectos, etc.).
     - Mantener habilitado el formulario si ocurre un error para permitir correcciones.

  4. Validaciones
     - Conservar las validaciones de formato en frontend.
     - Delegar las validaciones de negocio reales al backend.
     - Posible incorporación de validaciones asíncronas.

  5. Tests
     - Actualizar los tests para mockear el service de activación.
     - Verificar comportamiento ante respuestas exitosas y errores.
     - Mantener tests de validaciones y flujo de navegación.

  La estructura general del componente no debería cambiar,
  solo extenderse para integrarse con el backend.
*/
