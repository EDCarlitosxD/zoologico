import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CierreDonacionComponent } from './cierre-donacion.component';

describe('CierreDonacionComponent', () => {
  let component: CierreDonacionComponent;
  let fixture: ComponentFixture<CierreDonacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CierreDonacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CierreDonacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
