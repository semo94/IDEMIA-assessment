import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppState } from '../app.state';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { DisplayComponent } from './display.component';
import * as ImagesActions from '../store/actions/images.actions';
import { By } from '@angular/platform-browser';

describe('DisplayComponent', () => {
  let component: DisplayComponent;
  let fixture: ComponentFixture<DisplayComponent>;
  let store: MockStore<AppState>;
  const initialState = {
    counter: 0,
    info: [
      {
        name: 'A',
        size: '38 KB',
        format: 'jpeg',
        date: '2020-12-06',
        dataURL: 'A.jpeg'
      },
      {
        name: 'B',
        size: '100 KB',
        format: 'png',
        date: '2019-11-21',
        dataURL: 'B.png'
      },
    ]
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayComponent ],
      imports: [],
      providers: [provideMockStore({ initialState })]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it('should create the display component with its initial state', () => {
    expect(component).toBeTruthy();
  });

  it('should update the UI when deleting images', () => {
    store.dispatch(new ImagesActions.RemoveImage(1));
    store.dispatch(new ImagesActions.RemoveImage(2));
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('.dc-content')).length).toBe(0);
  });

  it('should dispatch delete action when delete function is invoked', () => {
    const row = 1;
    component.delete(1);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
