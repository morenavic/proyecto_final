import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelAdminAbm } from './panel-admin-abm';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { PanelAdminDataService } from '../panel-admin-data';
import { RouterTestingModule } from '@angular/router/testing';

/**
 * Tests unitarios del componente PanelAdminAbm.
 *
 * Se validan los flujos principales del ABM:
 * - inicialización del componente
 * - construcción dinámica del formulario
 * - modo crear vs modo edición
 * - interacción con el DataService
 * - validación de archivos PDF
 */
describe('PanelAdminAbm', () => {
  let component: PanelAdminAbm;
  let fixture: ComponentFixture<PanelAdminAbm>;

  /**
   * BehaviorSubject permite simular cambios
   * del parámetro de ruta de forma reactiva.
   *
   * Esto reproduce el comportamiento real del router
   * sin depender de navegación real.
   */
  let paramMapSubject: BehaviorSubject<any>;

  /**
   * Mock del DataService.
   * Permite aislar el componente y verificar
   * únicamente su lógica interna.
   *
   * En backend real:
   * estos métodos serán reemplazados por llamadas HTTP.
   */
  let dataServiceMock: any;

  /**
   * Mock del Router utilizado para validar
   * redirecciones después del submit.
   */
  let routerMock: any;

  /**
   * Helper de inicialización del componente.
   *
   * Permite crear el componente con distintos valores
   * del parámetro :tipo y :id simulando rutas reales.
   */
  function setup(tipo: string, id?: string) {
    paramMapSubject = new BehaviorSubject(convertToParamMap({ tipo, id }));

    const activatedRouteMock = {
      paramMap: paramMapSubject.asObservable(),
    };

    dataServiceMock = {
      getById: jasmine.createSpy('getById').and.returnValue({
        titulo: 'Test',
        fecha: '2025-01-01',
        contenido: 'Contenido test',
      }),
      create: jasmine.createSpy('create'),
      update: jasmine.createSpy('update'),
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    TestBed.configureTestingModule({
      imports: [PanelAdminAbm, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: PanelAdminDataService, useValue: dataServiceMock },
      ],
    });

    fixture = TestBed.createComponent(PanelAdminAbm);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }

  /* ============================
     CREACIÓN DEL COMPONENTE
     ============================ */

  /**
   * Verifica que el componente se inicializa correctamente
   * con la configuración mínima necesaria.
   */
  it('debe crearse correctamente', () => {
    setup('novedades');

    expect(component).toBeTruthy();
  });

  /* ============================
     FORMULARIO DINÁMICO
     ============================ */

  /**
   * Valida que el formulario se construye
   * a partir de la configuración de la entidad.
   *
   * Este test protege la arquitectura dinámica
   * del ABM basada en config.campos.
   */
  it('debe crear los controles del formulario según la configuración', () => {
    setup('novedades');

    expect(component.form.contains('titulo')).toBeTrue();
    expect(component.form.contains('fecha')).toBeTrue();
    expect(component.form.contains('contenido')).toBeTrue();
  });

  /* ============================
     MODO CREAR
     ============================ */

  /**
   * Si la ruta no contiene id,
   * el componente debe operar en modo creación.
   */
  it('debe estar en modo crear cuando no existe id', () => {
    setup('novedades');

    expect(component.modoEdicion).toBeFalse();
  });

  /**
   * Verifica que el submit delega correctamente
   * la creación al DataService.
   */
  it('debe llamar a create cuando se envía el formulario en modo crear', () => {
    setup('novedades');

    component.form.patchValue({
      titulo: 'Nueva novedad',
      fecha: '2025-01-01',
      contenido: 'Contenido',
    });

    component.onSubmit();

    expect(dataServiceMock.create).toHaveBeenCalled();
  });

  /* ============================
     MODO EDICIÓN
     ============================ */

  /**
   * Si la ruta contiene id,
   * el componente entra en modo edición.
   */
  it('debe entrar en modo edición cuando existe id', () => {
    setup('novedades', '1');

    expect(component.modoEdicion).toBeTrue();
  });

  /**
   * En modo edición el componente debe
   * recuperar los datos existentes y cargarlos
   * en el formulario.
   */
  it('debe cargar datos cuando está en modo edición', () => {
    setup('novedades', '1');

    expect(dataServiceMock.getById).toHaveBeenCalledWith('novedades', 1);

    expect(component.form.value.titulo).toBe('Test');
  });

  /**
   * El submit en modo edición debe delegar
   * la actualización al DataService.
   */
  it('debe llamar a update cuando se envía el formulario en modo edición', () => {
    setup('novedades', '1');

    component.form.patchValue({
      titulo: 'Actualizado',
      fecha: '2025-01-01',
      contenido: 'Contenido',
    });

    component.onSubmit();

    expect(dataServiceMock.update).toHaveBeenCalled();
  });

  /* ============================
     VALIDACIÓN
     ============================ */

  /**
   * El formulario no debe enviarse si es inválido.
   * Esto protege contra persistencia de datos incompletos.
   */
  it('no debe enviar el formulario si es inválido', () => {
    setup('novedades');

    component.form.patchValue({
      titulo: '',
      fecha: '',
      contenido: '',
    });

    component.onSubmit();

    expect(dataServiceMock.create).not.toHaveBeenCalled();
  });

  /* ============================
     MANEJO ARCHIVO PDF
     ============================ */

  /**
   * Valida el flujo correcto de carga de archivo
   * cuando el tipo es PDF.
   */
  it('debe aceptar un archivo PDF válido', () => {
    setup('documentos');

    const file = new File(['test'], 'archivo.pdf', {
      type: 'application/pdf',
    });

    const event = {
      target: {
        files: [file],
      },
    };

    component.onFileChange(event, 'archivo');

    expect(component.nombreArchivo).toBe('archivo.pdf');
  });

  /**
   * Verifica que el componente rechaza archivos
   * que no sean PDF.
   */
  it('debe rechazar archivos que no sean PDF', () => {
    setup('documentos');

    spyOn(window, 'alert');

    const file = new File(['test'], 'archivo.txt', {
      type: 'text/plain',
    });

    const event = {
      target: {
        files: [file],
      },
    };

    component.onFileChange(event, 'archivo');

    expect(window.alert).toHaveBeenCalled();
    expect(component.nombreArchivo).toBeNull();
  });
});
