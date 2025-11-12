import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TouristReservationComponent } from './tourist-reservation.component';

describe('TouristReservationComponent', () => {
  let component: TouristReservationComponent;
  let fixture: ComponentFixture<TouristReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TouristReservationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TouristReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
