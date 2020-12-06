import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxFileDropModule } from 'ngx-file-drop';

import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { DisplayComponent } from './display/display.component';
import { ImagesCounterComponent } from './display/images-counter/images-counter.component';
import { ImageInfoComponent } from './display/image-info/image-info.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    DisplayComponent,
    ImagesCounterComponent,
    ImageInfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxFileDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
