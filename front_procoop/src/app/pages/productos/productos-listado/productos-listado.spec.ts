import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductosListado } from './productos-listado';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('ProductosListado', () => {
  let component: ProductosListado;
  let fixture: ComponentFixture<ProductosListado>;

  beforeEach(async () => {
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
    expect(component.productos.length).toBeGreaterThan(0);
  });

  it('debería renderizar la cantidad correcta de productos', () => {
    const cards = fixture.debugElement.queryAll(By.css('.producto-card'));
    expect(cards.length).toBe(component.productos.length);
  });

  it('debería generar botones de navegación para cada producto', () => {
    const botones = fixture.debugElement.queryAll(By.css('button'));
    expect(botones.length).toBe(component.productos.length);
  });
});
