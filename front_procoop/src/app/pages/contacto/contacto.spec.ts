import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { Contacto } from './contacto';
import { provideRouter } from '@angular/router';

describe('Contacto', () => {
  let component: Contacto;
  let fixture: ComponentFixture<Contacto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Contacto],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Contacto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*
    Verifica que el componente pueda instanciarse correctamente.
    Este test asegura que no existan errores de configuración,
    dependencias o template.
  */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*
    El formulario debe iniciar inválido.
    Garantiza que las validaciones del lado cliente
    se apliquen desde el estado inicial.
  */
  it('debe iniciar con el formulario inválido', () => {
    expect(component.contactoForm.valid).toBeFalse();
  });

  /*
    El formulario se considera válido cuando
    los campos obligatorios contienen datos correctos.
    Este test valida las reglas principales del formulario.
  */
  it('debe ser válido cuando los campos obligatorios están completos', () => {
    component.contactoForm.setValue({
      nombre: 'Juan Pérez',
      email: 'juan@test.com',
      mensaje: 'Mensaje de prueba',
    });

    expect(component.contactoForm.valid).toBeTrue();
  });

  /*
    Al enviar el formulario válido, se debe activar
    el estado de envío.
    Este comportamiento simula el inicio de una
    operación asincrónica (envío al backend).
  */
  it('debe marcar enviando como true al enviar el formulario', () => {
    component.contactoForm.setValue({
      nombre: 'Juan Pérez',
      email: 'juan@test.com',
      mensaje: 'Mensaje de prueba',
    });

    component.enviarFormulario();

    expect(component.enviando).toBeTrue();
  });

  /*
    Simula el flujo completo de un envío exitoso.
    Se utiliza fakeAsync para controlar el tiempo
    de la simulación asincrónica.

    En el futuro, este test podría adaptarse para
    validar la respuesta real de un backend.
  */
  it('debe resetear el formulario luego de un envío exitoso', fakeAsync(() => {
    component.contactoForm.setValue({
      nombre: 'Juan Pérez',
      email: 'juan@test.com',
      mensaje: 'Mensaje de prueba',
    });

    component.enviarFormulario();

    tick(1500);

    expect(component.envioExitoso).toBeTrue();
    expect(component.contactoForm.value).toEqual({
      nombre: null,
      email: null,
      mensaje: null,
    });
  }));
});
