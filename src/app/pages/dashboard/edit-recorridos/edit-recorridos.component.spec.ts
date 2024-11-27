import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecorridosComponent } from './edit-recorridos.component';

describe('EditRecorridosComponent', () => {
  let component: EditRecorridosComponent;
  let fixture: ComponentFixture<EditRecorridosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRecorridosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRecorridosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
