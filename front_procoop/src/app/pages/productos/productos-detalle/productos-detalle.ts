import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

/*
  Modelo del producto utilizado en la vista.
  Define la estructura necesaria para renderizar el detalle.
*/
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
  /*
    Producto seleccionado a mostrar.
    Se resuelve dinámicamente a partir del id de la ruta.
  */
  producto?: Producto;

  constructor(private route: ActivatedRoute) {}

  /*
    Obtiene el id desde la URL y busca el producto correspondiente.
    Se utiliza snapshot ya que el componente no necesita reaccionar
    a cambios de parámetros sin recrearse.
  */
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.producto = this.productos.find((p) => p.id === id);
  }

  /*
    Colección local de productos.
    Se utiliza como fuente de datos temporal para el detalle.
    Está alineada con el listado mediante el uso de id.
  */
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

  /*
    ⚠️ FUTURO BACKEND:
    - Reemplazar esta colección por datos obtenidos desde un ProductoService
    - La búsqueda por id debería realizarse mediante una llamada a API
    - El slug podría utilizarse para URLs más descriptivas (SEO)
  */
}
