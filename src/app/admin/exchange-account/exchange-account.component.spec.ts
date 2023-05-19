import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeAccountComponent } from './exchange-account.component';

describe('ExchangeAccountComponent', () => {
  let component: ExchangeAccountComponent;
  let fixture: ComponentFixture<ExchangeAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangeAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExchangeAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
