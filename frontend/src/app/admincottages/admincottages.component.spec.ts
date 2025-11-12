import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmincottagesComponent } from './admincottages.component';

describe('AdmincottagesComponent', () => {
  let component: AdmincottagesComponent;
  let fixture: ComponentFixture<AdmincottagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmincottagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmincottagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
