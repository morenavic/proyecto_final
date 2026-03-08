import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.scss',
})
export class Contacto {
  /*
    Estados de UI del formulario.
    Permiten controlar el feedback visual durante
    el proceso de envío.
  */
  enviando = false;
  envioExitoso = false;
  envioError = false;

  /*
    Inyección del FormBuilder.
    Se utiliza para centralizar la definición del formulario
    y facilitar su mantenimiento.
  */
  private fb = inject(FormBuilder);

  /*
    Definición del formulario de contacto.
    Incluye validaciones del lado cliente para garantizar
    datos mínimos y coherentes antes del envío.
  */
  contactoForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    mensaje: ['', Validators.maxLength(500)],
  });

  /*
    Maneja el envío del formulario.
    Actualmente simula una operación asincrónica desde el frontend.

    Cuando exista un backend real, esta lógica será reemplazada
    por una llamada a un servicio HTTP y el manejo de su respuesta.
  */
  enviarFormulario() {
    if (this.contactoForm.invalid) {
      // Fuerza la visualización de errores en caso de intento de envío inválido
      this.contactoForm.markAllAsTouched();
      return;
    }

    // Reset de estados antes de iniciar el envío
    this.enviando = true;
    this.envioExitoso = false;
    this.envioError = false;

    // Simulación de envío (equivalente a una llamada HTTP)
    setTimeout(() => {
      const envioOk = true; // Este valor representará la respuesta real del backend

      this.enviando = false;

      if (envioOk) {
        this.envioExitoso = true;
        this.contactoForm.reset();
      } else {
        this.envioError = true;
      }
    }, 1500);
  }
}
