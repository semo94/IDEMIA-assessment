import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Images } from '../store/models/images.model';
import { ImageManagerService } from '../services/image.manager.service';
import { AppState } from '../app.state';
import * as ImagesActions from '../store/actions/images.actions';
@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
  providers: [ImageManagerService]
})
export class DisplayComponent implements OnInit {

  images: Observable<Images>;
  public displayedColumns: string[] = ['name', 'date', 'format', 'size', 'thumbnail'];

  constructor(private store: Store<AppState>, private imageManagerService: ImageManagerService) {
    this.images = store.select('images');
  }

  ngOnInit(): void {}

  public delete(index, name, format) {
    const fullName = name.concat('.').concat(format);
    this.imageManagerService.deleteFile(fullName);
    this.store.dispatch(new ImagesActions.RemoveImage(index));
  }
}
