import {GET_ALL_DATA} from '../constants/actionTypes';

  const INIT_STATE = {
    data: [],
  };
  
  export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case GET_ALL_DATA: {
        let allRecepients = state.data.slice(0);
      let newUser = true;
      allRecepients.map((recipient) => {
        if (recipient.Name === action.payload.Name) {
          newUser = false;
        }
      });

      if (allRecepients.length === 0 || newUser) {
        allRecepients.push(action.payload);
      }
      return {
        ...state,
        data: allRecepients,
      };
      }
  
      default:
        return state;
    }
  };
  