import { Images } from '../models/images.model';
import * as ImagesActions from '../actions/images.actions';

const initialState: Images = {
  counter: 0,
  info: []
};

const newState = (state: Images, newData: any) => {
  return Object.assign({}, state, newData);
};

export function ImagesReducer(state: Images = initialState, action: ImagesActions.Actions) {
  const modifiedInfo = [...state.info];
  switch (action.type) {
    case ImagesActions.ADD_IMAGE:
      modifiedInfo.push(action.payload);
      return newState(state, {
        counter: state.counter + 1,
        info: modifiedInfo
      });
    case ImagesActions.REMOVE_IMAGE:
      modifiedInfo.splice(action.payload, 1);
      return newState(state, {
        counter: state.counter - 1,
        info: modifiedInfo
      });
    default:
      return state;
  }
}
