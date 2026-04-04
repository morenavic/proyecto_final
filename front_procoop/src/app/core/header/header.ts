import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  /*
    Estado local para controlar el menú de usuario.
    Decisión: manejarlo por TS (click) en lugar de hover para mejor control de UX.
  */
  menuUsuarioAbierto = false;

  /*
    Alterna apertura/cierre del menú usuario.
    Se usa desde el botón hamburguesa.
  */
  toggleMenuUsuario() {
    this.menuUsuarioAbierto = !this.menuUsuarioAbierto;
  }

  /*
    Cierre explícito del menú.
    Se ejecuta al navegar para evitar que quede abierto.
  */
  cerrarMenu() {
    this.menuUsuarioAbierto = false;
  }

  /*
    Logout + limpieza de estado UI.
    Decisión: cerrar menú manualmente para evitar inconsistencias visuales.

    ⚠️ FUTURO BACKEND:
    logout() debería manejar invalidación de sesión/token en servidor.
  */
  logout() {
    this.auth.logout();
    this.menuUsuarioAbierto = false;
  }

  /*
    Inyección pública para usar el estado de autenticación directamente en la vista.
    Permite mostrar/ocultar secciones sin lógica intermedia.
  */
  constructor(public auth: AuthService) {}

  /*
    Fuente de datos para el dropdown de productos.
    Se utiliza para generar navegación dinámica a /productos/:id.

    ⚠️ FUTURO BACKEND:
    Reemplazar por servicio (ProductoService) y centralizar datos con otras vistas.
  */
  productos = [
    { id: 1, nombre: 'ProCoop Gestión' },
    { id: 2, nombre: 'P-Móvil' },
    { id: 3, nombre: '3S' },
  ];

  /*
    Mejora futura sugerida:
    Escuchar eventos del Router para cerrar automáticamente el menú usuario
    en cualquier navegación (más robusto que depender de clicks manuales).
  */
}
