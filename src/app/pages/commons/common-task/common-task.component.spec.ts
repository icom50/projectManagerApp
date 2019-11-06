import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonTaskComponent } from './common-task.component';

describe('CommonTaskComponent', () => {
  let component: CommonTaskComponent;
  let fixture: ComponentFixture<CommonTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
