import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BolDisponiblesComponent } from './bol-disponibles.component';

describe('BolDisponiblesComponent', () => {
  let component: BolDisponiblesComponent;
  let fixture: ComponentFixture<BolDisponiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BolDisponiblesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BolDisponiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
