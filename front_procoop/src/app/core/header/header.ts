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
  /* Estado del dropdown de Productos
     Se maneja explícitamente desde el componente */
  dropdownProductosAbierto = false;

  /* Estado del dropdown de Servicios
     Independiente, pero coordinado con el de Productos */
  dropdownServiciosAbierto = false;

  /**
   * Alterna el dropdown solicitado.
   * Decisión de diseño: nunca permitir más de un dropdown abierto.
   * Simplifica UX y evita superposición visual.
   */
  // ⚠️ Mejora: no esta funcionando ya que se superponen. Cuando cliqueo uno se abre y queda abierto, y cuando paso el mause por el otro, se abre pero el otro queda abierto tambien.
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
   * Cierre explícito del dropdown.
   * Se usa al navegar a una opción para:
   * - limpiar el estado visual
   * - evitar dropdowns abiertos tras cambiar de ruta
   */
  // ⚠️ Mejora: no esta funcionando ya que se superponen. Cuando cliqueo uno se abre y queda abierto, y cuando paso el mause por el otro, se abre pero el otro queda abierto tambien.
  cerrarDropdown(tipo: 'productos' | 'servicios'): void {
    if (tipo === 'productos') {
      this.dropdownProductosAbierto = false;
    } else {
      this.dropdownServiciosAbierto = false;
    }
  }

  constructor(public auth: AuthService) {}

  menuUsuarioAbierto = false;

  toggleMenuUsuario() {
    this.menuUsuarioAbierto = !this.menuUsuarioAbierto;
  }

  cerrarMenu() {
    this.menuUsuarioAbierto = false;
  }

  logout() {
    this.auth.logout();
    this.menuUsuarioAbierto = false;
  }

  productos = [
    { id: 1, nombre: 'ProCoop Gestión' },
    { id: 2, nombre: 'P-Móvil' },
    { id: 3, nombre: '3S' },
  ];
}
