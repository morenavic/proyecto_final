import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PanelAdminDataService } from '../panel-admin-data';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-panel-admin-gestion',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './panel-admin-gestion.html',
  styleUrl: './panel-admin-gestion.scss',
})
export class PanelAdminGestion {

  tipo!: string;
  config: any;
  items: any[] = [];

  mostrarModal = false;
  itemSeleccionado: any = null;

  constructor(
    private route: ActivatedRoute,
    private dataService: PanelAdminDataService,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.tipo = params.get('tipo') ?? '';
      this.config = this.configuraciones[this.tipo];

      // PRODUCTOS usa service real
      if (this.tipo === 'productos') {
        this.items = this.productoService.getProductos();
        return;
      }

      // resto sigue mock
      this.items = this.dataService.getAll(this.tipo);
    });
  }

  abrirModalEliminar(item: any) {
    this.itemSeleccionado = item;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.itemSeleccionado = null;
  }

  confirmarEliminar() {

    if (!this.itemSeleccionado) return;

    if (this.tipo === 'clientes') {
      this.itemSeleccionado.inactivo = true;
    } else {

      // productos (por ahora mock visual)
      if (this.tipo === 'productos') {
        console.log('DELETE producto', this.itemSeleccionado.id);
        this.items = this.items.filter(i => i.id !== this.itemSeleccionado.id);
      } else {
        this.dataService.delete(this.tipo, this.itemSeleccionado.id);
        this.items = this.dataService.getAll(this.tipo);
      }
    }

    this.cerrarModal();
  }

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

    // CORREGIDO
    productos: {
      titulo: 'Gestión de productos',
      boton: 'Crear producto',
      columnas: [
        { key: 'titulo', label: 'Título' },
        { key: 'subtitulo', label: 'Subtítulo' },
      ],
      acciones: ['editar', 'eliminar'],
    },

    servicios: {
      titulo: 'Gestión de servicios',
      boton: 'Crear servicio',
      columnas: [
        { key: 'titulo', label: 'Título' },
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
