import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategiesListComponent } from './strategies-list.component';

describe('StrategiesListComponent', () => {
  let component: StrategiesListComponent;
  let fixture: ComponentFixture<StrategiesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrategiesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrategiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
