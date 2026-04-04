import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RecuperarContrasenia } from './recuperar-contrasenia';
import { provideRouter } from '@angular/router';

describe('RecuperarContrasenia', () => {
  let component: RecuperarContrasenia;
  let fixture: ComponentFixture<RecuperarContrasenia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuperarContrasenia],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarContrasenia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*
    Test base de inicialización del componente.
  */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*
    Verifica estado inicial del formulario.
    Decisión: iniciar inválido para forzar validación antes de enviar.
  */
  it('debería iniciar inválido', () => {
    expect(component.formulario.invalid).toBeTrue();
  });

  /*
    Validación del campo email.
    Cubre:
    - requerido
    - formato
    - caso válido
  */
  it('debería validar email correctamente', () => {
    const email = component.email;

    email?.setValue('');
    expect(email?.valid).toBeFalse();

    email?.setValue('email-invalido');
    expect(email?.valid).toBeFalse();

    email?.setValue('test@mail.com');
    expect(email?.valid).toBeTrue();
  });

  /*
    Validación del número de cuenta.
    Decisión: restringir a valores numéricos válidos.
  */
  it('debería validar número de cuenta (solo números)', () => {
    const numero = component.numeroCuenta;

    numero?.setValue('');
    expect(numero?.valid).toBeFalse();

    numero?.setValue('abc');
    expect(numero?.valid).toBeFalse();

    numero?.setValue('12345');
    expect(numero?.valid).toBeTrue();
  });

  /*
    Flujo: submit bloqueado si el formulario es inválido.
    Evita ejecuciones innecesarias de lógica.
  */
  it('no debería enviar si el formulario es inválido', () => {
    spyOn(console, 'log');

    component.enviar();

    expect(console.log).not.toHaveBeenCalled();
    expect(component.cargando).toBeFalse();
  });

  /*
    Flujo completo de envío exitoso (simulado).
    Decisiones testeadas:
    - cambio de estado (cargando)
    - ejecución diferida (setTimeout)
    - feedback al usuario (mensaje)
    - limpieza del formulario
  */
  it('debería enviar correctamente si el formulario es válido', fakeAsync(() => {
    spyOn(console, 'log');

    component.formulario.setValue({
      email: 'test@mail.com',
      numeroCuenta: '12345',
    });

    component.enviar();

    expect(component.cargando).toBeTrue();

    tick(1200); // simula el setTimeout

    expect(console.log).toHaveBeenCalled();
    expect(component.cargando).toBeFalse();
    expect(component.mensaje).toContain('recibirás un email');
    expect(component.formulario.value.email).toBeNull();
  }));

  /*
    🔄 FUTURO BACKEND

    - Reemplazar el uso de console.log por llamada real a servicio (AuthService).
    - Mockear el servicio en tests (spyOn + observables).
    - Validar escenarios:
      - éxito (respuesta OK)
      - error (mensaje de fallo)
  */
});
