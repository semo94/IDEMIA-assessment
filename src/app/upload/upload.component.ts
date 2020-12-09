import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { ImageManagerService } from '../services/image.manager.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Image } from '../store/models/image.model';
import * as ImagesActions from '../store/actions/images.actions';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  providers: [ImageManagerService]
})
export class UploadComponent implements OnInit {

  constructor(private store: Store<AppState>, private imageManagerService: ImageManagerService) { }
  ngOnInit(): void { }

  public upload(input: NgxFileDropEntry[]) {
    if (this.imageManagerService.isInputValid(input)) {
      this.imageManagerService.generateResult(input[0]).subscribe((response: Image): void => {
        this.store.dispatch(new ImagesActions.AddImage(response));
      });
    }
  }
}
