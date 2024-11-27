import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtrasBtnComponent } from './atras-btn.component';

describe('AtrasBtnComponent', () => {
  let component: AtrasBtnComponent;
  let fixture: ComponentFixture<AtrasBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtrasBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtrasBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
