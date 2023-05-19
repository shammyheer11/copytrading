import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerAlertsComponent } from './ticker-alerts.component';

describe('TickerAlertsComponent', () => {
  let component: TickerAlertsComponent;
  let fixture: ComponentFixture<TickerAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TickerAlertsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TickerAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
