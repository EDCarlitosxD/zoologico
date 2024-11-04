import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextGrid5Component } from './text-grid5.component';

describe('TextGrid5Component', () => {
  let component: TextGrid5Component;
  let fixture: ComponentFixture<TextGrid5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextGrid5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextGrid5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
