import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAdminHome } from './panel-admin-home';
import { provideRouter } from '@angular/router';

describe('PanelAdminHome', () => {
  let component: PanelAdminHome;
  let fixture: ComponentFixture<PanelAdminHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelAdminHome],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelAdminHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
