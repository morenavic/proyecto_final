import { Injectable } from '@angular/core';

/* =====================================================
   Modelos
   ===================================================== */

/*
  Representa un usuario mockeado.
  Simula la respuesta de un backend mientras no exista
  una API real.
  ⚠️ Se va cuando haya backend real.
*/
interface UsuarioMock {
  email: string;
  password: string;
  rol: 'cliente' | 'admin';
  activo: boolean;
}

/*
  Información mínima que se persiste en sesión.
*/
export interface UsuarioSesion {
  email: string;
  rol: 'admin' | 'cliente';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /*
    Clave centralizada para el manejo de sesión en localStorage.
    ⚠️ Facilita cambios futuros (ej: migrar a sessionStorage o tokens).
  */
  private readonly STORAGE_KEY = 'usuarioSesion';

  /* =====================================================
     Base de usuarios mock (temporal)
     ⚠️ Se va cuando haya backend real.
     ===================================================== */
  /*
    Base simulada de usuarios.
    Se utiliza únicamente para desarrollo y testing,
    hasta contar con un backend real.
  */
  private usuariosMock: UsuarioMock[] = [
    {
      email: 'cliente@cooperativa.com',
      password: '123456',
      rol: 'cliente',
      activo: true,
    },
    {
      email: 'admin@cooperativa.com',
      password: '123456',
      rol: 'admin',
      activo: true,
    },
  ];

  /* =====================================================
     Login
     ⚠️ Se va cuando haya backend real.
     ===================================================== */
  /*
    Valida las credenciales contra la base mock.
    Si el usuario existe y está activo:
    - genera un objeto de sesión mínimo
    - persiste la sesión
    - retorna la información de sesión
  */
  login(email: string, password: string): UsuarioSesion | null {
    const usuario = this.usuariosMock.find(
      (u) => u.email === email && u.password === password && u.activo,
    );

    if (!usuario) {
      return null;
    }

    const usuarioSesion: UsuarioSesion = {
      email: usuario.email,
      rol: usuario.rol,
    };

    this.guardarSesion(usuarioSesion);
    return usuarioSesion;
  }

  /* =====================================================
     Sesión
     ===================================================== */
  /*
    Recupera la sesión desde localStorage si existe.
  */
  obtenerSesion(): UsuarioSesion | null {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  }

  /* =====================================================
     Logout
     ===================================================== */
  /*
    Elimina completamente la sesión almacenada.
    No mantiene estado interno en memoria.
  */
  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  /* =====================================================
     Helpers
     ===================================================== */

  /*
    Validar rápidamente si hay una sesión activa.
    Es utilizado por guards y componentes.
  */
  haySesionActiva(): boolean {
    return this.obtenerSesion() !== null;
  }

  /*
    Centraliza la lógica de persistencia de sesión.
    Permite modificar el mecanismo de guardado sin
    afectar al resto del código.
  */
  private guardarSesion(usuario: UsuarioSesion): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuario));
  }
  /*
    Metodo para cambiar contraseña, simula la lógica que tendría el backend.
    Valida la contraseña actual, la coincidencia de las nuevas contraseñas
    y actualiza el password en la base mock.
     ⚠️ Se va cuando haya backend real.
  */
  cambiarContrasenia(value: {
    actual: string | null;
    nueva: string | null;
    repetir: string | null;
  }): boolean {
    const sesion = this.obtenerSesion();

    if (!sesion) return false;

    const usuario = this.usuariosMock.find((u) => u.email === sesion.email);

    if (!usuario) return false;

    // validar contraseña actual
    if (usuario.password !== value.actual) {
      return false;
    }

    // validar coincidencia
    if (value.nueva !== value.repetir) {
      return false;
    }

    // actualizar contraseña
    usuario.password = value.nueva || '';

    return true;
  }
}

/*
  ⚠️ NOTA PARA BACKEND FUTURO

  Este servicio está implementado actualmente con datos mock
  para permitir el desarrollo del frontend sin dependencia
  de una API real.

  Cuando el backend esté disponible:
  - Eliminar la base de usuarios mock y la validación local.
  - Reemplazar el método login por una llamada HTTP al backend.
  - El backend será el único responsable de validar credenciales.
  - La respuesta deberá incluir al menos el rol del usuario
    (y opcionalmente un token de autenticación).
  - Mantener la persistencia de sesión centralizada en este service
    (localStorage u otro mecanismo).
  - No mover lógica de autenticación a los componentes.

  El resto de los métodos (sesión, logout, guards)
  están preparados para funcionar sin cambios.

  SUMAR:
  ⚠️ Interceptor HTTP.
  ⚠️ Tokens (JWT).
  ⚠️ Expiración de sesión.
  ⚠️ Refresh token.

*/
