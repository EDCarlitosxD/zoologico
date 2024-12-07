import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBoletoComponent } from './edit-boleto.component';

describe('EditBoletoComponent', () => {
  let component: EditBoletoComponent;
  let fixture: ComponentFixture<EditBoletoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBoletoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBoletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
