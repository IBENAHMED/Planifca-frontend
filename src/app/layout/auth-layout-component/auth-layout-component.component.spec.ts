import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLayoutComponentComponent } from './auth-layout-component.component';

describe('AuthLayoutComponentComponent', () => {
  let component: AuthLayoutComponentComponent;
  let fixture: ComponentFixture<AuthLayoutComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthLayoutComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthLayoutComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
