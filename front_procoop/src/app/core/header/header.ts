import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.model';

/**
 * Header principal de la aplicación
 * Maneja navegación global y estado de usuario
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  /**
   * Control del menú usuario
   */
  menuUsuarioAbierto = false;

  /**
   * Lista de productos para el dropdown
   */
  productos: Producto[] = [];

  constructor(
    public auth: AuthService,
    private productoService: ProductoService,
  ) {}

  /**
   * Carga productos al iniciar
   */
  ngOnInit(): void {
    this.productos = this.productoService.getProductos();
  }

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
}
