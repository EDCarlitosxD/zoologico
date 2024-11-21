import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRecorridoComponent } from './dashboard-recorrido.component';

describe('DashboardRecorridoComponent', () => {
  let component: DashboardRecorridoComponent;
  let fixture: ComponentFixture<DashboardRecorridoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardRecorridoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardRecorridoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
