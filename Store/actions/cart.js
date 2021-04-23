import {ADD_TO_CART,MINUS_FROM_CART,DELETE_FROM_CART,WIHSLIST_ADDITION,WISHLISHT_DELETION,WISHLISHT_GET_ALL} from '../constants/actionTypes'; 
import {ToastAndroid} from 'react-native';

export function addToCart(product) {
    return async (dispatch) => {
      dispatch({
        type: ADD_TO_CART,
        payload: product,
      });
    };
  }
  
  export function minusFromCart(product) {
    return async (dispatch) => {
      dispatch({
        type: MINUS_FROM_CART,
        payload: product,
      });
    };
  }
  
  export function deleteFromCart(product) {
    return async (dispatch) => {
      dispatch({
        type: DELETE_FROM_CART,
        payload: product,
      });
    };
  }

  export function wishlistAdd(user,type){
    return async dispatch=>{
      if(type == 1){
        dispatch({
          type: WIHSLIST_ADDITION,
          payload: user.item,
        });
        ToastAndroid.show('Wishlist Added Successfully',2000);
        await fetch(
          'https://jeebajijee.pk/api/v1/wishlist?client_key=iFXaRolCMQzEPV9PjWESluNEGzP9W9qX&user_id='+user.id+'&product_id='+user.prd_id
        )
          .then(response => response.json())
          .then(json => {
            console.log(json,'wishlist................');
          })
          .catch(error => {
            console.error(error);
            ToastAndroid.show(error,2000);
          });
      } else if(type == 2){
        dispatch({
          type: WISHLISHT_DELETION,
          payload: user.item,
        });
        ToastAndroid.show('Wishlist Removed Successfully',2000);
        await fetch(
          'https://jeebajijee.pk/api/v1/wishlist?client_key=iFXaRolCMQzEPV9PjWESluNEGzP9W9qX&user_id='+user.id+'&product_id='+user.prd_id
        )
          .then(response => response.json())
          .then(json => {
            console.log(json,'wishlist................');
          })
          .catch(error => {
            console.error(error);
            ToastAndroid.show(error,2000);
          });
      }
    }
  }
  
  export function getAllWishlist(id,setIsDataHasArrived,setisDataHasNotArrived){
    return async dispatch=>{
        await fetch(
          'https://jeebajijee.pk/api/v1/get_all_wishlist?client_key=iFXaRolCMQzEPV9PjWESluNEGzP9W9qX&user_id='+id
        )
          .then(response => response.json())
          .then(json => {
            console.log(json,'wishlist................');
            if(json.status == 'success'){
              dispatch({
                type: WISHLISHT_GET_ALL,
                payload: json.data,
              });
              setIsDataHasArrived(false);
            }
            if(json.data && json?.data.length == 0){
              setisDataHasNotArrived(false);
            }
           
          })
          .catch(error => {
            console.error(error);
            ToastAndroid.show(error,2000);
          });
    }
  }