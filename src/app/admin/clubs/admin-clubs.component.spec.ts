import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClubsComponent } from './admin-clubs.component';

describe('AdminClubsComponent', () => {
  let component: AdminClubsComponent;
  let fixture: ComponentFixture<AdminClubsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminClubsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminClubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
