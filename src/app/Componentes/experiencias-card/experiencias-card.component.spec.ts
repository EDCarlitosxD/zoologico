import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienciasCardComponent } from './experiencias-card.component';

describe('ExperienciasCardComponent', () => {
  let component: ExperienciasCardComponent;
  let fixture: ComponentFixture<ExperienciasCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienciasCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienciasCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
