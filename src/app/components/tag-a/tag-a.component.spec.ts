import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagAComponent } from './tag-a.component';

describe('TagAComponent', () => {
  let component: TagAComponent;
  let fixture: ComponentFixture<TagAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
