import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

/*
  Tests unitarios del authGuard.

  El objetivo es validar el comportamiento del guard
  ante distintos estados de sesión, sin depender de
  navegación real ni del router de la aplicación.
*/
describe('authGuard', () => {
  let authService: AuthService;
  let router: Router;

  // Mocks simples de route y state (no se usan en la lógica)
  const routeMock = {} as ActivatedRouteSnapshot;
  const stateMock = {} as RouterStateSnapshot;

  beforeEach(() => {
    /*
      Se configura el entorno de test con:
      - Router mockeado
      - AuthService real, pero espiado según el escenario
    */
    TestBed.configureTestingModule({
      providers: [provideRouter([]), AuthService],
    });

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  /*
    Si hay una sesión activa, el guard debe permitir
    la navegación sin redirecciones.
  */
  it('debería permitir el acceso si hay sesión activa', () => {
    spyOn(authService, 'haySesionActiva').and.returnValue(true);

    const resultado = TestBed.runInInjectionContext(() => authGuard(routeMock, stateMock));

    expect(resultado).toBeTrue();
  });

  /*
    Si no hay sesión activa, el guard debe:
    - bloquear la navegación
    - redirigir al acceso
  */
  it('debería bloquear el acceso y redirigir si NO hay sesión', () => {
    spyOn(authService, 'haySesionActiva').and.returnValue(false);
    const spyNavigate = spyOn(router, 'navigate');

    const resultado = TestBed.runInInjectionContext(() => authGuard(routeMock, stateMock));

    expect(resultado).toBeFalse();
    expect(spyNavigate).toHaveBeenCalledWith(['/acceso']);
  });
});
