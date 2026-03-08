import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

/*
  Guard de autorización por rol.

  Se encarga de validar que el usuario autenticado
  tenga el rol requerido por la ruta.

  El rol esperado se define en la configuración de rutas
  mediante la propiedad `data`.
*/
export const rolGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const sesion = authService.obtenerSesion();
  const rolEsperado = route.data['rol'];

  /*
    Si no hay sesión activa, se bloquea el acceso
    y se redirige al acceso.
  */
  if (!sesion) {
    router.navigate(['/acceso']);
    return false;
  }

  /*
    Si el rol del usuario no coincide con el rol requerido
    por la ruta, se bloquea el acceso.
  */
  if (sesion.rol !== rolEsperado) {
    router.navigate(['/acceso']);
    return false;
  }

  /*
    Si existe sesión y el rol coincide, se permite
    la navegación a la ruta protegida.
  */
  return true;
};
