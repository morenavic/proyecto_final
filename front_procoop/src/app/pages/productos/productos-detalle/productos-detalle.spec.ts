import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductosDetalle } from './productos-detalle';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

describe('ProductosDetalle', () => {
  it('debería crearse correctamente', async () => {
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

    expect(component.producto).toBeUndefined();
  });
});
