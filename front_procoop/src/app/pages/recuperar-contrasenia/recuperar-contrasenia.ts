import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recuperar-contrasenia',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './recuperar-contrasenia.html',
  styleUrl: './recuperar-contrasenia.scss',
})
export class RecuperarContrasenia {
  /*
    Formulario principal del flujo de recuperación.
    Decisión: usar Reactive Forms para centralizar validaciones y estado.
  */
  formulario: FormGroup;

  /*
    Estados de UI controlados manualmente:
    - cargando → bloquea interacción durante envío
    - mensaje / tipoMensaje → feedback al usuario (toast)
  */
  cargando = false;
  mensaje = '';
  tipoMensaje: 'exito' | 'error' | '' = '';

  constructor(private fb: FormBuilder) {
    /*
      Definición del formulario con validaciones.
      Decisión:
      - email: requerido + formato válido
      - numeroCuenta: requerido + solo números (validación explícita)
    */
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      numeroCuenta: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });
  }

  /*
    Getters para simplificar acceso en el template.
    Evita repetir form.get(...) en el HTML.
  */
  get email() {
    return this.formulario.get('email');
  }

  get numeroCuenta() {
    return this.formulario.get('numeroCuenta');
  }

  /*
    Flujo principal del submit:
    1. Validación → marca errores si corresponde
    2. Estado de carga
    3. Simulación de envío
    4. Feedback + limpieza
  */
  enviar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.mensaje = '';
    this.tipoMensaje = '';

    const datos = this.formulario.value;

    /*
      Simulación de request.
      Decisión: usar mensaje genérico para no exponer existencia de usuario.
    */
    console.log('Simulación envío:', datos);

    setTimeout(() => {
      this.cargando = false;

      this.mensaje = 'Si los datos son correctos, recibirás un email 📩';
      this.tipoMensaje = 'exito';

      /*
        Reset del formulario post-envío.
        Limpia estado visual y valores.
      */
      this.formulario.reset();
    }, 1200);
  }

  /*
    🔄 FUTURO BACKEND

    - Reemplazar setTimeout por llamada a servicio (AuthService / API).
    - Manejar respuesta:
      - éxito → mensaje actual
      - error → tipoMensaje = 'error'
    - Posible manejo de errores por campo si backend lo requiere.
  */
}
