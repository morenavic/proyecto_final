import { TestBed } from '@angular/core/testing';
import { PanelAdminDataService } from './panel-admin-data';

describe('PanelAdminDataService', () => {
  let service: PanelAdminDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanelAdminDataService);
  });

  /* ============================
     CREACIÓN DEL SERVICE
  ============================ */

  /**
   * Verifica que el service se inicializa correctamente
   * dentro del sistema de inyección de dependencias de Angular.
   *
   * Este test protege contra errores de configuración
   * en providers o imports del módulo.
   */
  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  /* ============================
     GET ALL
  ============================ */

  /**
   * Valida que el método getAll devuelve
   * todos los registros de una entidad.
   *
   * Este método es utilizado por los componentes
   * de gestión para poblar las tablas del panel admin.
   *
   * En backend real:
   * este método será reemplazado por una llamada HTTP.
   */
  it('debe devolver todos los registros de un tipo', () => {
    const data = service.getAll('novedades');

    expect(data).toBeTruthy();
    expect(data.length).toBeGreaterThan(0);
  });

  /* ============================
     GET BY ID
  ============================ */

  /**
   * Verifica la búsqueda de un registro específico
   * por su identificador.
   *
   * Este método es utilizado por el ABM
   * para cargar datos en modo edición.
   */
  it('debe devolver un registro por id', () => {
    const item = service.getById('novedades', 1);

    expect(item).toBeTruthy();
    expect(item.id).toBe(1);
  });

  /* ============================
     CREATE
  ============================ */

  /**
   * Valida que create agrega un nuevo registro
   * al dataset interno.
   *
   * Se compara la cantidad de registros
   * antes y después de la operación.
   *
   * En backend real:
   * esta operación se realizará mediante POST.
   */
  it('debe agregar un nuevo registro', () => {
    const cantidadInicial = service.getAll('servicios').length;

    service.create('servicios', {
      titulo: 'Servicio Test',
      descripcion: 'Descripción test',
    });

    const nuevaCantidad = service.getAll('servicios').length;

    expect(nuevaCantidad).toBe(cantidadInicial + 1);
  });

  /* ============================
     UPDATE
  ============================ */

  /**
   * Verifica que update modifica correctamente
   * un registro existente sin reemplazar el resto
   * de las propiedades.
   *
   * Este método es utilizado por el ABM
   * cuando el formulario se envía en modo edición.
   *
   * En backend real:
   * se reemplazará por una operación PUT/PATCH.
   */
  it('debe actualizar un registro existente', () => {
    service.update('novedades', 1, {
      titulo: 'Título actualizado',
    });

    const itemActualizado = service.getById('novedades', 1);

    expect(itemActualizado.titulo).toBe('Título actualizado');
  });

  /* ============================
     DELETE
  ============================ */

  /**
   * Valida que delete elimina correctamente
   * un registro del dataset interno.
   *
   * Se crea un registro temporal para evitar
   * modificar los datos base del mock.
   *
   * En backend real:
   * esta operación se realizará mediante DELETE HTTP.
   */
  it('debe eliminar un registro', () => {
    service.create('servicios', {
      titulo: 'Servicio a eliminar',
      descripcion: 'Test',
    });

    const items = service.getAll('servicios');
    const idEliminar = items[items.length - 1].id;

    const cantidadInicial = items.length;

    service.delete('servicios', idEliminar);

    const nuevaCantidad = service.getAll('servicios').length;

    expect(nuevaCantidad).toBe(cantidadInicial - 1);
  });
});
