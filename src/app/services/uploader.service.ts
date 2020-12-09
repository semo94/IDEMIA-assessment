import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { Image } from '../store/models/image.model';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { Observable, Observer } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UploaderService {
  data: Image;

  constructor() { }

  public generateResult(input: NgxFileDropEntry): Observable<any> {
    return new Observable((observer: Observer<Image>) => {
      const fileEntry = input.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.prepareData(reader.result as string, file);
          observer.next(this.data);
          observer.complete();
        };
        reader.readAsDataURL(file);
      });
    });
  }

  public prepareData(dataURL: string, file: File) {
    this.data = {
      name: file.name.replace(/\.[^/.]+$/, ''),
      format: file.type,
      size: Math.round(file.size / 1024) + ' KB',
      date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      dataURL
    };
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
}


