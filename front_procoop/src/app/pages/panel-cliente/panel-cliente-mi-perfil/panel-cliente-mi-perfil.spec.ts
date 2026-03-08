import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelClienteMiPerfil } from './panel-cliente-mi-perfil';
import { provideRouter } from '@angular/router';

describe('PanelClienteMiPerfil', () => {
  let component: PanelClienteMiPerfil;
  let fixture: ComponentFixture<PanelClienteMiPerfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelClienteMiPerfil],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelClienteMiPerfil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
