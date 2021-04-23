import React from "react";
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,Image } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const AppsScreen = () => {
  return (
    <View style={styles.container}>
     <View style={styles.topbar}>
        <TouchableOpacity
          style={styles.headericon}>
          <AntDesign name={'bars'} size={30} color={'#000'} />
        </TouchableOpacity>
      </View>
     <View style={styles.topbar}>
        <TouchableOpacity
          style={styles.headertext}>
          <Text style={styles.text_Style}>Categories</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headertext}>
          <AntDesign name={'search1'} size={28} color={'gray'} style={{textAlign:'center',fontWeight:'bold',marginTop:8}} />
        </TouchableOpacity>
      </View>
      <View style={styles.topbar}>
         <ScrollView s horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true} style={{paddingTop:5,paddingLeft:18,paddingRight:18}}>
          <View style={{flexDirection:'row'}}>
            <Text style={{marginRight:14,fontSize:15,fontWeight:'700',color:'orange'}}>Hello</Text>
            <Text style={{marginRight:14,fontSize:15,fontWeight:'700'}}>Hello</Text>
            <Text style={{marginRight:14,fontSize:15,fontWeight:'700'}}>Hello</Text>
            <Text style={{marginRight:14,fontSize:15,fontWeight:'700'}}>Hello</Text>
            <Text style={{marginRight:14,fontSize:15,fontWeight:'700'}}>Hello</Text>
          </View>
     </ScrollView>
     </View>
     <View style={{padding:20}}>
     <ScrollView showsVerticalScrollIndicator={false}>
     <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <TouchableOpacity
                    style={styles.cards}>
                    <View style={styles.carddir}>
                      <View style={styles.cat}>
                        <Text
                          style={{
                            fontSize: 13,
                          }}>
                          {' '}
                          Vegetables{' '}
                        </Text>
                      </View>

                    </View>

                    <View style={styles.center}>
                      <Image
                        resizeMode="contain"
                        style={{height: 100, width: 150}}
                        source={{
                          uri:
                            'https://jeebajijee.pk/public/images/products/featured/1608038095MuttonPayafresh.png'
                        }}
                      />

                      <Text style={{fontSize: 16, fontWeight: 'bold',textTransform:'capitalize'}}>
                        dgff
                      </Text>
                    </View>

                    <View style={styles.carddir}>
                      <Text
                        style={{
                          color: '#096d39',
                          fontSize: 16,
                          fontWeight: 'bold',
                        }}>
                        RS. 110
                      </Text>

                      <Text
                        style={{
                          color: 'red',
                          fontSize: 12,
                          textDecorationLine: 'line-through',
                        }}>
                        Rs. 20
                      </Text>
                    </View>

                  </TouchableOpacity>
            <TouchableOpacity
                    style={styles.cards}>
                    <View style={styles.carddir}>
                      <View>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight:'700'
                          }}>
                          {' '}
                          Vegetables{' '}
                        </Text>
                      </View>

                    </View>

                    <View style={styles.center}>
                      <Image
                        resizeMode="contain"
                        style={{height: 100, width: 150}}
                        source={{
                          uri:
                            'https://jeebajijee.pk/public/images/products/featured/1608038095MuttonPayafresh.png'
                        }}
                      />

                      <Text style={{fontSize: 16, fontWeight: 'bold',textTransform:'capitalize'}}>
                        dgff
                      </Text>
                    </View>

                    <View style={styles.carddir}>
                      <Text
                        style={{
                          color: '#096d39',
                          fontSize: 16,
                          fontWeight: 'bold',
                        }}>
                        RS. 110
                      </Text>

                      <Text
                        style={{
                          color: 'red',
                          fontSize: 12,
                          textDecorationLine: 'line-through',
                        }}>
                        Rs. 20
                      </Text>
                    </View>
                    <View style={{position:'absolute',bottom:0,right:0,backgroundColor:'orange',borderBottomRightRadius:10,padding:8,borderTopLeftRadius:10}}>
                      <AntDesign name={'plus'} size={20} color={'#fff'} />
                    </View>
                  </TouchableOpacity>
          </View>
     </ScrollView>
     </View>
      
     {/* <View style={{flex:20,backgroundColor:'red'}}>
     <ScrollView horizontal={true}>
       <View style={{backgroundColor:'red'}}>
         <Text>Hello</Text>
       </View>
     </ScrollView>
     </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center',
    backgroundColor: "#f9f9f9",
  },
  row_search:{
    flex: 1,
    flexDirection: 'row',
    padding:25,
    paddingBottom:5
  },
  row_search_second:{
    flex: 20,
    flexDirection: 'row',
    padding:25,
  },
  text_Style:{
    fontSize:34,
    fontWeight:'bold',
  },
  topbar: {
    backgroundColor: '#f9f9f9',
    height: hp('10%'),
    padding: 5,
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  headericon: {
    height: hp('6%'),
    width: wp('12%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headertext: {
    height: hp('6%'),
    width: wp('55%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSpecs:{
    marginRight:10,fontSize:15,fontWeight:'700'
  },
  cards: {
    margin: 5,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 25,
    width: wp('42%'),
    height:hp('32%'),
    position:'relative'
  },
  carddir: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cat: {
    backgroundColor: '#C0F1DB',
    borderRadius: 30,
  },
  center: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  touch: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 30,
    height: hp('5%'),
  },
});
