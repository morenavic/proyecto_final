import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelClienteHome } from './panel-cliente-home';
import { provideRouter } from '@angular/router';

describe('PanelClienteHome', () => {
  let component: PanelClienteHome;
  let fixture: ComponentFixture<PanelClienteHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelClienteHome],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelClienteHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
