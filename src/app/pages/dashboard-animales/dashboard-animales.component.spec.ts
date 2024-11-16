import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAnimalesComponent } from './dashboard-animales.component';

describe('DashboardAnimalesComponent', () => {
  let component: DashboardAnimalesComponent;
  let fixture: ComponentFixture<DashboardAnimalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAnimalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAnimalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
