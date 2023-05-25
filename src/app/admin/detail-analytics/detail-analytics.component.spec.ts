import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAnalyticsComponent } from './detail-analytics.component';

describe('DetailAnalyticsComponent', () => {
  let component: DetailAnalyticsComponent;
  let fixture: ComponentFixture<DetailAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailAnalyticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
