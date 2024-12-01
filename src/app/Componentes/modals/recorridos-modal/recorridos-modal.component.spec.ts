import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecorridosModalComponent } from './recorridos-modal.component';

describe('RecorridosModalComponent', () => {
  let component: RecorridosModalComponent;
  let fixture: ComponentFixture<RecorridosModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecorridosModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecorridosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
