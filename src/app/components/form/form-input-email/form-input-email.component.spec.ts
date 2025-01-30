import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputEmailComponent } from './form-input-email.component';

describe('FormInputEmailComponent', () => {
  let component: FormInputEmailComponent;
  let fixture: ComponentFixture<FormInputEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormInputEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormInputEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
