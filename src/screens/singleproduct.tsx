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
import AnimatedLoader from 'react-native-animated-loader';
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

const images = [];
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
      check:false
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

    fetch(
      'https://jeebajijee.pk/api/v1/product-detail?client_key=iFXaRolCMQzEPV9PjWESluNEGzP9W9qX&product_id=' +
        this.props.route.params.productId,
    )
      .then(response => response.json())
      .then(json => {
        let ref = 'https://jeebajijee.pk/public/images/products/featured/';
        if(images.length !== 0){
          images.splice(0);
          images.push(json.data.product);
        }
        else{
          images.push(json.data.product);
        }
        this.setState({
            arrayvar: [...this.state.arrayvar, json.data.product]
          })
          this.setState({obj:json.data.product});
      });
  }
  componentWillUnmount(){
    images.push(images.splice(0));
    this.setState({
        arrayvar: [...this.state.arrayvar, this.state.arrayvar.splice(0)]
      })
  }
  addToCart = ()=>{
    this.props.dispatch(addToCart(this.state.obj));
    this.setState({check:true});
  }
  minusCart = ()=>{
    this.props.dispatch(minusFromCart(this.state.obj));
  }
   wishlist = (item) =>{
    if(this.props.user_Guest !== 'Guest'){
      let id =  this.props.user.id;
      let info = {
        prd_id:item.prd_id,
        id,
        item
      }
     this.props.dispatch(wishlistAdd(info,1));
    }else{
      this.props.navigation.navigate('Signin');
    }
  
  }
  deletewishlist = (item) =>{
    if(user_Guest !== 'Guest'){
      let id = user.id;
      let info = {
        prd_id:item.prd_id,
        id,item
      }
      this.props.dispatch(wishlistAdd(info,2));
    }else{
      this.props.navigation.navigate('Signin');
    }
  }

  removeFromCart = ()=>{
    this.props.cart.minusFromCart(this.state.obj);
  }
  checkOut = ()=>{
    this.props.navigation.navigate('Cart');
  }
  _renderItem({item, index}) {
    return (
        images && images.length > 0 ? images.map((item,index)=>{
            return(
<View key={index}
        style={{
          width: wp('50%'),
          height: hp('30%'),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{height: 150, width: 150}}
          source={{uri: 'https://jeebajijee.pk/public/images/products/featured/'+ item.featured_image}}
        />
      </View>
            )
        }) : null
      
    )
  }
  get pagination() {
    const {entries, activeSlide} = this.state;
    return (
      <Pagination
        dotsLength={images.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          width: wp('100%'),
        }}
        dotStyle={{
          width: 15,
          height: 15,
          borderRadius: 100,
          marginHorizontal: 1,
          borderColor: '#096d39',
          backgroundColor: '#096d39',
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
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#096d39" />

        <View style={styles.topbar}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{flex: 1, alignItems: 'flex-start'}}>
            <Icon1 name="chevron-left" size={20} color="#096d39" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Cart')}
            style={styles.headericon}>
            <IconBadge
              MainElement={
                <Image
                  resizeMode="contain"
                  style={{height: 20, width: 20}}
                  source={require('./../assets/Cart-green.png')}
                />
              }
              BadgeElement={
                <Text style={{color: '#fff', fontSize: 5}}>
                  {this.state.cartCount}
                </Text>
              }
              IconBadgeStyle={{
                position: 'absolute',
                top: 0.1,
                right: 0.1,
                minWidth: 10,
                height: 10,
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#97C53E',
              }}
              Hidden={this.state.cartCount == 1}
            />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.main}>
          <View style={styles.carousel}>
            <Carousel
              data={images}
              renderItem={this._renderItem}
              sliderWidth={wp('50%')}
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
                  {item.title}{'\t\t'}
                </Text>

                <View style={styles.cat}>
                  <Text
                    style={{
                      fontSize: 10,textTransform:'capitalize'
                    }}>
                    {item.cat_title}
                  </Text>
                </View>
              </View>
{
  item.d_percentage != 0 ? (
    <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}>
                <View
                  style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                  <View style={styles.discount}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: '#096d39',
                      }}>
                      00
                    </Text>
                  </View>

                  <Text
                    style={{
                      fontSize: 10,
                      color: '#096d39',
                    }}>
                    {'\t'} : {'\t'}
                  </Text>

                  <View style={styles.discount}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: '#096d39',
                      }}>
                      50
                    </Text>
                  </View>

                  <Text
                    style={{
                      fontSize: 10,
                      color: '#096d39',
                    }}>
                    {'\t'} : {'\t'}
                  </Text>

                  <View style={styles.discount}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: '#096d39',
                      }}>
                      15
                    </Text>
                  </View>
                </View>

                <Text
                  style={{
                    fontSize: 10,
                    color: '#b1b1b1',
                  }}>
                  Discount ends in
                </Text>
              </View>
  ):null
}
              
            </View>

          

            <View style={[styles.rows, {height: hp('8%')}]}>
            {
              item.d_percentage != 0 ? (
                <View style={{flex: 1}}>
                <View style={styles.rows}>
                  <Text
                    style={{
                      textDecorationLine: 'line-through',
                      color: '#b1b1b1',
                      fontSize: 10,
                    }}>
                    Rs. {item.price}/{item.unit_description} {'\t\t'}
                  </Text>

                  <Text
                    style={{
                      color: 'red',
                      fontSize: 10,
                    }}>
                    Save {item.d_percentage}%
                  </Text>
                </View>

                <Text
                  style={{
                    color: '#096d39',
                    fontSize: 24,
                    fontWeight: 'bold',
                  }}>
                  Save {item.d_percentage}%
                </Text>
              </View>
              ) : (
                <View style={{flex: 1}}>

                <Text
                  style={{
                    color: '#096d39',
                    fontSize: 24,
                    fontWeight: 'bold',
                  }}>
                  Rs.{item.price}
                </Text>
              </View>
              )
            }
              

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
            {item.long_desc.replace(regex, '')}
            </Text>

            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              Reviews
            </Text>

            <Text>
              {item.short_desc.replace(regex, '')}
            </Text>
          </View>
            )
        })
    ):( null)
}
         
        </ScrollView>

        <View style={[styles.rows, {backgroundColor: '#fff'}]}>
        {
          this.props.wishlist && this.props.wishlist.length > 0 && this.props.wishlist.find(el => el.id === this.state.obj.id) ? (
                        <TouchableOpacity onPress={() => this.deletewishlist(this.state.obj)} style={[styles.touch,
                            {
                              flex: 1,
                              backgroundColor: 'transparent',
                              borderWidth: 1,
                              borderColor: '#096d39',
                            },
                          ]}>
                          <Image
                            source={require('./../assets/wishlist-full.png')}
                          />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity  onPress={() => this.wishlist(this.state.obj)} style={[styles.touch,
                            {
                              flex: 1,
                              backgroundColor: 'transparent',
                              borderWidth: 1,
                              borderColor: '#096d39',
                            },
                          ]}>
                          <Image source={require('./../assets/wishlist-empty.png')} />
                      </TouchableOpacity>
                      )
        }
          {
            this.props.cart.find(el=> el.id === this.state.obj.id) ? (
              <TouchableOpacity
            onPress={() => this.checkOut()}
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
    backgroundColor: '#D7F1E4',
    height: hp('10%'),
    padding: 20,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  main: {
    backgroundColor: '#D7F1E4',
  },
  carousel: {
    height: hp('40%'),
    backgroundColor: '#D7F1E4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detail: {
    height: hp('100%'),
    backgroundColor: '#fff',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    padding: 20,
  },
  discount: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#096d39',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cat: {
    backgroundColor: '#C0F1DB',
    borderRadius: 30,
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
    user: state.auth.auth,
  user_Guest: state.auth.guest,
  wishlist: state.cart.wishlist} 
};
export default connect(mapStateToProps)(SingleProduct);