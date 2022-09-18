import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstallationListComponent } from './installation-list.component';

describe('InstallationComponent', () => {
  let component: InstallationListComponent;
  let fixture: ComponentFixture<InstallationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstallationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
