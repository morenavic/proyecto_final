import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface Noticia {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
}

interface Evento {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
}

@Component({
  selector: 'app-panel-cliente-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './panel-cliente-home.html',
  styleUrls: ['./panel-cliente-home.scss'],
})
export class PanelClienteHome {
  mostrarTodasNoticias = false;
  mostrarTodosEventos = false;

  toggleNoticias() {
    this.mostrarTodasNoticias = !this.mostrarTodasNoticias;
  }

  toggleEventos() {
    this.mostrarTodosEventos = !this.mostrarTodosEventos;
  }

  noticias: Noticia[] = [
    {
      id: 1,
      titulo: 'Actualización 3.2',
      descripcion:
        'Incorporamos mejoras en el módulo de reportes y optimización de exportación a Excel. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      fecha: '12/08/2025',
    },
    {
      id: 2,
      titulo: 'Nueva versión móvil',
      descripcion:
        'P-Móvil 2.0 incorpora mejoras de rendimiento y estabilidad. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      fecha: '05/07/2025',
    },
    {
      id: 3,
      titulo: 'Mejoras en seguridad',
      descripcion:
        'Se actualizaron los protocolos de autenticación. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      fecha: '20/06/2025',
    },
    {
      id: 4,
      titulo: 'Nuevo módulo contable',
      descripcion:
        'Nueva herramienta para conciliación bancaria. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      fecha: '15/05/2025',
    },
  ];

  eventos: Evento[] = [
    {
      id: 1,
      titulo: 'Capacitación técnica',
      descripcion: 'Capacitación para operadores del sistema.',
      fecha: '20/10/2025',
    },
    {
      id: 2,
      titulo: 'Webinar seguridad',
      descripcion: 'Buenas prácticas de seguridad informática.',
      fecha: '15/09/2025',
    },
    {
      id: 3,
      titulo: 'Presentación nuevas funciones',
      descripcion: 'Explicación de nuevas funcionalidades del sistema.',
      fecha: '01/11/2025',
    },
  ];
}
