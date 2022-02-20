import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphRamComponent } from './graph-ram.component';

describe('GraphRamComponent', () => {
  let component: GraphRamComponent;
  let fixture: ComponentFixture<GraphRamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphRamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphRamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
