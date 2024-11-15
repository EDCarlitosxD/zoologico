import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalSoloComponent } from './animal-solo.component';

describe('AnimalSoloComponent', () => {
  let component: AnimalSoloComponent;
  let fixture: ComponentFixture<AnimalSoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalSoloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalSoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
