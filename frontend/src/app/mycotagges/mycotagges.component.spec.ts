import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycotaggesComponent } from './mycotagges.component';

describe('MycotaggesComponent', () => {
  let component: MycotaggesComponent;
  let fixture: ComponentFixture<MycotaggesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MycotaggesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MycotaggesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
