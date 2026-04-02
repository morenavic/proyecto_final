import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/*
  Modelo simplificado para el listado.
  Contiene solo la información necesaria para mostrar en la grilla.
*/
interface ProductoListado {
  id: number;
  nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-productos-listado',
  imports: [RouterLink],
  templateUrl: './productos-listado.html',
  styleUrl: './productos-listado.scss',
})
export class ProductosListado {
  /*
    Colección de productos para renderizar el listado.
    Se utiliza id como referencia para navegación al detalle.
  */
  productos: ProductoListado[] = [
    {
      id: 1,
      nombre: 'ProCoop Gestión',
      descripcion: 'Sistema de Gestión Integral para Cooperativas y empresas de servicios.',
    },
    {
      id: 2,
      nombre: 'P-Móvil',
      descripcion: 'App móvil para toma de estados de medidores.',
    },
    {
      id: 3,
      nombre: '3S',
      descripcion: 'Soporte permanente para sistemas de gestión de servicios públicos.',
    },
  ];

  /*
    ⚠️ FUTURO BACKEND:
    - Reemplazar esta colección por datos provenientes de un ProductoService
    - Este componente debería limitarse a consumir datos y no definirlos
  */
}
