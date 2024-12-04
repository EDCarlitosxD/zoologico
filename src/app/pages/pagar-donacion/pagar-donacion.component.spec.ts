import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagarDonacionComponent } from './pagar-donacion.component';

describe('PagarDonacionComponent', () => {
  let component: PagarDonacionComponent;
  let fixture: ComponentFixture<PagarDonacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagarDonacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagarDonacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
