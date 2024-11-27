import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecoVendidosComponent } from './edit-reco-vendidos.component';

describe('EditRecoVendidosComponent', () => {
  let component: EditRecoVendidosComponent;
  let fixture: ComponentFixture<EditRecoVendidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRecoVendidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRecoVendidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
