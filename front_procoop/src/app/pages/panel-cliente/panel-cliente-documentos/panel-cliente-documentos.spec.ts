import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelClienteDocumentos } from './panel-cliente-documentos';
import { provideRouter } from '@angular/router';

/*
  Suite de tests del componente de documentos.

  Se valida principalmente:
  - lógica de filtrado
  - paginación simple ("ver más")
  - comportamiento del estado derivado
*/
describe('PanelClienteDocumentos', () => {
  let component: PanelClienteDocumentos;
  let fixture: ComponentFixture<PanelClienteDocumentos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelClienteDocumentos],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelClienteDocumentos);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  /*
    Verifica creación del componente.
  */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*
    Testea filtrado por tipo.

    Asegura que el filtro "manual" devuelva solo documentos de ese tipo.
  */
  it('debería filtrar documentos por tipo manual', () => {
    component.setFiltro('manual');

    const resultado = component.documentosFiltrados;

    expect(resultado.every((doc) => doc.tipo === 'manual')).toBeTrue();
  });

  /*
    Testea búsqueda por texto.

    Verifica que el filtro de búsqueda funcione correctamente.
  */
  it('debería filtrar por búsqueda', () => {
    component.busqueda = 'gestión';

    const resultado = component.documentosFiltrados;

    expect(resultado.length).toBeGreaterThan(0);
    expect(resultado[0].nombre.toLowerCase()).toContain('gestión');
  });

  /*
    Testea la lógica de paginación simple.

    Verifica que el límite aumente correctamente.
  */
  it('debería mostrar más documentos al hacer verMas()', () => {
    const limiteInicial = component.limite;

    component.verMas();

    expect(component.limite).toBe(limiteInicial + 3);
  });

  /*
    Verifica la lógica que controla la visibilidad del botón "Ver más".
  */
  it('debería detectar si hay más documentos', () => {
    component.limite = 1;

    expect(component.hayMasDocumentos).toBeTrue();
  });
});
