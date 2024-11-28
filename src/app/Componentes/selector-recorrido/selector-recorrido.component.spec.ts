import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorRecorridoComponent } from './selector-recorrido.component';

describe('SelectorRecorridoComponent', () => {
  let component: SelectorRecorridoComponent;
  let fixture: ComponentFixture<SelectorRecorridoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectorRecorridoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorRecorridoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
