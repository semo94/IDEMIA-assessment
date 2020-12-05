import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesCounterComponent } from './images-counter.component';

describe('ImagesCounterComponent', () => {
  let component: ImagesCounterComponent;
  let fixture: ComponentFixture<ImagesCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagesCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
