import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';
import { Image } from '../store/models/image.model';
import { ElectronService } from 'ngx-electron';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { Observable, Observer } from 'rxjs';
import * as imageFilterCore from 'image-filter-core';
import * as imageGrayscale from 'image-filter-grayscale';

@Injectable({
  providedIn: 'root'
})
export class ImageManagerService {
  data: Image;
  fs: any;
  os: any;
  path: any;

  constructor(private electronService: ElectronService) {
    if (this.electronService.isElectronApp) {
      this.fs = this.electronService.remote.require('fs');
      this.os = this.electronService.remote.require('os');
      this.path = this.electronService.remote.require('path');
    }
  }

  public generateResult(input: NgxFileDropEntry): Observable<any> {
    return new Observable((observer: Observer<Image>) => {
      this.constructFileObject(input, (file: File) => {
        const reader = new FileReader();
        reader.onload = async () => {
          let dataURL = reader.result as string;
          dataURL = await this.convert2Grayscale(dataURL);
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
      // create images folder if not exist
      const homedir = this.os.homedir();
      const dir = this.path.resolve(homedir, 'IDM_Photo');
      if (!this.fs.existsSync(dir)) {
        this.fs.mkdirSync(dir);
      }
      // construct the path of the image
      const imagePath = this.path.resolve(dir, name);
      this.fs.writeFile(imagePath, decodedImage.data, 'base64', (error) => {
        if (error) { throw error; }
        console.log('File has been saved on: ', imagePath);
      });
    }
  }

  public deleteFile(name: string) {
    if (this.electronService.isElectronApp) {
      const imagePath = this.path.resolve(this.os.homedir(), 'IDM_Photo', name);
      if (this.fs.existsSync(imagePath)) {
        this.fs.unlink(imagePath, (err: any) => {
          if (err) { throw err; }
          console.log(imagePath, ' has been deleted');
        });
      }
    }
  }

  public async convert2Grayscale(dataURL: string) {
    const imageData = await this.drawImage(dataURL);
    const converted = await imageGrayscale(imageData, 4)
    .then((result: any) => {
        return imageFilterCore.convertImageDataToCanvasURL(result);
    }).catch((error: any) => { console.log(error); });
    return converted;
  }

  public drawImage(dataURL: string) {
    return new Promise<ImageData>(resolved => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0, img.width, img.height);
        const imageData = context.getImageData(0, 0, img.width, img.height);
        resolved(imageData);
      };
      img.src = dataURL;
    });
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
