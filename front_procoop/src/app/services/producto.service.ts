import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private productos: Producto[] = [
    {
      id: 1,
      slug: '3s',
      titulo: 'ProCoop 3S',
      subtitulo: 'Servicio de soporte',
      descripcion: 'Soporte permanente...',
      infoExtra: 'Tratamiento de información...',
      imagen: 'images/imagen.jpg',
    },
  ];

  constructor() {}

  getProductos(): Producto[] {
    return this.productos;
  }
}
