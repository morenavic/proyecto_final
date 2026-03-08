import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acceso',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './acceso.html',
  styleUrl: './acceso.scss',
})
export class Acceso {
  /* Formulario de acceso.
     Centraliza la validación de credenciales y evita lógica dispersa en la vista. */
  formAcceso: FormGroup;

  /* Estado de carga del login.
     Se utiliza para bloquear acciones y dar feedback visual al usuario. */
  cargando = false;

  /* Control de visibilidad del modal de feedback UX. */
  mostrarModal = false;

  /* Mensaje dinámico mostrado dentro del modal. */
  mensajeModal = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    /* Inicialización del formulario.
       Se definen validaciones mínimas para evitar requests innecesarios */
    this.formAcceso = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /* Flujo principal de inicio de sesión.
     Controla validación, feedback UX, autenticación y redirección final. */
  iniciarSesion(): void {
    if (this.formAcceso.invalid) {
      this.formAcceso.markAllAsTouched();
      this.abrirModal('Revisá los datos ingresados');
      return;
    }

    this.cargando = true;

    const { email, password } = this.formAcceso.value;

    // ⚠️ Revisar cuando haya backend real (ahora es mock)
    const usuario = this.authService.login(email, password);

    /* Delay intencional para simular respuesta real
       y mejorar la percepción de proceso en el usuario.
       ⚠️ Se va cuando haya back real ya que el loading se maneja con la respuesta HTTP*/
    setTimeout(() => {
      this.cargando = false;

      if (!usuario) {
        this.abrirModal('Email o contraseña incorrectos');
        return;
      }

      this.redirigirSegunRol(usuario.rol);
    }, 800);
  }

  /* Centraliza la apertura del modal de feedback.
     Permite reutilizar el mismo componente visual
     para distintos estados del flujo. */
  private abrirModal(mensaje: string): void {
    this.mensajeModal = mensaje;
    this.mostrarModal = true;
  }

  /* Cierre explícito del modal.
     Restaura el estado visual del acceso. */
  cerrarModal(): void {
    this.mostrarModal = false;
    this.mensajeModal = '';
  }

  /* Redirección según rol asignado por el sistema.
     El componente no decide roles, solo reacciona
     a la información provista por el servicio de autenticación. */
  private redirigirSegunRol(rol: string): void {
    if (rol === 'cliente') {
      this.router.navigate(['/panel-cliente-home']);
    } else {
      this.router.navigate(['/panel-admin-home']);
    }
  }

  /* Cierre de sesión manual.
     Limpia el estado de autenticación y retorna al acceso. */
  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/acceso']);
  }
}
