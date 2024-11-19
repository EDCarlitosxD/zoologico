import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecorridoHomeComponent } from './recorrido-home.component';

describe('RecorridoHomeComponent', () => {
  let component: RecorridoHomeComponent;
  let fixture: ComponentFixture<RecorridoHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecorridoHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecorridoHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
