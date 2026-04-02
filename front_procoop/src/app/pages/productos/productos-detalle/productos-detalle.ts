import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface Producto {
  id: number;
  slug: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  infoExtra: string;
  imagen: string;
}

@Component({
  selector: 'app-productos-detalle',
  imports: [RouterLink],
  templateUrl: './productos-detalle.html',
  styleUrl: './productos-detalle.scss',
})
export class ProductosDetalle {
  producto?: Producto;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.producto = this.productos.find((p) => p.id === id);
  }

  productos: Producto[] = [
    {
      id: 1,
      slug: 'procoop-gestion',
      titulo: 'ProCoop Gestión',
      subtitulo: 'Sistema integral para cooperativas',
      descripcion: `Sistema completo para gestión de servicios...`,
      infoExtra: `Beneficios principales...`,
      imagen: 'images/imagen.jpg',
    },
    {
      id: 2,
      slug: 'p-movil',
      titulo: 'ProCoop P-móvil',
      subtitulo: 'Sistema de toma de estados',
      descripcion: `Aplicación móvil para toma de estados...`,
      infoExtra: `Beneficios de P-móvil...`,
      imagen: 'images/imagen.jpg',
    },
    {
      id: 3,
      slug: '3s',
      titulo: 'ProCoop 3S',
      subtitulo: 'Servicio de soporte',
      descripcion: `Soporte permanente...`,
      infoExtra: `Tratamiento de información...`,
      imagen: 'images/imagen.jpg',
    },
  ];
}
