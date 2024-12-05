import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailVerificadoComponent } from './mail-verificado.component';

describe('MailVerificadoComponent', () => {
  let component: MailVerificadoComponent;
  let fixture: ComponentFixture<MailVerificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MailVerificadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailVerificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
