import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { Image } from '../store/models/image.model';
import { ElectronService } from 'ngx-electron';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { Observable, Observer } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ImageManagerService {
  data: Image;

  constructor(private electronService: ElectronService) { }

  public generateResult(input: NgxFileDropEntry): Observable<any> {
    return new Observable((observer: Observer<Image>) => {
      this.constructFileObject(input, (file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
          const dataURL = reader.result as string;
          this.saveFile(dataURL, file.name);
          this.prepareData(dataURL, file);
          observer.next(this.data);
          observer.complete();
        };
        reader.readAsDataURL(file);
      });
    });
  }

  public constructFileObject(input, callback) {
    const fileEntry = input.fileEntry as FileSystemFileEntry;
    fileEntry.file(callback);
  }

  public prepareData(dataURL: string, file: File) {
    this.data = {
      name: file.name.replace(/\.[^/.]+$/, ''),
      format: file.name.split('.').pop(),
      size: Math.round(file.size / 1024) + ' KB',
      date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      dataURL
    };
  }

  public saveFile(dataURL: string, name: string) {
    const decodedImage = this.decodeBase64Image(dataURL);
    if (this.electronService.isElectronApp) {
      this.electronService.ipcRenderer.send('save_image', { data: decodedImage.data, name });
    }
  }

  public deleteFile(name: string) {
    if (this.electronService.isElectronApp) {
      this.electronService.ipcRenderer.send('delete_image', name);
    }
  }

  public isInputValid(input: NgxFileDropEntry[]) {
    if (input.length > 1) { // validate size
      // TODO: send notification
      return false;
    } else if (!input[0].fileEntry.isFile) { // validate type
      // TODO: send notification
      return false;
    } else if (!this.isFormatAllowed(input[0].fileEntry.name)) { // validate formate
      // TODO: send notification
      return false;
    } else {
      return true;
    }
  }

  public isFormatAllowed(fileName: string) {
    let isFileAllowed = false;
    const allowedFiles = ['', '.jpg', '.jpeg', '.png'];
    const regex = /(?:\.([^.]+))?$/;
    const extension = regex.exec(fileName);
    if (undefined !== extension && null !== extension) {
      for (const ext of allowedFiles) {
        if (ext === extension[0]) {
          isFileAllowed = true;
        }
      }
    }
    return isFileAllowed;
  }

  public decodeBase64Image(dataString: string) {
    const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    return {
      type : matches[1],
      data : Buffer.from(matches[2], 'base64')
    };
  }
}

