import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionsOrderComponent } from './positions-order.component';

describe('PositionsOrderComponent', () => {
  let component: PositionsOrderComponent;
  let fixture: ComponentFixture<PositionsOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionsOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionsOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
