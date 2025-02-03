import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSentConfirmationComponent } from './email-sent-confirmation.component';

describe('EmailSentConfirmationComponent', () => {
  let component: EmailSentConfirmationComponent;
  let fixture: ComponentFixture<EmailSentConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailSentConfirmationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailSentConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
