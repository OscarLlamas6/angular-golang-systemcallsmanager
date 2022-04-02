import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaprocesosComponent } from './listaprocesos.component';

describe('ListaprocesosComponent', () => {
  let component: ListaprocesosComponent;
  let fixture: ComponentFixture<ListaprocesosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaprocesosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaprocesosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
