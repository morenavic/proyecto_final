import { Component } from '@angular/core';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [],
  templateUrl: './servicios.html',
  styleUrl: './servicios.scss',
})
export class Servicios {
  /*
    Fuente de datos para la sección "Servicios".

    Decisión:
    - Se incluye `id` como clave dual:
      1) navegación interna (anchors desde header)
      2) identificación única en el render (@for)

    - Estructura simple orientada a contenido institucional (texto + título),
      evitando complejidad innecesaria en esta capa.
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

  /*
    Modelo de la sección "Metodología".

    Decisión:
    - Se modela como objeto único para representar un bloque completo
      (no una lista independiente como servicios).
    - Contiene:
      - id → navegación por fragmento
      - titulo → encabezado de sección
      - pasos → lista interna

    Esto permite mantener separación semántica clara entre:
    contenido institucional (servicios) vs proceso (metodología).
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

  /*
    🔄 FUTURO BACKEND

    - Migrar `servicios` y `metodologia` a un servicio (ej: ServiciosService).
    - Consumir datos vía observables (HttpClient).
    - Mantener los `id` (o mapearlos) es crítico para no romper:
      - navegación por fragmentos (#)
      - vínculos con el header
  */
}
