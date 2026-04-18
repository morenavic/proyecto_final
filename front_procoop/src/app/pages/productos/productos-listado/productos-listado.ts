import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Producto } from '../../../models/producto.model';
import { ProductoService } from '../../../services/producto.service';

/**
 * Componente de listado de productos
 * Muestra una lista resumida para navegación al detalle
 */
@Component({
  selector: 'app-productos-listado',
  imports: [RouterLink],
  templateUrl: './productos-listado.html',
  styleUrl: './productos-listado.scss',
})
export class ProductosListado implements OnInit {
  /**
   * Lista de productos obtenidos desde el service
   */
  productos: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  /**
   * Al iniciar:
   * obtiene los productos desde el service
   */
  ngOnInit(): void {
    this.cargarProductos();
  }

  /**
   * Carga los productos
   */
  cargarProductos(): void {
    this.productos = this.productoService.getProductos();
  }
}
