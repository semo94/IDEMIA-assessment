import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDropperComponent } from './image-dropper.component';

describe('ImageDropperComponent', () => {
  let component: ImageDropperComponent;
  let fixture: ComponentFixture<ImageDropperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageDropperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageDropperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
