import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

/*
  Componente encargado del cambio de contraseña del usuario.

  Responsabilidades:
  - Manejar formulario reactivo y validaciones básicas
  - Controlar visibilidad de contraseñas (UX)
  - Validar coincidencia de campos
  - Delegar la actualización al AuthService
  - Redirigir al usuario tras la acción
*/
@Component({
  selector: 'app-cambiar-contrasenia',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './panel-cliente-cambiar-contrasenia.html',
  styleUrl: './panel-cliente-cambiar-contrasenia.scss',
})
export class PanelClienteCambiarContrasenia {
  /*
    Estados de UI para mostrar/ocultar contraseñas.
    Mejora la experiencia del usuario.
  */
  mostrarActual = false;
  mostrarNueva = false;
  mostrarRepetir = false;

  /*
    Formulario reactivo:
    Se inicializa en el constructor porque depende de FormBuilder inyectado.
    ⚠️ En backend real: las validaciones deben reforzarse del lado servidor.
  */
  form: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    /*
      Inicialización correcta del formulario.
      Evita el error: "fb se usa antes de su inicialización".
    */
    this.form = this.fb.group({
      actual: ['', Validators.required],
      nueva: ['', [Validators.required, Validators.minLength(6)]],
      repetir: ['', Validators.required],
    });
  }

  /*
    Alterna visibilidad de inputs según el tipo.
    Centraliza la lógica para evitar duplicación.
  */
  toggle(tipo: string) {
    if (tipo === 'actual') this.mostrarActual = !this.mostrarActual;
    if (tipo === 'nueva') this.mostrarNueva = !this.mostrarNueva;
    if (tipo === 'repetir') this.mostrarRepetir = !this.mostrarRepetir;
  }

  /*
    Valida que las contraseñas coincidan.
    Se usa como getter para simplificar el template.
  */
  get passwordsNoCoinciden(): boolean {
    return this.form.value.nueva !== this.form.value.repetir;
  }

  /*
    Calcula nivel de seguridad de la contraseña.
    Lógica simple orientada a UX (feedback visual).
    ⚠️ En backend real: reemplazar por validación robusta.
  */
  get nivelSeguridad(): string {
    const pass = this.form.value.nueva || '';

    if (pass.length < 6) return 'débil';
    if (pass.match(/[A-Z]/) && pass.match(/[0-9]/)) return 'fuerte';

    return 'media';
  }

  /*
    Maneja el submit del formulario:
    - valida estado del form
    - valida coincidencia de contraseñas
    - delega lógica al AuthService
    - redirige al usuario

    ⚠️ En backend real:
    - manejar errores (response del servidor)
    - mostrar feedback al usuario (mensaje/toast)
    - controlar estado de carga (loading)
  */
  guardar() {
    if (this.form.invalid || this.passwordsNoCoinciden) return;

    this.authService.cambiarContrasenia(
      this.form.value as {
        actual: string | null;
        nueva: string | null;
        repetir: string | null;
      },
    );

    this.router.navigate(['/panel-cliente-home']);
  }
}
