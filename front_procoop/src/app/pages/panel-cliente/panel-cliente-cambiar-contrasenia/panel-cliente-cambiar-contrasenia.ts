import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-cambiar-contrasenia',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './panel-cliente-cambiar-contrasenia.html',
  styleUrl: './panel-cliente-cambiar-contrasenia.scss',
})
export class PanelClienteCambiarContrasenia {
  mostrarActual = false;
  mostrarNueva = false;
  mostrarRepetir = false;

  form = new FormBuilder().group({
    actual: ['', Validators.required],
    nueva: ['', [Validators.required, Validators.minLength(6)]],
    repetir: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      actual: ['', Validators.required],
      nueva: ['', [Validators.required, Validators.minLength(6)]],
      repetir: ['', Validators.required],
    });
  }

  toggle(tipo: string) {
    if (tipo === 'actual') this.mostrarActual = !this.mostrarActual;
    if (tipo === 'nueva') this.mostrarNueva = !this.mostrarNueva;
    if (tipo === 'repetir') this.mostrarRepetir = !this.mostrarRepetir;
  }

  get passwordsNoCoinciden(): boolean {
    return this.form.value.nueva !== this.form.value.repetir;
  }

  get nivelSeguridad(): string {
    const pass = this.form.value.nueva || '';

    if (pass.length < 6) return 'débil';
    if (pass.match(/[A-Z]/) && pass.match(/[0-9]/)) return 'fuerte';

    return 'media';
  }

  guardar() {
    if (this.form.invalid || this.passwordsNoCoinciden) return;

    this.authService.cambiarContrasenia(this.form.value as { actual: string | null; nueva: string | null; repetir: string | null });
    this.router.navigate(['/panel-cliente-home']);
  }
}
