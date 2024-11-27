import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGuiasComponent } from './edit-guias.component';

describe('EditGuiasComponent', () => {
  let component: EditGuiasComponent;
  let fixture: ComponentFixture<EditGuiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditGuiasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditGuiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
