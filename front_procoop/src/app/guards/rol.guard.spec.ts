import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { rolGuard } from './rol.guard';
import { AuthService } from '../services/auth.service';

/*
  Tests unitarios del rolGuard.

  El objetivo es validar que el guard:
  - permita el acceso cuando el rol del usuario coincide
  - bloquee el acceso cuando el rol no coincide
  - bloquee el acceso si no existe sesión activa

  No se testea navegación real, solo el comportamiento lógico.
*/
describe('rolGuard', () => {
  let authService: AuthService;
  let router: Router;

  // State mock (no se usa en la lógica del guard)
  const stateMock = {} as RouterStateSnapshot;

  /*
    Helper para crear rutas mock con el rol esperado.
    Simula el uso de `data.rol` definido en el routing real.
  */
  const crearRutaMock = (rol: 'admin' | 'cliente') => {
    const route = new ActivatedRouteSnapshot();
    route.data = { rol };
    return route;
  };

  beforeEach(() => {
    /*
      Se configura el entorno de test con:
      - Router mockeado
      - AuthService real, controlado mediante spies
    */
    TestBed.configureTestingModule({
      providers: [provideRouter([]), AuthService],
    });

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  /*
    Si existe sesión y el rol coincide con el requerido
    por la ruta, el guard debe permitir la navegación.
  */
  it('debería permitir acceso si el rol coincide', () => {
    spyOn(authService, 'obtenerSesion').and.returnValue({
      email: 'admin@cooperativa.com',
      rol: 'admin',
    });

    const resultado = TestBed.runInInjectionContext(() =>
      rolGuard(crearRutaMock('admin'), stateMock)
    );

    expect(resultado).toBeTrue();
  });

  /*
    Si existe sesión pero el rol no coincide con el esperado,
    el guard debe bloquear el acceso y redirigir al acceso.
  */
  it('debería bloquear acceso si el rol NO coincide', () => {
    spyOn(authService, 'obtenerSesion').and.returnValue({
      email: 'cliente@cooperativa.com',
      rol: 'cliente',
    });

    const spyNavigate = spyOn(router, 'navigate');

    const resultado = TestBed.runInInjectionContext(() =>
      rolGuard(crearRutaMock('admin'), stateMock)
    );

    expect(resultado).toBeFalse();
    expect(spyNavigate).toHaveBeenCalledWith(['/acceso']);
  });

  /*
    Si no existe sesión activa, el guard debe bloquear
    el acceso independientemente del rol solicitado.
  */
  it('debería bloquear acceso si no hay sesión', () => {
    spyOn(authService, 'obtenerSesion').and.returnValue(null);
    const spyNavigate = spyOn(router, 'navigate');

    const resultado = TestBed.runInInjectionContext(() =>
      rolGuard(crearRutaMock('cliente'), stateMock)
    );

    expect(resultado).toBeFalse();
    expect(spyNavigate).toHaveBeenCalledWith(['/acceso']);
  });
});
