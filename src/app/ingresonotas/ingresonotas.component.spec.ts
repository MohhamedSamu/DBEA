import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresonotasComponent } from './ingresonotas.component';

describe('IngresonotasComponent', () => {
  let component: IngresonotasComponent;
  let fixture: ComponentFixture<IngresonotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresonotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresonotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
