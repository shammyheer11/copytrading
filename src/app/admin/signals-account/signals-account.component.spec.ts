import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsAccountComponent } from './signals-account.component';

describe('SignalsAccountComponent', () => {
  let component: SignalsAccountComponent;
  let fixture: ComponentFixture<SignalsAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignalsAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalsAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
