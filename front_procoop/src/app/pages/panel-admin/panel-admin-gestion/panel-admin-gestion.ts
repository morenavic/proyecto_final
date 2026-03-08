import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PanelAdminDataService } from '../panel-admin-data';

@Component({
  selector: 'app-panel-admin-gestion',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './panel-admin-gestion.html',
  styleUrl: './panel-admin-gestion.scss',
})
export class PanelAdminGestion {

  /**
   * Tipo de entidad actualmente gestionada.
   * Se obtiene desde el parámetro :tipo de la ruta
   * y determina qué configuración y datos cargar.
   */
  tipo!: string;

  /**
   * Configuración activa para la entidad actual.
   * Define título, columnas visibles y acciones disponibles.
   */
  config: any;

  /**
   * Datos a mostrar en la tabla.
   * Actualmente provienen del DataService mock.
   *
   * En backend real:
   * se cargarán desde una llamada HTTP.
   */
  items: any[] = [];

  /**
   * Controla visibilidad del modal de confirmación
   * para acciones destructivas.
   */
  mostrarModal = false;

  /**
   * Registro seleccionado para eliminar o inactivar.
   */
  itemSeleccionado: any = null;

  constructor(
    private route: ActivatedRoute,
    private dataService: PanelAdminDataService,
  ) {}

  /**
   * Inicialización del componente.
   *
   * - Obtiene el tipo de entidad desde la ruta
   * - Carga la configuración correspondiente
   * - Recupera los datos desde el DataService
   *
   * Esto permite que un único componente gestione
   * múltiples entidades del panel administrativo.
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.tipo = params.get('tipo') ?? '';
      this.config = this.configuraciones[this.tipo];
      this.items = this.dataService.getAll(this.tipo);
    });
  }

  /**
   * Abre el modal de confirmación y guarda
   * el registro seleccionado.
   */
  abrirModalEliminar(item: any) {
    this.itemSeleccionado = item;
    this.mostrarModal = true;
  }

  /**
   * Cierra el modal y limpia el registro seleccionado.
   */
  cerrarModal() {
    this.mostrarModal = false;
    this.itemSeleccionado = null;
  }

  /**
   * Confirma la acción destructiva.
   *
   * Comportamiento especial:
   * - clientes → se marca como inactivo
   * - resto de entidades → eliminación real
   *
   * En backend real:
   * esta lógica deberá delegarse al servicio
   * mediante una llamada HTTP.
   */
  confirmarEliminar() {

    if (!this.itemSeleccionado) return;

    if (this.tipo === 'clientes') {

      // Inactivación lógica en lugar de eliminación física
      this.itemSeleccionado.inactivo = true;

    } else {

      this.dataService.delete(this.tipo, this.itemSeleccionado.id);

      /**
       * Se recargan los datos para reflejar
       * los cambios en la tabla.
       */
      this.items = this.dataService.getAll(this.tipo);
    }

    this.cerrarModal();
  }

  /**
   * Configuración central del módulo de gestión.
   *
   * Define para cada entidad:
   * - título del módulo
   * - texto del botón principal
   * - columnas de la tabla
   * - acciones disponibles
   *
   * Esta estrategia permite reutilizar un único
   * componente para gestionar distintas entidades.
   *
   * Para agregar nuevas entidades solo se debe
   * incorporar una nueva entrada en este objeto.
   */
  configuraciones: any = {

    novedades: {
      titulo: 'Gestión de novedades',
      boton: 'Crear novedad',
      columnas: [
        { key: 'titulo', label: 'Título' },
        { key: 'fecha', label: 'Fecha' },
      ],
      acciones: ['editar', 'eliminar'],
    },

    productos: {
      titulo: 'Gestión de productos',
      boton: 'Crear producto',
      columnas: [
        { key: 'titulo', label: 'Título' },
        { key: 'categoria', label: 'Categoría' },
      ],
      acciones: ['editar', 'eliminar'],
    },

    servicios: {
      titulo: 'Gestión de servicios',
      boton: 'Crear servicio',
      columnas: [
        { key: 'titulo', label: 'Título' },
        { key: 'categoria', label: 'Categoría' },
      ],
      acciones: ['editar', 'eliminar'],
    },

    clientes: {
      titulo: 'Gestión de clientes',
      boton: 'Agregar cliente',
      columnas: [
        { key: 'cooperativa', label: 'Cooperativa' },
        { key: 'cuenta', label: 'Nº de cuenta' },
      ],
      acciones: ['editar', 'eliminar'],
    },

    documentos: {
      titulo: 'Gestión de documentos',
      boton: 'Subir documento',
      columnas: [
        { key: 'nombre', label: 'Nombre' },
        { key: 'tipo', label: 'Tipo' },
      ],
      acciones: ['descargar', 'eliminar'],
    },

  };
}
