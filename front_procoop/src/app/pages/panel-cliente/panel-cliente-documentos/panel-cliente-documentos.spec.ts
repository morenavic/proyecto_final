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
});
