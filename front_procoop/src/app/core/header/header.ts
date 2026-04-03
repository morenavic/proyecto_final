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
    Menú de usuario (único estado que se mantiene por TS)
  */
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

  constructor(public auth: AuthService) {}

  /*
    Colección de productos para dropdown dinámico
    Mantiene coherencia con rutas /productos/:id
  */
  productos = [
    { id: 1, nombre: 'ProCoop Gestión' },
    { id: 2, nombre: 'P-Móvil' },
    { id: 3, nombre: '3S' },
  ];

  /*
    ⚠️ FUTURO BACKEND:
    - Reemplazar por ProductoService
    - Unificar fuente de datos con listado/detalle
  */
}
