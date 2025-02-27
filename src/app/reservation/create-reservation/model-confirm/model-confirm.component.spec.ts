import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelConfirmComponent } from './model-confirm.component';

describe('ModelConfirmComponent', () => {
  let component: ModelConfirmComponent;
  let fixture: ComponentFixture<ModelConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelConfirmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
