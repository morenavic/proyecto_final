import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ActivarCuenta } from './activar-cuenta';

describe('ActivarCuenta', () => {
  let component: ActivarCuenta;
  let fixture: ComponentFixture<ActivarCuenta>;

  beforeEach(async () => {
    /*
      Configuración del entorno de testing del componente.
      Se utiliza el componente standalone directamente y se provee
      un router simulado para permitir testear la redirección.
    */
    await TestBed.configureTestingModule({
      imports: [ActivarCuenta],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ActivarCuenta);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // =========================
  // Test base del componente
  // =========================
  it('debería crear el componente', () => {
    /*
      Verifica que el componente se instancie correctamente.
      Este test asegura que la configuración general del módulo
      y sus dependencias es válida.
    */
    expect(component).toBeTruthy();
  });

  // =========================
  // Estado inicial del formulario
  // =========================
  it('el formulario debería iniciar inválido', () => {
    /*
      El formulario no debe ser válido al iniciar,
      ya que todos los campos son obligatorios.
      Esto previene envíos incompletos desde el inicio.
    */
    expect(component.activarForm.invalid).toBeTrue();
  });

  // =========================
  // Validación del número de cuenta
  // =========================
  it('debería marcar el número de cuenta como inválido si contiene letras', () => {
    /*
      Se valida que el número de cuenta acepte únicamente valores numéricos.
      Este test cubre una regla de negocio definida en el formulario.
    */
    const control = component.activarForm.get('numeroCuenta');
    control?.setValue('abc');

    expect(control?.invalid).toBeTrue();
  });

  // =========================
  // Validación del email
  // =========================
  it('debería marcar el email como inválido si el formato es incorrecto', () => {
    /*
      Verifica la validación de formato del email.
      Evita que el formulario avance con datos inconsistentes.
    */
    const control = component.activarForm.get('email');
    control?.setValue('email-malo');

    expect(control?.invalid).toBeTrue();
  });

  // =========================
  // Validación cruzada de contraseñas
  // =========================
  it('debería invalidar el formulario si las contraseñas no coinciden', () => {
    /*
      Testea el validador custom a nivel formulario.
      La validación depende de la comparación entre dos campos,
      por lo que se evalúa el estado global del form.
    */
    component.activarForm.setValue({
      numeroCuenta: '12345',
      email: 'test@mail.com',
      password: 'Password1',
      passwordRepeat: 'Password2',
    });

    expect(component.activarForm.invalid).toBeTrue();
    expect(component.activarForm.hasError('contraseniasNoCoinciden')).toBeTrue();
  });

  // =========================
  // Flujo exitoso de activación
  // =========================
  it('debería marcar el envío como exitoso cuando el formulario es válido', () => {
    /*
      Simula el flujo completo con datos válidos.
      Se espera que el componente:
      - marque el envío como exitoso
      - bloquee el formulario para evitar reenvíos
    */
    component.activarForm.setValue({
      numeroCuenta: '12345',
      email: 'test@mail.com',
      password: 'Password1',
      passwordRepeat: 'Password1',
    });

    component.activarCuenta();

    expect(component.envioExitoso).toBeTrue();
    expect(component.activarForm.disabled).toBeTrue();
  });

  // =========================
  // Redirección post-activación
  // =========================
  it('debería redirigir a /acceso luego de un envío exitoso', fakeAsync(() => {
    /*
      Verifica que, luego de una activación exitosa,
      el usuario sea redirigido automáticamente a la pantalla de acceso.
      Se utiliza fakeAsync para controlar el temporizador de la redirección.
    */
    const routerSpy = spyOn((component as any).router, 'navigate');

    component.activarForm.setValue({
      numeroCuenta: '12345',
      email: 'test@mail.com',
      password: 'Password1',
      passwordRepeat: 'Password1',
    });

    component.activarCuenta();
    tick(2000);

    expect(routerSpy).toHaveBeenCalledWith(['/acceso']);
  }));
});
