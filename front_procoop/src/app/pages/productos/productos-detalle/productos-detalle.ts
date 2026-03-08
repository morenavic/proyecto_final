import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-productos-detalle',
  imports: [RouterLink],
  templateUrl: './productos-detalle.html',
  styleUrl: './productos-detalle.scss',
})
export class ProductosDetalle {
  producto: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.producto = this.productos[id];
    });
  }

  productos: any = {
    'procoop-gestion': {
      titulo: 'ProCoop Gestión',
      subtitulo:
        'ProCoop Gestión es el Sistema de Gestión Integral desarrollado exclusivamente para Cooperativas y empresas de Servicios.',
      descripcion: `
      Incorpora todas las funcionalidades para gestión de servicios tales como Energía Eléctrica, Gas Natural, Telefonía, Agua, Internet, TV y Servicios Sociales, entre otros. Es un sistema flexible y configurable, que se puede adaptar a las principales necesidades de cada una de las organizaciones, de acuerdo al tamaño, servicios y particularidades de la misma.
    `,
      infoExtra: `
          Principales beneficios de ProCoop Gestión
          
          - Agiliza la operatoria diaria, a través de la optimización de procesos organizacionales.
          - Acceso a la información de manera confiable, precisa y oportuna.
          - Posibilidad de que todos los componentes y procesos de las organización, pueden compartir información, garantizando la consistencia de la misma.
          - Eliinación de tareas innecesarias o duplicadas, lo que le permite optimizar recursos.
          - Posibilidad de incorporar inmediatamente nuevos servicios, dada la flexibilidad de la configuración.
          - Sistema en permanente crecimiento, lo que le permite afrontar los cambios actuales y futuros que exigen los entes reguladores y fiscales.
        `,
      imagen: 'images/imagen.jpg',
    },
    'p-movil': {
      titulo: 'ProCoop P-móvil',
      subtitulo: 'Sistema de toma de estados y georreferenciación de suministros.',
      descripcion: `
      Aplicación móvil para toma de estados de medidores con dispositivos de lectura de bajo costo. P-móvil es una aplicación diseñada exclusivamente para toma de estados en cooperativas y empresas de servicios públicos, que brinden servicios de agua, electricidad o gas natural. P-móvil tiene como fin agilizar la toma de estados de medidores, registrando en un terminal de captura para luego volcar la información en el sistema de gestión de la empresa.
    `,
      infoExtra: `
          Principales beneficios de operar con P-móvil:

          - Disminución del tiempo de toma de estados.
          - Disminución de ingreso de lecturas erróneas.
          - Menores costos operativos.

          Funcionalidades de la aplicación:

          - Permite la carga de múltiples rutas.
          - Posibilita el Registro de lecturas con control de rango a ingresar.
          - Opcionalmente pueden registrarse observaciones en lecturas.
          - Registra la posición geográfica de la lectura haciendo uso del GPS del dispositivo.

          P-móvil permite registrar la lectura de toma de estados, avisando al lecturista cuando la lectura se encuentra fuera de un rango determinado. En el momento del registro, queda registrado la fecha, hora y posición geográfica donde se realizó la lectura (haciendo uso del GPS que lleva incorporado el dispositivo).
        `,
      imagen: 'images/imagen.jpg',
    },
    '3s': {
      titulo: 'ProCoop 3S',
      subtitulo: 'Servicio de Soporte de Sistemas',
      descripcion: `
      El apoyo permanente que necesita todo usuario de Sistemas de Gestión de Servicios Públicos Atención personalizada, documentos, videos explicativos y otras herramientas multimediales convenientes para la satisfacción de necesidades de nuestros clientes.

      Actualización y Mantenimiento de Soluciones ProCoop:
      La actualización y mantenimiento de Soluciones ProCoop tiene por objeto que nuestros clientes cuenten con una aplicación con las últimas mejoras en procedimientos normativas y legales estándares. Nuestros clientes se benefician constantemente con los beneficios de disponer actualizaciones en el sistema, producto de nuestro desarrollo ininterrumpido.
    `,
      infoExtra: `
          Tratamiento de Información:

          Mediante este servicio se resuelven requerimientos que involucran un trabajo sobre la aplicación del cliente y su base de datos. Generalmente responde a la necesidad de verificación de información, reprocesos en carga de datos incorrectas o uso inapropiado de los productos. Las solicitudes ingresan a un proceso de resolución interna, donde será tratado por el responsable de cuenta y en caso de ser necesario, derivado a uno o varios especialistas. De acuerdo a la clasificación de la solicitud, se disponen diferentes tiempos previstos para la resolución, minimizando los mismos en casos de actividades o procesos críticos.

          Asistencia en urgencia en procesos críticos:
          Es un servicio de atención personalizada en horarios que no están operativos el Servicio de Soporte de Sistemas (3S) y la Mesa de Ayuda ProCoop (MAP).El objeto de este servicio, es que nuestros clientes no dejen de realizar las actividades críticas de Facturación y Cobranzas.
        `,
      imagen: 'images/imagen.jpg',
    },
  };
}
