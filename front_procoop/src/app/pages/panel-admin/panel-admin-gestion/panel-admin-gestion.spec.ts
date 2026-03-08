import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelAdminGestion } from './panel-admin-gestion';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { PanelAdminDataService } from '../panel-admin-data';

/**
 * Tests del componente PanelAdminGestion.
 *
 * Se valida principalmente:
 * - inicialización del componente
 * - carga dinámica de configuración según :tipo
 * - renderizado de columnas basado en configuración
 * - visibilidad de acciones según entidad
 */
describe('PanelAdminGestion', () => {
  let fixture: ComponentFixture<PanelAdminGestion>;
  let component: PanelAdminGestion;

  /**
   * BehaviorSubject permite simular cambios en el parámetro
   * de la ruta de forma reactiva, reproduciendo el comportamiento
   * del router real sin necesidad de navegación.
   */
  let paramMapSubject: BehaviorSubject<any>;

  /**
   * Mock del DataService.
   *
   * Se utiliza para aislar la lógica del componente
   * sin depender de datos externos o backend.
   *
   * En backend real:
   * estos métodos serán reemplazados por llamadas HTTP.
   */
  const dataServiceMock = {
    getAll: jasmine.createSpy('getAll').and.callFake((tipo: string) => {
      const data: any = {
        novedades: [
          { id: 1, titulo: 'Mejora en reportes', fecha: '12/08/2025' },
          { id: 2, titulo: 'Nueva versión móvil', fecha: '05/07/2025' },
        ],

        servicios: [{ id: 1, titulo: 'Consultoría Profesional', categoria: 'Profesional' }],

        clientes: [{ id: 1, cooperativa: 'Cooperativa Ejemplo', cuenta: '12345', inactivo: false }],

        documentos: [{ id: 1, nombre: 'manual_gestion.pdf', tipo: 'Manual' }],
      };

      return data[tipo] ?? [];
    }),

    delete: jasmine.createSpy('delete'),
  };

  /**
   * Helper de inicialización del componente.
   *
   * Permite simular distintos valores del parámetro :tipo
   * sin depender de navegación real.
   *
   * Esto facilita probar el comportamiento dinámico
   * del componente.
   */
  function setup(tipo: string) {
    paramMapSubject = new BehaviorSubject(convertToParamMap({ tipo }));

    const activatedRouteMock = {
      paramMap: paramMapSubject.asObservable(),
    };

    TestBed.configureTestingModule({
      imports: [PanelAdminGestion, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: PanelAdminDataService, useValue: dataServiceMock },
      ],
    });

    fixture = TestBed.createComponent(PanelAdminGestion);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }

  /* ============================
     CREACIÓN
  ============================ */

  /**
   * Verifica que el componente inicializa correctamente
   * con la configuración mínima necesaria.
   */
  it('debe crearse correctamente', () => {
    setup('novedades');

    expect(component).toBeTruthy();
  });

  /* ============================
     CONFIGURACIÓN SEGÚN TIPO
  ============================ */

  /**
   * Valida que el componente cargue correctamente
   * la configuración correspondiente a la entidad.
   */
  it('debe cargar configuración de novedades', () => {
    setup('novedades');

    expect(component.tipo).toBe('novedades');
    expect(component.config.titulo).toBe('Gestión de novedades');
    expect(component.items.length).toBe(2);
  });

  it('debe cargar configuración de servicios', () => {
    setup('servicios');

    expect(component.tipo).toBe('servicios');
    expect(component.config.titulo).toBe('Gestión de servicios');
    expect(component.items.length).toBe(1);
  });

  /* ============================
     CAMBIO DINÁMICO DE TIPO
  ============================ */

  /**
   * Verifica que el componente responda correctamente
   * a cambios en el parámetro :tipo sin recrearse.
   */
  it('debe actualizar configuración al cambiar el parámetro', () => {
    setup('novedades');

    paramMapSubject.next(convertToParamMap({ tipo: 'clientes' }));

    fixture.detectChanges();

    expect(component.tipo).toBe('clientes');
    expect(component.config.titulo).toBe('Gestión de clientes');
  });

  /* ============================
     RENDERIZADO DE COLUMNAS
  ============================ */

  /**
   * Valida que las columnas se generen dinámicamente
   * a partir de la configuración del componente.
   */
  it('debe renderizar columnas dinámicamente', () => {
    setup('novedades');

    const headers = fixture.debugElement.queryAll(By.css('thead th'));

    const headerTexts = headers.map((h) => h.nativeElement.textContent.trim());

    expect(headerTexts).toContain('Título');
    expect(headerTexts).toContain('Fecha');
    expect(headerTexts).toContain('Acciones');
  });

  /* ============================
     ACCIONES CONDICIONALES
  ============================ */

  /**
   * Verifica que las acciones disponibles
   * se rendericen según la configuración de la entidad.
   */
  it('novedades debe mostrar botón eliminar', () => {
    setup('novedades');

    const botones = fixture.debugElement.queryAll(By.css('.btn-danger'));

    expect(botones.length).toBeGreaterThan(0);
  });

  it('servicios debe mostrar botón eliminar', () => {
    setup('servicios');

    const botones = fixture.debugElement.queryAll(By.css('.btn-danger'));

    expect(botones.length).toBeGreaterThan(0);
  });
});
