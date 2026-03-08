import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { PanelAdminDataService } from '../panel-admin-data';

@Component({
  selector: 'app-panel-admin-abm',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './panel-admin-abm.html',
  styleUrl: './panel-admin-abm.scss',
})
export class PanelAdminAbm {
  /**
   * Tipo de entidad activa (novedades, productos, servicios, etc.).
   * Se obtiene dinámicamente desde el parámetro :tipo de la ruta.
   *
   * Permite que el mismo componente funcione para múltiples
   * entidades del panel administrativo.
   */
  tipo!: string;

  /**
   * ID opcional del registro.
   * Si existe, el componente entra automáticamente en modo edición.
   */
  id!: string | null;

  /**
   * Controla si el formulario está en modo crear o editar.
   * Esto evita tener dos componentes separados para el ABM.
   */
  modoEdicion = false;

  /**
   * Nombre del archivo PDF seleccionado.
   * Se utiliza únicamente para mostrar feedback visual en el template.
   */
  nombreArchivo: string | null = null;

  /**
   * Formulario reactivo construido dinámicamente
   * en base a la configuración de cada entidad.
   */
  form!: FormGroup;

  /**
   * Configuración activa según el tipo de entidad.
   * Define títulos, campos y rutas de navegación.
   */
  config: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private dataService: PanelAdminDataService,
  ) {}

  /**
   * Flujo principal del componente.
   *
   * - Lee parámetros de la ruta
   * - Determina si el componente está en modo crear o editar
   * - Obtiene la configuración correspondiente
   * - Construye el formulario dinámico
   * - Carga datos existentes si corresponde
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.tipo = params.get('tipo') ?? '';
      this.id = params.get('id');

      this.modoEdicion = !!this.id;

      this.config = this.configuraciones[this.tipo];

      this.crearFormulario();

      if (this.modoEdicion) {
        this.cargarDatos();
      }
    });
  }

  /* ============================
     CREAR FORMULARIO DINÁMICO
  ============================ */

  /**
   * Construye el FormGroup dinámicamente a partir de
   * la configuración declarada en configuraciones.
   *
   * Esto permite reutilizar el mismo ABM para
   * diferentes entidades sin duplicar lógica.
   *
   * En backend real:
   * podrían agregarse validaciones específicas
   * dependiendo del tipo de entidad.
   */
  crearFormulario(): void {
    const group: any = {};

    this.config.campos.forEach((campo: any) => {
      const validadores = [Validators.required];

      /**
       * Validación adicional para campos numéricos.
       * Evita ingreso de caracteres no válidos.
       */
      if (campo.type === 'number') {
        validadores.push(Validators.pattern(/^[0-9]+$/));
      }

      group[campo.name] = ['', validadores];
    });

    this.form = this.fb.group(group);
  }

  /* ============================
     CARGAR DATOS EN EDICIÓN
  ============================ */

  /**
   * Obtiene el registro desde el DataService
   * y lo inyecta en el formulario para edición.
   *
   * Actualmente utiliza datos mock.
   *
   * En backend real:
   * este método deberá realizar una llamada HTTP
   * al endpoint correspondiente (GET /id).
   */
  cargarDatos(): void {
    const item = this.dataService.getById(this.tipo, Number(this.id));

    if (!item) return;

    this.form.patchValue(item);

    /**
     * Manejo visual del archivo previamente cargado.
     * Solo se utiliza para mostrar el nombre del archivo.
     */
    if (item.archivo) {
      this.nombreArchivo = item.archivo.name ?? null;
    }
  }

  /* ============================
     MANEJO ARCHIVO PDF
  ============================ */

  /**
   * Maneja la selección y validación del archivo PDF.
   *
   * - Verifica existencia del archivo
   * - Restringe tipo a PDF
   * - Actualiza el control del formulario
   * - Actualiza el nombre visible del archivo
   *
   * En backend real:
   * el archivo deberá enviarse como FormData
   * junto con el resto del formulario.
   */
  onFileChange(event: any, controlName: string): void {
    const file = event.target.files?.[0];

    if (!file) {
      this.nombreArchivo = null;
      this.form.get(controlName)?.setValue(null);
      return;
    }

    /**
     * Restricción explícita a archivos PDF.
     */
    if (file.type !== 'application/pdf') {
      alert('Solo se permiten archivos PDF');

      this.nombreArchivo = null;
      this.form.get(controlName)?.setValue(null);
      return;
    }

    this.nombreArchivo = file.name;

    this.form.get(controlName)?.setValue(file);
    this.form.get(controlName)?.markAsTouched();
    this.form.get(controlName)?.updateValueAndValidity();
  }

  /* ============================
     SUBMIT
  ============================ */

  /**
   * Punto central de persistencia del formulario.
   *
   * Delegación completa al DataService para mantener
   * separado el manejo de datos de la lógica del componente.
   *
   * En backend real:
   * se reemplazará por llamadas HTTP (POST / PUT).
   */
  onSubmit(): void {
    if (this.form.invalid) return;

    if (this.modoEdicion) {
      this.dataService.update(this.tipo, Number(this.id), this.form.value);
    } else {
      this.dataService.create(this.tipo, this.form.value);
    }

    /**
     * Redirección al módulo de gestión correspondiente
     * una vez finalizada la operación.
     */
    this.router.navigate(['/panel-admin-gestion', this.tipo]);
  }

  /* ============================
     CONFIGURACIONES
  ============================ */

  /**
   * Objeto central de configuración del ABM.
   *
   * Define:
   * - títulos del formulario
   * - campos a renderizar
   * - rutas de cancelación
   *
   * Esta estrategia permite que el componente sea
   * completamente reutilizable para múltiples entidades.
   *
   * Para agregar una nueva entidad solo se debe
   * incorporar una nueva entrada en este objeto.
   */
  configuraciones: any = {
    novedades: {
      tituloCrear: 'Crear novedad',
      tituloEditar: 'Editar novedad',
      rutaCancelar: '/panel-admin-gestion/novedades',
      campos: [
        { name: 'titulo', label: 'Título', type: 'text' },
        { name: 'fecha', label: 'Fecha', type: 'date' },
        { name: 'contenido', label: 'Contenido', type: 'textarea' },
      ],
    },

    productos: {
      tituloCrear: 'Crear producto',
      tituloEditar: 'Editar producto',
      rutaCancelar: '/panel-admin-gestion/productos',
      campos: [
        { name: 'titulo', label: 'Título', type: 'text' },
        { name: 'descripcion', label: 'Descripción', type: 'textarea' },
      ],
    },

    servicios: {
      tituloCrear: 'Crear servicio',
      tituloEditar: 'Editar servicio',
      rutaCancelar: '/panel-admin-gestion/servicios',
      campos: [
        { name: 'titulo', label: 'Título', type: 'text' },
        { name: 'descripcion', label: 'Descripción', type: 'textarea' },
      ],
    },

    clientes: {
      tituloCrear: 'Crear cliente',
      tituloEditar: 'Editar cliente',
      rutaCancelar: '/panel-admin-gestion/clientes',
      campos: [
        { name: 'cooperativa', label: 'Nombre cooperativa', type: 'text' },
        { name: 'cuenta', label: 'Número de cuenta', type: 'number' },
        { name: 'titular', label: 'Nombre del titular', type: 'text' },
      ],
    },

    documentos: {
      tituloCrear: 'Subir documento',
      tituloEditar: 'Editar documento',
      rutaCancelar: '/panel-admin-gestion/documentos',
      campos: [
        { name: 'nombre', label: 'Nombre del documento', type: 'text' },
        { name: 'descripcion', label: 'Descripción breve', type: 'textarea' },
        { name: 'archivo', label: 'Archivo PDF', type: 'file' },
      ],
    },
  };
}
