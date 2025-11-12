import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerReservationComponent } from './owner-reservation.component';

describe('OwnerReservationComponent', () => {
  let component: OwnerReservationComponent;
  let fixture: ComponentFixture<OwnerReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerReservationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
