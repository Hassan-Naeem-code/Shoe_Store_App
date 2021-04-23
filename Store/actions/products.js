import {GET_ALL_DATA} from '../constants/actionTypes';
import Firestore from '@react-native-firebase/firestore';

export function getAllData() {
    return async (dispatch) => {
        await Firestore().collection('data')
        .onSnapshot((snapshot) => {
         snapshot.docChanges().forEach((change) => {
             if (change.type === "added") {
                 dispatch({
                     type:GET_ALL_DATA,
                     payload: change.doc.data()
                 });
             }
         });

     }
        )}}
