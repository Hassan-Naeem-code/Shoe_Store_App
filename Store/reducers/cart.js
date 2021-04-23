import {ADD_TO_CART,MINUS_FROM_CART,DELETE_FROM_CART,DELETE_THE_CART,ADD_SHIPMENT_CHARGES,WIHSLIST_ADDITION,WISHLISHT_DELETION,WISHLISHT_GET_ALL} from '../constants/actionTypes';
// import PushNotification from 'react-native-push-notification';

const INIT_STATE = {
    cart: [],
    orderId:0,
    shipment: 0,
    wishlist:[],
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
      case WIHSLIST_ADDITION: {
        let wishlistProduct = state.wishlist.slice(0);
        let newWishlist = true;
        wishlistProduct.map((recipient) => {
          if (recipient.Name === action.payload.Name) {
            newWishlist = false;
          }
        });
  
        if (wishlistProduct.length === 0 || newWishlist) {
          wishlistProduct.push(action.payload);
        }
        return {
          ...state,
          wishlist: wishlistProduct,
        };
      }
      case WISHLISHT_DELETION: {
        // console.log(action.payload,'jfdbksdbjfsvdbjjfh sd');
    //     PushNotification.localNotification({
    //       title:"JeeBajiJee",
    //       message:"Item Removed From Wishlist",
    //       largeIcon: "ic_launcher", // (optional) default: "ic_launcher". Use "" for no large icon.
    //       largeIconUrl: "https://jeebajijee.pk/public/images/web-settings/1606916402abc.png", // (optional) default: undefined
    //       vibrate: true, // (optional) default: true
    //       vibration: 300,
    //       channelId: "channel-id"
    //   });
        return {
          ...state,
          wishlist: state.wishlist.filter((el)=>{el.id !== action.payload.id}),
        };
      }
      case ADD_TO_CART: {
        let cartClone = state.cart.slice(0);
        let dishItem = action.payload;
  
        let isAlreadyInCart = false;
        let cartIndex;
        for (let i = 0; i < cartClone.length; i++) {
          if (cartClone[i].Name == dishItem.Name) {
            isAlreadyInCart = true;
            cartIndex = i;
            break;
          }
        }
        if (isAlreadyInCart) {
          dishItem = cartClone[cartIndex];
          dishItem.quantity++;
          dishItem.qty++;
         
        } else {
            let price = Number(dishItem.Price);
                dishItem.quantity = 1;
                dishItem.qty = 1;
                dishItem.totalPrice = dishItem.quantity * (price);
                cartClone.push(dishItem);
            }
        return {
          ...state,
          cart: cartClone,
        };
      }
  
      case MINUS_FROM_CART: {
        let cartCloneSecond = state.cart.slice(0);
        let dishItemSecond = action.payload;
  
        let isAlreadyInCartSecond = false;
        let cartIndexSecond;
        for (let i = 0; i < cartCloneSecond.length; i++) {
          if (cartCloneSecond[i].Name == dishItemSecond.Name) {
            isAlreadyInCartSecond = true;
            cartIndexSecond = i;
            break;
          }
        }
        if (isAlreadyInCartSecond) {
          dishItemSecond = cartCloneSecond[cartIndexSecond];
          if (dishItemSecond.quantity > 0) {
            dishItemSecond.quantity--;
                dishItemSecond.totalPrice =
                dishItemSecond.quantity * Number(dishItemSecond.price);
              cartCloneSecond.splice(cartIndexSecond, 1, dishItemSecond);
          
          } else {
            dishItemSecond.quantity = 0;
            dishItemSecond.totalPrice = 0;
            cartCloneSecond.splice(cartIndexSecond, 1, dishItemSecond);
          }
        }
        return {
          ...state,
          cart: cartCloneSecond,
        };
      }
  
      case DELETE_FROM_CART: {
        let cartCloneThird = state.cart.slice(0);
        let dishItemThird = action.payload;
  
        let isAlreadyInCartSecond = false;
        let cartIndexThird;
        for (let i = 0; i < cartCloneThird.length; i++) {
          if (cartCloneThird[i].dishName == dishItemThird.dishName) {
            isAlreadyInCartSecond = true;
            cartIndexThird = i;
            break;
          }
        }
        if (isAlreadyInCartSecond) {
          dishItemThird = cartCloneThird[cartIndexThird];
          cartCloneThird.splice(cartIndexThird, 1);
        }
        return {
          ...state,
          cart: cartCloneThird,
        };
      }
  
      case DELETE_THE_CART: {
        let cloneTheCart = state.cart.slice(0);
        cloneTheCart.splice(0);
        let orderId = state.orderId;
        return {
          ...state,
          cart: cloneTheCart,
          orderId: orderId,
        };
      }

      default:
        return state;
    }
  };



