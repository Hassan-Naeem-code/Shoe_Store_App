import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {

  Image,
  View

} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './screens/tabs/home';
import Profile from './screens/tabs/profile';
import EditProfile from './screens/tabs/editprofile';
import WishList from './screens/tabs/wishlist';
import Exchange from './screens/tabs/exchange';
import Cancelled from './screens/tabs/cancelled';
import Return from './screens/tabs/return';
import Pending from './screens/tabs/pending';
import ChangePassword from './screens/tabs/changepassword';
import EditLocation from './screens/tabs/editlocation';
import Settings from './screens/tabs/settings';
import Categories from './screens/tabs/categories';
import Products from './screens/tabs/products';
import SingleProduct from './screens/tabs/singleproduct';
import Cart from './screens/tabs/cart';
import OrderDetailNew from './screens/tabs/orderdatauser';
import TransactionError from './screens/tabs/transactionerror';
import PaymentMethod from './screens/tabs/paymentmethod';
import OrderPlaced from './screens/tabs/orderplaced';
import TrackOrder from './screens/tabs/trackorder';
import NoLocation from './screens/tabs/nolocation';
import UserLocation from './screens/tabs/userlocation';
import Coupons from './screens/tabs/coupons';
import Search from './screens/tabs/search';
import Trends from './screens/tabs/trends';
// import Signin from './screens/signin';
// import Signup from './screens/signup';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

function HomeStacks() {
  return (
    <Stack.Navigator headerMode='none'>

      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="SingleProduct" component={SingleProduct} />
      <Stack.Screen name="NoLocation" component={NoLocation} />
      <Stack.Screen name="UserLocation" component={UserLocation} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Coupons" component={Coupons} />      
      <Stack.Screen name="PaymentMethod" component={PaymentMethod} /> 
      <Stack.Screen name="OrderDetailNew" component={OrderDetailNew} /> 
      <Stack.Screen name="OrderPlaced" component={OrderPlaced} />     
      <Stack.Screen name="TransactionError" component={TransactionError} />
      <Stack.Screen name="TrackOrder" component={TrackOrder} />
      <Stack.Screen name="Trends" component={Trends} />

    </Stack.Navigator>
  )
}

function CategoriesStacks() {
  return (
    <Stack.Navigator headerMode='none'>

      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Products" component={Products} />
      <Stack.Screen name="SingleProduct" component={SingleProduct} />

    </Stack.Navigator>
  )
}

function SignUpUser(){
  return(
    <Stack.Navigator headerMode='none'>
      {/* <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} /> */}
    </Stack.Navigator>
  )
}

function ProfileStacks() {
  return (
    <Stack.Navigator headerMode='none'>

      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="WishList" component={WishList} />
      <Stack.Screen name="Exchange" component={Exchange} />
      <Stack.Screen name="Cancelled" component={Cancelled} />
      <Stack.Screen name="Return" component={Return} />
      <Stack.Screen name="Pending" component={Pending} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="EditLocation" component={EditLocation} />

    </Stack.Navigator>
  )
}

function Tabs() {
  const user = useSelector(({auth})=>{return auth.user});

  return (
    <Tab.Navigator initialRouteName='Home'
      backBehavior='initialRoute'
      labeled={false}
      activeColor='#096d39'
      inactiveColor="#d1d1d1"
      barStyle={{
        backgroundColor: '#fff'
      }}
    >
      <Tab.Screen options={{
        tabBarIcon: ({ color }) => (
          color == "#d1d1d1"
            ?
            <View style={
              {
                height: 35,
                width: 60,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent'
              }
            }>
              <Image resizeMode='stretch' source={require('./screens/assets/Home.png')} style={{
                height: 25,
                width: 25,
              }} />
            </View>
            :
            <View style={
                {
                  height: 35,
                  width: 60,
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: color
                }
            }>
              <Image resizeMode='stretch' source={require('./screens/assets/Home-white.png')} style={{
                height: 25,
                width: 25,
              }} />
            </View>
        ),
      }} name="Stacks" component={HomeStacks} />


      <Tab.Screen options={{
        tabBarIcon: ({ color }) => (
          
          color == "#d1d1d1"
            ?
            <View style={
              {
                height: 35,
                width: 60,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent'
              }
            }>
              <Image resizeMode='stretch' source={require('./screens/assets/all-order.png')} style={{
              height: 25,
              width: 25
            }} />
            </View>
            :
            <View style={
                {
                  height: 35,
                  width: 60,
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: color
                }
            }>
              <Image resizeMode='stretch' source={require('./screens/assets/all-order-white.png')} style={{
              height: 25,
              width: 25
            }} />
            </View>
        ),
      }} name="Categories" component={CategoriesStacks} />


      <Tab.Screen options={{
        tabBarIcon: ({ color }) => (
          
          
          color == "#d1d1d1"
            ?
            <View style={
              {
                height: 35,
                width: 60,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent'
              }
            }>
              <Image resizeMode='stretch' source={require('./screens/assets/Profile.png')} style={{
              height: 25,
              width: 25
            }} />
            </View>
            :
            <View style={
                {
                  height: 35,
                  width: 60,
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: color
                }
            }>
              <Image resizeMode='stretch' source={require('./screens/assets/Profile-white.png')} style={{
              height: 25,
              width: 25
            }} />
            </View>
        ),
      }} name="Profile" component={user && user !== null ? (ProfileStacks) : (SignUpUser)} />


      <Tab.Screen options={{
        tabBarIcon: ({ color }) => (
          
          color == "#d1d1d1"
            ?
            <View style={
              {
                height: 35,
                width: 60,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent'
              }
            }>
              <Image resizeMode='stretch' source={require('./screens/assets/setting.png')} style={{
              height: 25,
              width: 25
            }} />
            </View>
            :
            <View style={
                {
                  height: 35,
                  width: 60,
                  borderRadius: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: color
                }
            }>
              <Image resizeMode='stretch' source={require('./screens/assets/setting-white.png')} style={{
              height: 25,
              width: 25
            }} />
            </View>
        ),
            
      }} name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default Tabs;