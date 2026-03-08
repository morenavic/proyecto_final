import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosListado } from './productos-listado';
import { provideRouter } from '@angular/router';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
