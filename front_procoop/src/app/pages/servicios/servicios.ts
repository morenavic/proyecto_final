import { Component } from '@angular/core';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [],
  templateUrl: './servicios.html',
  styleUrl: './servicios.scss',
})
export class Servicios {
  /**
   * Fuente de datos para la sección "Servicios".
   *
   * Decisión:
   * - Se incluye `id` para permitir navegación interna (anchors desde header).
   * - Estructura simple (titulo + descripcion) orientada a render dinámico en el HTML.
   */
  servicios = [
    {
      id: 'consultoria',
      titulo: 'Consultoría, Análisis e Implementación de Sistemas',
      descripcion:
        'Brindamos el servicio de relevamiento y análisis para la implementación de soluciones propias trabajando conjuntamente con el cliente.',
    },
    {
      id: 'soluciones',
      titulo: 'Soluciones llave en mano con resultados garantizados',
      descripcion:
        'Acompañamos y asistimos a nuestros clientes durante todo el proyecto, desde el relevamiento de necesidades hasta la post-implementación.',
    },
    {
      id: 'capacitacion',
      titulo: 'Capacitación y entrenamiento',
      descripcion:
        'Realizamos capacitaciones a medida en el uso de nuestros productos, de forma presencial o remota.',
    },
  ];

  /**
   * Representa la sección completa de metodología.
   *
   * Decisión:
   * - Se modela como un objeto (no array) para agrupar:
   *   - id (navegación desde header)
   *   - titulo de sección
   *   - lista de pasos
   * - Permite tratar esta sección como un bloque independiente en el template.
   */
  metodologia = {
    id: 'metodologia',
    titulo: 'Metodología de implementación',
    pasos: [
      {
        titulo: 'Análisis',
        descripcion: 'Relevamos la información de la organización, procesos y expectativas.',
      },
      {
        titulo: 'Definición',
        descripcion: 'Proponemos mejoras y definimos acuerdos de alcance.',
      },
      {
        titulo: 'Migración',
        descripcion: 'Evaluamos la factibilidad técnica y definimos procesos de migración.',
      },
      {
        titulo: 'Parametrización',
        descripcion: 'Configuramos el sistema según necesidades del proyecto.',
      },
      {
        titulo: 'Prueba y Capacitación',
        descripcion: 'Realizamos pruebas piloto y capacitaciones.',
      },
      {
        titulo: 'Puesta en marcha',
        descripcion: 'Implementación en producción y seguimiento inicial.',
      },
      {
        titulo: 'Acompañamiento',
        descripcion: 'Soporte continuo en procesos y adaptación.',
      },
    ],
  };

  /**
   * 🔄 FUTURO BACKEND
   *
   * - `servicios` y `metodologia` deberían obtenerse desde una API (ej: ServicioService).
   * - Este componente pasaría a consumir datos mediante observables.
   * - Mantener `id` (o equivalente) es clave para no romper la navegación interna.
   */
}
