import { Action } from '@ngrx/store';
import { Image } from '../models/image.model';

export const ADD_IMAGE = '[Image] Add';
export const REMOVE_IMAGE = '[Image] Remove';

export class AddImage implements Action {
  readonly type = ADD_IMAGE;
  constructor(public payload: Image) { }
}

export class RemoveImage implements Action {
  readonly type = REMOVE_IMAGE;
  constructor(public payload: number) { }
}

export type Actions = AddImage | RemoveImage;
