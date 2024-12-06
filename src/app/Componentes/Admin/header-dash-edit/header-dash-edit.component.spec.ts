import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDashEditComponent } from './header-dash-edit.component';

describe('HeaderDashEditComponent', () => {
  let component: HeaderDashEditComponent;
  let fixture: ComponentFixture<HeaderDashEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderDashEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderDashEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
