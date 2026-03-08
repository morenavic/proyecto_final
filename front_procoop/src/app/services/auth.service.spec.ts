import { TestBed } from '@angular/core/testing';
import { AuthService, UsuarioSesion } from './auth.service';

/*
  Tests unitarios del AuthService.

  El objetivo es validar la lógica de autenticación y manejo
  de sesión de forma aislada, sin depender de componentes,
  guards ni router.
*/
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    /*
      Se inicializa el servicio real y se limpia el storage
      antes de cada test para garantizar independencia
      entre escenarios.
    */
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);

    localStorage.clear();
  });

  /*
    Verifica que el servicio se cree correctamente.
  */
  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  /*
    Login exitoso con usuario cliente.
    Se valida:
    - retorno correcto del usuario de sesión
    - persistencia en localStorage
  */
  it('debería iniciar sesión con credenciales válidas (cliente)', () => {
    const usuario = service.login('cliente@cooperativa.com', '123456');

    expect(usuario).toEqual({
      email: 'cliente@cooperativa.com',
      rol: 'cliente',
    });

    const guardado = localStorage.getItem('usuarioSesion');
    expect(guardado).toBeTruthy();
  });

  /*
    Login exitoso con usuario administrador.
  */
  it('debería iniciar sesión con credenciales válidas (admin)', () => {
    const usuario = service.login('admin@cooperativa.com', '123456');

    expect(usuario?.rol).toBe('admin');
  });

  /*
    Login fallido por contraseña incorrecta.
    No debe guardarse ninguna sesión.
  */
  it('NO debería iniciar sesión con contraseña incorrecta', () => {
    const usuario = service.login('cliente@cooperativa.com', '000000');

    expect(usuario).toBeNull();
    expect(localStorage.getItem('usuarioSesion')).toBeNull();
  });

  /*
    Login fallido por email inexistente.
  */
  it('NO debería iniciar sesión con email inexistente', () => {
    const usuario = service.login('fake@cooperativa.com', '123456');

    expect(usuario).toBeNull();
  });

  /*
    Verifica que la información almacenada en sesión
    sea consistente y contenga solo los datos mínimos.
  */
  it('debería guardar la sesión correctamente', () => {
    service.login('admin@cooperativa.com', '123456');

    const data = localStorage.getItem('usuarioSesion');
    const sesion: UsuarioSesion = JSON.parse(data!);

    expect(sesion.email).toBe('admin@cooperativa.com');
    expect(sesion.rol).toBe('admin');
  });

  /*
    Recuperación de la sesión desde localStorage.
  */
  it('debería recuperar la sesión desde localStorage', () => {
    service.login('cliente@cooperativa.com', '123456');

    const sesion = service.obtenerSesion();

    expect(sesion).toEqual({
      email: 'cliente@cooperativa.com',
      rol: 'cliente',
    });
  });

  /*
    Si no existe sesión almacenada, debe devolver null.
  */
  it('debería devolver null si no hay sesión', () => {
    const sesion = service.obtenerSesion();

    expect(sesion).toBeNull();
  });

  /*
    Valida el helper haySesionActiva cuando existe sesión.
  */
  it('haySesionActiva debería devolver true si hay sesión', () => {
    service.login('admin@cooperativa.com', '123456');

    expect(service.haySesionActiva()).toBeTrue();
  });

  /*
    Valida el helper haySesionActiva cuando no existe sesión.
  */
  it('haySesionActiva debería devolver false si no hay sesión', () => {
    expect(service.haySesionActiva()).toBeFalse();
  });

  /*
    Logout debe eliminar la sesión y dejar el estado limpio.
  */
  it('logout debería eliminar la sesión', () => {
    service.login('cliente@cooperativa.com', '123456');
    service.logout();

    expect(localStorage.getItem('usuarioSesion')).toBeNull();
    expect(service.haySesionActiva()).toBeFalse();
  });
});
