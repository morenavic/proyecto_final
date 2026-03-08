import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelClienteNoticias } from './panel-cliente-noticias';
import { provideRouter } from '@angular/router';

describe('PanelClienteNoticias', () => {
  let component: PanelClienteNoticias;
  let fixture: ComponentFixture<PanelClienteNoticias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelClienteNoticias],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelClienteNoticias);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
