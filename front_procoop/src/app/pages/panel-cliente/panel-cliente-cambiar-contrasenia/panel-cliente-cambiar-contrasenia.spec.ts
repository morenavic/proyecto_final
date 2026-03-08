import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelClienteCambiarContrasenia } from './panel-cliente-cambiar-contrasenia';
import { provideRouter } from '@angular/router';

describe('PanelClienteCambiarContrasenia', () => {
  let component: PanelClienteCambiarContrasenia;
  let fixture: ComponentFixture<PanelClienteCambiarContrasenia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelClienteCambiarContrasenia],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelClienteCambiarContrasenia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
