import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Acceso } from './acceso';
import { provideRouter } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { fakeAsync, tick } from '@angular/core/testing';

/* =====================================================
   Mock de AuthService
   ===================================================== */
/*
  Se utiliza un mock simple del AuthService para aislar
  completamente el componente Acceso de la lógica real
  de autenticación y de la persistencia.

  El objetivo es testear únicamente el comportamiento
  del componente frente a distintos resultados del login
  (éxito admin, éxito cliente, error).
*/
class AuthServiceMock {
  login(email: string, password: string) {
    if (email === 'admin@test.com' && password === '123456') {
      return { rol: 'admin' };
    }

    if (email === 'cliente@test.com' && password === '123456') {
      return { rol: 'cliente' };
    }

    return null;
  }

  logout() {}
}

describe('Acceso', () => {
  let component: Acceso;
  let fixture: ComponentFixture<Acceso>;
  let authService: AuthService;

  beforeEach(async () => {
    /*
      Se configura el TestBed usando el componente standalone,
      inyectando:
      - Router mockeado (necesario para redirecciones)
      - AuthService mockeado (para controlar los escenarios)
    */
    await TestBed.configureTestingModule({
      imports: [Acceso],
      providers: [provideRouter([]), { provide: AuthService, useClass: AuthServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(Acceso);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  /* =====================================================
     Test 1 – creación del componente
     ===================================================== */
  /*
    Verifica que el componente se instancie correctamente
    con la configuración de dependencias definida.
  */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* =====================================================
     Test 2 – formulario inicializado correctamente
     ===================================================== */
  /*
    Valida que el formulario reactivo tenga los controles
    esperados para el login.
  */
  it('debería inicializar el formulario con email y password', () => {
    expect(component.formAcceso).toBeTruthy();
    expect(component.formAcceso.contains('email')).toBeTrue();
    expect(component.formAcceso.contains('password')).toBeTrue();
  });

  /* =====================================================
     Test 3 – formulario inválido
     ===================================================== */
  /*
    Si el formulario es inválido, el componente:
    - No debe intentar autenticarse
    - Debe mostrar feedback al usuario (modal)
  */
  it('no debería intentar login si el formulario es inválido', () => {
    const spyLogin = spyOn(authService, 'login');

    component.iniciarSesion();

    expect(spyLogin).not.toHaveBeenCalled();
    expect(component.mostrarModal).toBeTrue();
  });

  /* =====================================================
     Test 4 – credenciales incorrectas
     ===================================================== */
  /*
    Simula un intento de login con credenciales inválidas
    y valida que se muestre el modal de error correspondiente.
    Se usa fakeAsync para controlar el delay del flujo.
  */
  it('debería mostrar modal si las credenciales son incorrectas', fakeAsync(() => {
    component.formAcceso.setValue({
      email: 'mal@test.com',
      password: '123456',
    });

    component.iniciarSesion();

    tick(800);

    expect(component.mostrarModal).toBeTrue();
    expect(component.mensajeModal).toContain('Email o contraseña incorrectos');
  }));

  /* =====================================================
     Test 5 – login exitoso como admin
     ===================================================== */
  /*
    Verifica que, ante un login válido con rol admin,
    el componente redirija al panel correspondiente.
  */
  it('debería redirigir al panel admin si el rol es admin', fakeAsync(() => {
    const spyNavigate = spyOn((component as any).router, 'navigate');

    component.formAcceso.setValue({
      email: 'admin@test.com',
      password: '123456',
    });

    component.iniciarSesion();
    tick(800);

    expect(spyNavigate).toHaveBeenCalledWith(['/panel-admin-home']);
  }));

  /* =====================================================
     Test 6 – login exitoso como cliente
     ===================================================== */
  /*
    Verifica que, ante un login válido con rol cliente,
    el componente redirija al panel de cliente.
  */
  it('debería redirigir al panel cliente si el rol es cliente', fakeAsync(() => {
    const spyNavigate = spyOn((component as any).router, 'navigate');

    component.formAcceso.setValue({
      email: 'cliente@test.com',
      password: '123456',
    });

    component.iniciarSesion();
    tick(800);

    expect(spyNavigate).toHaveBeenCalledWith(['/panel-cliente-home']);
  }));

  /* =====================================================
     Test 7 – cierre del modal
     ===================================================== */
  /*
    Valida que el método cerrarModal restablezca correctamente
    el estado visual y el mensaje asociado.
  */
  it('cerrarModal debería ocultar el modal y limpiar el mensaje', () => {
    component.mostrarModal = true;
    component.mensajeModal = 'Error';

    component.cerrarModal();

    expect(component.mostrarModal).toBeFalse();
    expect(component.mensajeModal).toBe('');
  });
});
