import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTarjetaComponent } from './add-tarjeta.component';

describe('AddTarjetaComponent', () => {
  let component: AddTarjetaComponent;
  let fixture: ComponentFixture<AddTarjetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTarjetaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
