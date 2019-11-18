import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendInformationComponent } from './send-information.component';

describe('SendInformationComponent', () => {
  let component: SendInformationComponent;
  let fixture: ComponentFixture<SendInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
