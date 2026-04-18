import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Producto } from '../../../models/producto.model';
import { ProductoService } from '../../../services/producto.service';

/**
 * Componente de detalle de producto
 * Muestra la información de un producto seleccionado según el ID de la URL
 */
@Component({
  selector: 'app-productos-detalle',
  imports: [RouterLink],
  templateUrl: './productos-detalle.html',
  styleUrl: './productos-detalle.scss',
})
export class ProductosDetalle {
  /**
   * Producto seleccionado (uno solo, no array)
   */
  producto?: Producto;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
  ) {}

  /**
   * Al iniciar el componente:
   * - Obtiene el ID desde la URL
   * - Busca el producto en el service
   */
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.buscarProducto(id);
  }

  /**
   * Busca un producto por ID
   */
  buscarProducto(id: number): void {
    const productos = this.productoService.getProductos();

    const encontrado = productos.find((p) => p.id === id);

    if (encontrado) {
      this.producto = encontrado;
    }
  }
}
