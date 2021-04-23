import React,{useState,useRef,useEffect} from "react";
import { StyleSheet, Text, View,ScrollView,TouchableOpacity,Image,Animated } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Firestore from '@react-native-firebase/firestore';
import {getAllData} from '../../Store/actions/products';
import {useDispatch,useSelector} from 'react-redux';
let category = [
  {
    name:'All'
  },
  {
    name:'Shoes'
  },
  {
    name:'T-Shirt'
  },
  {
    name:'Hoddie'
  },
  {
    name:'Accessories'
  },
  {
    name:'Watch'
  },
  {
    name:'Perfumes'
  }
]
export const AppsScreen = () => {
  const dispatch = useDispatch();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeAnimation = useRef(new Animated.Value(1)).current;
  const [check,setCheck] = useState(false);
  const [enable,setEnable] = useState(true);
  const [value,setValue] = useState('All');
  const [getVal,setGetVal] = useState('');
  const fadeIn = (value) => {
    // Will change fadeAnim value to 1 in 5 seconds
    if(getVal == ''){
      setGetVal(value);
    }
    else{
      setGetVal('');
      setGetVal(value);
    }
    setCheck(!check);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000
    }).start();
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: 2000
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    setGetVal('');
    setCheck(!check);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 2000
    }).start();
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 2000
    }).start();
  };
  const checkCondition = (getVar) =>{
    setValue(getVar);
  }
  useEffect(()=>{
   dispatch(getAllData());

},[])
const data = useSelector(({products})=>{return products.data});
console.log('uvisduivsdiuv',data);
return (
    <View style={styles.container}>
      <ScrollView style={{marginBottom:45}}>
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
            {
              category && category.length > 0 ? (
                category.map((item,index)=>{
                  return(
                    <TouchableOpacity onPress={()=>{checkCondition(item.name)}}>
                      <Text key={index} style={{marginRight:14,fontSize:15,fontWeight:'700',color:value == item.name ? 'orange' :'black',textTransform:'uppercase'}}>{item.name}</Text>
                    </TouchableOpacity>
                  )
                })
              ) : null
            }
          </View>
     </ScrollView>
     </View>
     <View style={{padding:20}}>
     <ScrollView showsVerticalScrollIndicator={false}>
     <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
       {
         data && data.length > 0 ? (
           data.map((item,index)=>{
             return(
              <TouchableOpacity style={styles.cards} key={index}>
                {
                  getVal == item.Name ? (
                    <Animated.View
                    style={
                      {
                        // Bind opacity to animated value
                        opacity: fadeAnim,
                        position:'absolute'
                      }
                    }
                  >
                    <View style={styles.carddir}>
                                  <View style={{width:wp('42%'),padding:10}}>
                                    <Text
                                      style={{
                                        fontSize: 14,
                                        fontWeight:'bold',textAlign:'center',color:'orange',textTransform:'uppercase'
                                      }}>
                                      {' '}
                                      Find Similar{' '}
                                    </Text>
                                  </View>
            
                                </View>
                                <View style={[styles.carddir,{  borderTopColor: 'lightgray',
                borderTopWidth: 1,}]}>
                                  <View style={{width:wp('42%'),padding:10}}>
                                    <Text
                                      style={{
                                        fontSize: 14,
                                        fontWeight:'bold',textAlign:'center',color:'orange',textTransform:'uppercase'
                                      }}>
                                      {' '}
                                      Add To Favourites{' '}
                                    </Text>
                                  </View>
            
                                </View>
                                <View style={styles.carddir}>
                                  <View style={{width:wp('42%'),padding:10,backgroundColor:'orange',height:hp('21.5%'),borderRadius:20,alignItem:'center',justifyContent:'center',borderTopRightRadius:35,borderTopLeftRadius:35}}>
                                    <TouchableOpacity onPress={()=>{fadeOut()}}>
                                      <Text
                                        style={{
                                          fontSize: 14,
                                          fontWeight:'bold',textAlign:'center',color:'#fff',textTransform:'uppercase'
                                        }}>
                                        {' '}
                                        <AntDesign name={'shoppingcart'} size={20} color={'#fff'} />{'  '}Add To Cart
                                      </Text>
                                    </TouchableOpacity>
                                  </View>
            
                                </View>
                                 
                            
                  </Animated.View>
                  ) : (
                    <Animated.View style={{opacity:getVal == item.Name ? fadeAnimation : 1}}>
                    <View style={styles.carddir}>
                      <View>
                        <Text
                          style={{
                            fontSize: 14,
                            fontWeight:'bold'
                          }}>
                          {' '}
                          {item.Category}{' '}
                        </Text>
                      </View>

                    </View>
                    <View style={styles.carddir}>
                      <View style={{width:wp('28%'),marginTop:5}}>
                        <Text numberOfLines={2}
                          style={{
                            fontSize: 18,
                            fontWeight:'900'
                          }}>
                          {' '}
                          {item.Name}
                        </Text>
                      </View>

                    </View>

                    <View style={styles.center}>
                      <Image
                        resizeMode="contain"
                        style={{height: 100, width: 150}}
                        source={{uri:item.Image}}
                      />
                    </View>

                    <View style={styles.carddir}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 16,
                          fontWeight: 'bold',
                        }}>
                        $. {item.Price}
                      </Text>

                    </View>
        </Animated.View>
                  )
                }


                     {
                       getVal !== item.Name ? 
                     
                                 <TouchableOpacity onPress={()=>{fadeIn(item.Name)}} style={{position:'absolute',bottom:0,right:0,backgroundColor:'orange',borderBottomRightRadius:10,padding:10,borderTopLeftRadius:10}}>
                                     <AntDesign name={'plus'} size={20} color={'#fff'} />
                                 </TouchableOpacity>
                   :null  
                   }
             </TouchableOpacity>
             )
           })
         ) : null
       }
    
    
          </View>
     </ScrollView>
     </View>
     </ScrollView>
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
    position:'relative',
    elevation:5
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
  fadingContainer: {
    padding: 20,
    backgroundColor: "orange"
  },
  fadingText: {
    fontSize: 28
  },
});
