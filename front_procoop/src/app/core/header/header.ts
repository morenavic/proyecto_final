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
    Estado de dropdowns independientes.
    Se manejan desde el componente para controlar apertura/cierre manual.
  */
  dropdownProductosAbierto = false;
  dropdownServiciosAbierto = false;

  /**
   * Alterna el dropdown solicitado asegurando que solo uno esté abierto.
   * Decisión de diseño: evitar múltiples dropdowns abiertos simultáneamente
   * para mejorar la experiencia y mantener el layout ordenado.
   *
   * ⚠️ Actualmente hay conflicto con comportamiento por hover (CSS),
   * lo que provoca superposición. Este control funciona correctamente
   * solo si la apertura es gestionada únicamente desde TS.
   */
  toggleDropdown(tipo: 'productos' | 'servicios'): void {
    if (tipo === 'productos') {
      this.dropdownProductosAbierto = !this.dropdownProductosAbierto;
      this.dropdownServiciosAbierto = false;
    } else {
      this.dropdownServiciosAbierto = !this.dropdownServiciosAbierto;
      this.dropdownProductosAbierto = false;
    }
  }

  /**
   * Cierra explícitamente el dropdown activo al navegar.
   * Evita que queden abiertos al cambiar de vista.
   *
   * ⚠️ Mismo caso que toggleDropdown: puede verse afectado si el CSS usa hover.
   */
  cerrarDropdown(tipo: 'productos' | 'servicios'): void {
    if (tipo === 'productos') {
      this.dropdownProductosAbierto = false;
    } else {
      this.dropdownServiciosAbierto = false;
    }
  }

  constructor(public auth: AuthService) {}

  /*
    Estado del menú de usuario autenticado.
    Se maneja de forma independiente a los dropdowns principales.
  */
  menuUsuarioAbierto = false;

  toggleMenuUsuario() {
    this.menuUsuarioAbierto = !this.menuUsuarioAbierto;
  }

  cerrarMenu() {
    this.menuUsuarioAbierto = false;
  }

  /*
    Ejecuta logout y limpia estado del menú.
    Mantiene coherencia visual tras cierre de sesión.
  */
  logout() {
    this.auth.logout();
    this.menuUsuarioAbierto = false;
  }

  /*
    Colección de productos utilizada para poblar el dropdown.
    Se alinea con las rutas dinámicas (/productos/:id).
  */
  productos = [
    { id: 1, nombre: 'ProCoop Gestión' },
    { id: 2, nombre: 'P-Móvil' },
    { id: 3, nombre: '3S' },
  ];

  /*
    ⚠️ FUTURO BACKEND:
    - Reemplazar esta colección por datos provenientes de un ProductoService
    - Permitir sincronización con listado y detalle (una única fuente de verdad)
  */
}
