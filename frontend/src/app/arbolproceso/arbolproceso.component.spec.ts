import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolprocesoComponent } from './arbolproceso.component';

describe('ArbolprocesoComponent', () => {
  let component: ArbolprocesoComponent;
  let fixture: ComponentFixture<ArbolprocesoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArbolprocesoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbolprocesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
