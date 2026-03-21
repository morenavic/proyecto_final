import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelClienteDocumentos } from './panel-cliente-documentos';
import { provideRouter } from '@angular/router';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería filtrar documentos por tipo manual', () => {
    component.setFiltro('manual');

    const resultado = component.documentosFiltrados;

    expect(resultado.every((doc) => doc.tipo === 'manual')).toBeTrue();
  });

  it('debería filtrar por búsqueda', () => {
    component.busqueda = 'gestión';

    const resultado = component.documentosFiltrados;

    expect(resultado.length).toBeGreaterThan(0);
    expect(resultado[0].nombre.toLowerCase()).toContain('gestión');
  });

  it('debería mostrar más documentos al hacer verMas()', () => {
    const limiteInicial = component.limite;

    component.verMas();

    expect(component.limite).toBe(limiteInicial + 3);
  });

  it('debería detectar si hay más documentos', () => {
    component.limite = 1;

    expect(component.hayMasDocumentos).toBeTrue();
  });
});
