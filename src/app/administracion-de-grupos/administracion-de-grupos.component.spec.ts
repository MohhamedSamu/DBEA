import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionDeGruposComponent } from './administracion-de-grupos.component';

describe('AdministracionDeGruposComponent', () => {
  let component: AdministracionDeGruposComponent;
  let fixture: ComponentFixture<AdministracionDeGruposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministracionDeGruposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministracionDeGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
