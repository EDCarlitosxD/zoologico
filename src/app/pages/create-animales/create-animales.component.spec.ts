import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnimalesComponent } from './create-animales.component';

describe('CreateAnimalesComponent', () => {
  let component: CreateAnimalesComponent;
  let fixture: ComponentFixture<CreateAnimalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAnimalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAnimalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
