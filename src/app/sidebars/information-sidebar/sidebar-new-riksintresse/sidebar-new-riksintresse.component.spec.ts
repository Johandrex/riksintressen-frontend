import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarNewRiksintresseComponent } from './sidebar-new-riksintresse.component';

describe('SidebarNewRiksintresseComponent', () => {
  let component: SidebarNewRiksintresseComponent;
  let fixture: ComponentFixture<SidebarNewRiksintresseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarNewRiksintresseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarNewRiksintresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
