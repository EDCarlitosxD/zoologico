import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGuiaComponent } from './add-guia.component';

describe('AddGuiaComponent', () => {
  let component: AddGuiaComponent;
  let fixture: ComponentFixture<AddGuiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGuiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGuiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
