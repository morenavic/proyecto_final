import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelClienteCambiarContrasenia } from './panel-cliente-cambiar-contrasenia';
import { provideRouter, Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { AuthService } from '../../../services/auth.service';

class AuthServiceMock {
  cambiarContrasenia = jasmine.createSpy('cambiarContrasenia');
}

describe('PanelClienteCambiarContrasenia', () => {
  let component: PanelClienteCambiarContrasenia;
  let fixture: ComponentFixture<PanelClienteCambiarContrasenia>;
  let authService: AuthServiceMock;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelClienteCambiarContrasenia],
      providers: [
        provideRouter([]),
        { provide: AuthService, useClass: AuthServiceMock }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelClienteCambiarContrasenia);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as any;
    router = TestBed.inject(Router);

    spyOn(router, 'navigate');

    fixture.detectChanges();
  });

  /* =========================
     CREACIÓN
     ========================= */

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  /* =========================
     FORM
     ========================= */

  it('el formulario debería iniciar inválido', () => {
    expect(component.form.invalid).toBeTrue();
  });

  it('debería ser válido con datos correctos', () => {
    component.form.setValue({
      actual: '123456',
      nueva: 'Abc123',
      repetir: 'Abc123'
    });

    expect(component.form.valid).toBeTrue();
    expect(component.passwordsNoCoinciden).toBeFalse();
  });

  it('debería detectar contraseñas distintas', () => {
    component.form.setValue({
      actual: '123456',
      nueva: 'Abc123',
      repetir: 'Otra123'
    });

    expect(component.passwordsNoCoinciden).toBeTrue();
  });

  /* =========================
     SEGURIDAD
     ========================= */

  it('contraseña débil', () => {
    component.form.controls.nueva.setValue('123');
    expect(component.nivelSeguridad).toBe('débil');
  });

  it('contraseña fuerte', () => {
    component.form.controls.nueva.setValue('Abc123');
    expect(component.nivelSeguridad).toBe('fuerte');
  });

  /* =========================
     TOGGLE
     ========================= */

  it('toggle de contraseña actual', () => {
    component.toggle('actual');
    expect(component.mostrarActual).toBeTrue();

    component.toggle('actual');
    expect(component.mostrarActual).toBeFalse();
  });

  /* =========================
     DOM
     ========================= */

  it('renderiza 3 inputs', () => {
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    expect(inputs.length).toBe(3);
  });

  it('muestra error si no coinciden', () => {
    component.form.setValue({
      actual: '123456',
      nueva: 'Abc123',
      repetir: 'Otra123'
    });

    fixture.detectChanges();

    const error = fixture.debugElement.query(By.css('.error'));
    expect(error).toBeTruthy();
  });

  /* =========================
     SUBMIT
     ========================= */

  it('NO debería ejecutar guardar si el form es inválido', () => {
    component.guardar();

    expect(authService.cambiarContrasenia).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('NO debería ejecutar guardar si las contraseñas no coinciden', () => {
    component.form.setValue({
      actual: '123456',
      nueva: 'Abc123',
      repetir: 'Otra123'
    });

    component.guardar();

    expect(authService.cambiarContrasenia).not.toHaveBeenCalled();
  });

  it('debería ejecutar guardar correctamente', () => {
    component.form.setValue({
      actual: '123456',
      nueva: 'Abc123',
      repetir: 'Abc123'
    });

    component.guardar();

    expect(authService.cambiarContrasenia).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/panel-cliente-home']);
  });

});
