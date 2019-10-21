import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTaskListComponent } from './page-task-list.component';

describe('PageTaskListComponent', () => {
  let component: PageTaskListComponent;
  let fixture: ComponentFixture<PageTaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageTaskListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
