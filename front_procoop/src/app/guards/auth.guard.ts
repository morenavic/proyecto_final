import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/*
  Guard de autenticación.

  Su responsabilidad es validar que exista una sesión activa
  antes de permitir el acceso a rutas protegidas.

  No evalúa roles ni permisos específicos:
  solo controla si el usuario está autenticado.
*/
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  /*
    Si hay una sesión activa, se permite la navegación.
  */
  if (authService.haySesionActiva()) {
    return true;
  }

  /*
    Si no hay sesión:
    - se redirige al acceso
    - se bloquea la navegación
  */
  router.navigate(['/acceso']);
  return false;
};
