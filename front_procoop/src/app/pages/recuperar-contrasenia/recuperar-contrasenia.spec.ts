import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarContrasenia } from './recuperar-contrasenia';
import { provideRouter } from '@angular/router';

describe('RecuperarContrasenia', () => {
  let component: RecuperarContrasenia;
  let fixture: ComponentFixture<RecuperarContrasenia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuperarContrasenia],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarContrasenia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
