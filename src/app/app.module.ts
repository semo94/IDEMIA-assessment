import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxFileDropModule } from 'ngx-file-drop';
import { StoreModule } from '@ngrx/store';
import { MatTableModule } from '@angular/material/table' ;

import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { DisplayComponent } from './display/display.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ImagesReducer } from './store/reducers/images.reducer';

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    BrowserAnimationsModule,
    NgxFileDropModule,
    StoreModule.forRoot({
      images: ImagesReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
