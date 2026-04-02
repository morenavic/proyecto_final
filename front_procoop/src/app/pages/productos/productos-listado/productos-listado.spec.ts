import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductosListado } from './productos-listado';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('ProductosListado', () => {
  let component: ProductosListado;
  let fixture: ComponentFixture<ProductosListado>;

  beforeEach(async () => {
    /*
      Configuración base del componente con router simulado.
      Decisión: incluir router porque el componente usa navegación en botones.
    */
    await TestBed.configureTestingModule({
      imports: [ProductosListado],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductosListado);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería tener productos cargados', () => {
    /*
      Se valida que el componente tenga datos disponibles.
      Fuente actual: array estático definido en el componente.
    */
    expect(component.productos.length).toBeGreaterThan(0);
  });

  it('debería renderizar la cantidad correcta de productos', () => {
    /*
      Se verifica que la UI refleje correctamente el estado del componente.
      Relación directa: productos[] → cards renderizadas.
    */
    const cards = fixture.debugElement.queryAll(By.css('.producto-card'));
    expect(cards.length).toBe(component.productos.length);
  });

  it('debería generar botones de navegación para cada producto', () => {
    /*
      Se valida que cada producto tenga una acción asociada (navegación).
      Decisión: no testear internals de RouterLink, solo la existencia del trigger.
    */
    const botones = fixture.debugElement.queryAll(By.css('button'));
    expect(botones.length).toBe(component.productos.length);
  });
});

/*
  ⚠️ FUTURO BACKEND:
  - productos dejará de ser un array local y vendrá de un servicio
  - será necesario mockear ProductoService
  - los tests deberán adaptarse a datos asincrónicos (Observables)
*/
