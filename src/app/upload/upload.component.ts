import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { UploaderService } from '../services/uploader.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Image } from '../store/models/image.model';
import * as ImagesActions from '../store/actions/images.actions';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  providers: [UploaderService]
})
export class UploadComponent implements OnInit {

  constructor(private store: Store<AppState>, private uploaderService: UploaderService) { }
  ngOnInit(): void { }

  public upload(input: NgxFileDropEntry[]) {
    if (this.uploaderService.isInputValid(input)) {
      this.uploaderService.generateResult(input[0]).subscribe((response: Image): void => {
        this.store.dispatch(new ImagesActions.AddImage(response));
      });
    }
  }
}
