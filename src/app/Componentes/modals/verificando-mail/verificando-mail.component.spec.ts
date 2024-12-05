import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificandoMailComponent } from './verificando-mail.component';

describe('VerificandoMailComponent', () => {
  let component: VerificandoMailComponent;
  let fixture: ComponentFixture<VerificandoMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificandoMailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificandoMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
