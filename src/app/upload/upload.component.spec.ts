import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UploadComponent } from './upload.component';
import * as ImagesActions from '../store/actions/images.actions';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppState } from '../app.state';



describe('UploadComponent', () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;
  let store: MockStore<AppState>;

  const initialState = {
    counter: 0,
    info: [1]
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadComponent ],
      imports: [],
      providers: [provideMockStore({ initialState })]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => { });
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should validate file format to be an image', () => {
    const textFile = {
      lastModified: 1438583972000,
      lastModifiedDate: '2015-08-03T06:39:32.000Z',
      name: 'readme.txt',
      size: 236,
      type: 'text/plain',
      relativePath: './readme.txt',
      data: 'data:text/plain;base64,DQojaWdub3JlIHRodW1ibmFpbHMgY3JlYXRlZCBieSB3aW5kb3dz…xoDQoqLmJhaw0KKi5jYWNoZQ0KKi5pbGsNCioubG9nDQoqLmRsbA0KKi5saWINCiouc2JyDQo='
    };
    expect(component.isFormatAllowed(textFile.name)).toBe(false);
  });

  it('should modify storage state with adding a new image', () => {
    const newImg = {
      name: 'C',
      size: '70 KB',
      format: 'gif',
      date: '2021-1-1',
      dataURL: 'C.gif'
    };
    store.dispatch(new ImagesActions.AddImage(newImg));
    expect(store.dispatch).toHaveBeenCalled();
  });
});

