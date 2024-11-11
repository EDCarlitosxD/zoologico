import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoletosComponent } from './add-boletos.component';

describe('AddBoletosComponent', () => {
  let component: AddBoletosComponent;
  let fixture: ComponentFixture<AddBoletosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBoletosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBoletosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
