import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductosDetalle } from './productos-detalle';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

describe('ProductosDetalle', () => {
  /*
    Se mockea ActivatedRoute para simular distintos escenarios de navegación.
    Decisión: usar snapshot.paramMap para representar cómo el componente obtiene el id.
  */

  it('debería crearse correctamente', async () => {
    const mockRoute = {
      snapshot: {
        paramMap: {
          get: () => '1',
        },
      },
    };

    /*
      Cada test configura su propio TestBed.
      Decisión: evitar beforeEach compartido para poder cambiar providers (route) sin conflictos.
    */
    await TestBed.configureTestingModule({
      imports: [ProductosDetalle],
      providers: [provideRouter([]), { provide: ActivatedRoute, useValue: mockRoute }],
    }).compileComponents();

    const fixture = TestBed.createComponent(ProductosDetalle);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('debería obtener el producto según el id de la ruta', async () => {
    const mockRoute = {
      snapshot: {
        paramMap: {
          get: () => '1',
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [ProductosDetalle],
      providers: [provideRouter([]), { provide: ActivatedRoute, useValue: mockRoute }],
    }).compileComponents();

    const fixture = TestBed.createComponent(ProductosDetalle);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    /*
      Se valida el flujo principal:
      - leer id desde la ruta
      - buscar producto correspondiente
    */
    expect(component.producto).toBeDefined();
    expect(component.producto?.id).toBe(1);
  });

  it('debería devolver undefined si el producto no existe', async () => {
    const mockRoute = {
      snapshot: {
        paramMap: {
          get: () => '999',
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [ProductosDetalle],
      providers: [provideRouter([]), { provide: ActivatedRoute, useValue: mockRoute }],
    }).compileComponents();

    const fixture = TestBed.createComponent(ProductosDetalle);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    /*
      Se cubre caso borde:
      id inexistente → producto undefined
      Evita errores en UI y navegación inválida.
    */
    expect(component.producto).toBeUndefined();
  });
});

/*
  ⚠️ FUTURO BACKEND:
  - El producto ya no se buscará en un array local
  - Se deberá mockear un ProductoService en lugar de ActivatedRoute únicamente
  - Los tests deberán contemplar llamadas async (Observables / HTTP)
*/
