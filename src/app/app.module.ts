import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { DisplayComponent } from './display/display.component';
import { ImagesCounterComponent } from './display/images-counter/images-counter.component';
import { ImageInfoComponent } from './display/image-info/image-info.component';
import { ImageDropperComponent } from './upload/image-dropper/image-dropper.component';
import { ImageSelectorComponent } from './upload/image-selector/image-selector.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    DisplayComponent,
    ImagesCounterComponent,
    ImageInfoComponent,
    ImageDropperComponent,
    ImageSelectorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
