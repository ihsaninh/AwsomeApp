import { actionType } from '../constants/ActionType';

const initialState = {
  name: '',
};

const userReducer = (state, action) => {
  switch (action.type) {
    case actionType.ADD_USER_NAME:
      return {
        name: action.name,
      };
    default:
      return state;
  }
};

export { userReducer, initialState };
