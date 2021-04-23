import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SafeAreaView,
  Image,
  StatusBar,
} from 'react-native';
import {
  Modal,
  Portal,
  Provider,
  TouchableRipple,
  Text,
} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import IconBadge from 'react-native-icon-badge';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import { connect } from 'react-redux';
import {addToCart, minusFromCart,wishlistAdd} from '../../Store/actions/cart';
import Firestore from '@react-native-firebase/firestore';

const images = [];
let getImage=[
  {
    Image: 'https://smallimg.pngkey.com/png/small/78-789008_nike-shoes-png-nike-rubber-shoes-2017.png',
  },
  {
    Image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWv4qe3TWMBUWuDc5iLN-QdiLGf23XzQrvVg&usqp=CAU'
  },
  {
    Image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC7EXpN__IJaeKEagNnNJn6J_pRmVicI9BAw&usqp=CAU'
  }
];
const regex = /(<([^>]+)>)/ig;
class SingleProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wish: 1,
      cartCount: 0,
      activeSlide: 0,
      value: 0,
      arrayvar:[],
      isDataHasArrived:true,
      obj:{},
      check:false,
      getImage:[]
    };
  }

  _increment = (recieveItem) => {

    this.props.cart.addToCart(recieveItem);
    this.setState({check:true});
  };
 
  _decrement = (recieveItem) => {

    this.props.cart.minusFromCart(recieveItem);
 
  };

 
  componentDidMount() {
    Firestore().collection('data').where("id", "==", this.props.route.params.id)
    .onSnapshot((snapshot) => {
     snapshot.docChanges().forEach((change) => {
         if (change.type === "added") {
          this.setState({
                    arrayvar: [...this.state.arrayvar, change.doc.data()]
                  });

            this.setState({obj:change.doc.data()});
            getImage.push(change.doc.data());
         }
     });
    }
    )}
  componentWillUnmount(){
    this.setState({
        arrayvar: [...this.state.arrayvar, this.state.arrayvar.splice(0)]
      });
      getImage.splice(0);
  }
  addToCart = ()=>{
    this.props.dispatch(addToCart(this.state.obj));
    this.setState({check:true});
  }
  minusCart = ()=>{
    this.props.dispatch(minusFromCart(this.state.obj));
  }
   wishlist = (item) =>{
      let info = {
        prd_id:item.id,
        item
      }
     this.props.dispatch(wishlistAdd(info,1));
  
  }
  deletewishlist = (item) =>{
      let info = {
        prd_id:item.id,
        id:item
      }
      this.props.dispatch(wishlistAdd(info,2));
  }

  removeFromCart = ()=>{
    this.props.cart.minusFromCart(this.state.obj);
  }
  checkOut = ()=>{
    this.props.navigation.navigate('Cart');
  }
  _renderItem({item, index}) {
    return (
      getImage.length > 0 ? (

<View key={index}
        style={{
          width: wp('100%'),
          height: hp('30%'),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{height: 150, width: 300}}
          source={{uri:item.Image}}
        />
      </View>
      ) : null
           
      
    )
  }
  get pagination() {
    const {entries, activeSlide} = this.state;
    return (
      <Pagination
        dotsLength={getImage.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          width: wp('100%'),
        }}
        dotStyle={{
          width: 15,
          height: 15,
          borderRadius: 100,
          marginHorizontal: 1,
          borderColor: 'orange',
          backgroundColor: 'orange',
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }

  wishlist(wish) {
    if (wish == 1) {
      this.setState({
        wish: 0,
      });
    } else {
      this.setState({
        wish: 1,
      });
    }
  }

  render() {
    console.log('cjsdcjvsdch',getImage);
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="orange" />

        <View style={styles.topbar}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{flex: 1, alignItems: 'flex-start'}}>
            <Icon1 name="chevron-left" size={20} color="orange" />
          </TouchableOpacity>
          <TouchableOpacity style={{flex:6}}>
          <Text style={{fontSize:18,fontWeight:'bold'}}>Categories</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.main}>
          <View style={styles.carousel}>
            <Carousel
              data={getImage}
              renderItem={this._renderItem}
              sliderWidth={wp('100%')}
              itemWidth={wp('100%')}
              onSnapToItem={index => this.setState({activeSlide: index})}
            />
            {this.pagination}
          </View>
{
    this.state.arrayvar && this.state.arrayvar.length > 0 ? (
        this.state.arrayvar.map((item,index)=>{
            return(
                <View style={styles.detail} key={index}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: hp('7%'),
              }}>
              <View
                style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                <Text style={{fontSize: 20, fontWeight: 'bold',textTransform:'capitalize'}}>
                  {item.Name}{'\t\t'}
                </Text>

                <View style={styles.cat}>
                  <Text
                    style={{
                      fontSize: 10,textTransform:'capitalize',
                      color:'white'
                    }}>
                    {item.Category}
                  </Text>
                </View>
              </View>
              
            </View>

          

            <View style={[styles.rows, {height: hp('8%')}]}>
          
                <View style={{flex: 1}}>

                <Text
                  style={{
                    color: 'orange',
                    fontSize: 24,
                    fontWeight: 'bold',
                  }}>
                  Rs.{item.Price}
                </Text>
              </View>
              

              <View
                style={[
                  styles.rows,
                  {flex: 1, justifyContent: 'center', alignItems: 'center'},
                ]}>
        {
          this.props.cart.find(el=> el.id === item.id) ? (
            <>
            <Icon
                  name="md-remove-circle-outline"
                  size={30}
                  color="rgb(245,155,36)"
                  onPress={() => this.minusCart(item)}
                />

                <Text>
                  {'\t'}
                  {'\t'}
                </Text>

                <Text style={{color: '#000', fontWeight: 'bold', fontSize: 30}}>
                  {
                                   
                                    this.props.cart.find(el => el.id === item.id)
                                      ?.quantity
                                  }
                </Text>

                <Text>
                  {'\t'}
                  {'\t'}
                </Text>

                <Icon
                  name="md-add-circle-outline"
                  size={30}
                  color="rgb(245,155,36)"
                  onPress={() => this.addToCart(item)}
                />
                </>
          ) : null
        }
                
              </View>
            </View>

            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Description
            </Text>

            <Text>
            {item.Description.replace(regex, '')}
            </Text>

            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Reviews
            </Text>

            <Text>
              {item.ShortDescription.replace(regex, '')}
            </Text>
          </View>
            )
        })
    ):( null)
}
         
        </ScrollView>

        <View style={[styles.rows, {backgroundColor: '#fff',marginBottom:60}]}>
        {
          this.props.wishlist && this.props.wishlist.length > 0 && this.props.wishlist.find(el => el.id === this.state.obj.id) ? (
                        <TouchableOpacity style={[styles.touch,
                            {
                              flex: 1,
                              backgroundColor: 'transparent',
                              borderWidth: 1,
                              borderColor: 'orange',
                            },
                          ]}>
                          <Image
                            source={require('./../assets/wishlist-full.png')}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity style={[styles.touch,
                            {
                              flex: 1,
                              backgroundColor: 'transparent',
                              borderWidth: 1,
                              borderColor: 'orange',
                            },
                          ]}>
                          <Image source={require('./../assets/wishlist-empty.png')} />
                      </TouchableOpacity>
                      )
        }
          {
            this.props.cart.find(el=> el.id === this.state.obj.id) ? (
              <TouchableOpacity
            style={[styles.touch, {flex: 3, backgroundColor: 'rgb(245,155,36)'}]}>
            <Text style={styles.txtbtn}>CheckOut</Text>
          </TouchableOpacity>
            ) : (
              <TouchableOpacity
            onPress={() => this.addToCart()}
            style={[styles.touch, {flex: 3, backgroundColor: 'rgb(245,155,36)'}]}>
            <Text style={styles.txtbtn}>Add to Cart</Text>
          </TouchableOpacity>
            )
          }
        
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  topbar: {
    backgroundColor: 'lightgray',
    height: hp('10%'),
    padding: 20,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  main: {
    backgroundColor: 'lightgray',
  },
  carousel: {
    height: hp('40%'),
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detail: {
    height: hp('100%'),
    backgroundColor: '#fff',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    padding: 20,
    elevation:5
  },
  discount: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cat: {
    backgroundColor: 'orange',
    paddingTop:5,
    paddingLeft:12,
    paddingRight:12,
    paddingBottom:5,
    borderRadius: 30,
    elevation:5
  },

  rows: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  touch: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 30,
    height: hp('7%'),
    width: wp('90%'),
  },
  txtbtn: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  lottie: {
    width: 200,
    height: 200,
    // width: wp('50%'),
    // height: '100%',
  },
});

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  wishlist: state.cart.wishlist} 
};
export default connect(mapStateToProps)(SingleProduct);