import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextGrid4Component } from './text-grid4.component';

describe('TextGrid4Component', () => {
  let component: TextGrid4Component;
  let fixture: ComponentFixture<TextGrid4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextGrid4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextGrid4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
