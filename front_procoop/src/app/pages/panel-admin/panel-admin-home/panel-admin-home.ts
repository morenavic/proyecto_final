import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-panel-admin-home',
  imports: [RouterLink],
  templateUrl: './panel-admin-home.html',
  styleUrl: './panel-admin-home.scss',
})
export class PanelAdminHome {
  /**
   * Nombre del usuario logueado.
   * Por ahora es un valor estático.
   * Más adelante se obtendrá desde un servicio de autenticación.
   */
  usuario: string = 'Admin';

  /**
   * Métricas generales del sistema.
   * Se utilizan para mostrar un resumen visual en el Home.
   * Actualmente los valores son simulados.
   * En la integración con backend, este array se construirá
   * a partir de datos reales provenientes de un endpoint.
   */
  metricas = [
    { label: 'Noticias', total: 12, porcentaje: 40 },
    { label: 'Servicios', total: 8, porcentaje: 25 },
    { label: 'Clientes', total: 42, porcentaje: 80 },
  ];

  /**
   * Actividad reciente del sistema.
   * Representa un resumen de acciones relevantes para el administrador.
   * En una versión futura, esta información podrá provenir
   * de un servicio de auditoría o historial de eventos.
   */
  actividadReciente = [
    { texto: 'Se creó una nueva noticia', fecha: 'Hace 2 horas' },
    { texto: 'Se agregó un cliente', fecha: 'Ayer' },
    { texto: 'Se actualizó un servicio', fecha: 'Hace 3 días' },
  ];
}
