import React from 'react';
import {Logo} from '../../components'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  AsyncStorage,
  ImageBackground,
  Animated
} from 'react-native';



const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 125;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const window = Dimensions.get('window');

export default class HomeScreen extends React.Component {

  state = {
    scrollY: new Animated.Value(0),
    logoHeight: 80
  };

  handle_scroll = () => {
    var scrollTop = window.scrollY;
    var minHeight = 30;
    var logoHeight = Math.max(minHeight, 80 - scrollTop);
    this.setState({logoHeight: logoHeight})
  };

  _renderScrollViewContent = () => {
    return (
      <View style={styles.scrollViewContent}>
        <View style={{margin: 10}}>
        <Card>
          <CardItem cardBody>
            <ImageBackground
              source={require('../../assets/images/HomeScreen/calender.jpeg')}
              style={{height: 320, width: null, flex: 1}}
            >
              <Text style={{ fontSize:30, color: 'black', textAlign:'right', position: 'absolute', right: 10, bottom:45}}>
                CHECK YOUR
              </Text>
              <Text style={{ fontSize:30, color: 'black', textAlign:'right', position: 'absolute',right: 10, bottom:10}}>
                SCHEDULE
              </Text>
            </ImageBackground>
          </CardItem>
        </Card>
        </View>

        <View style={{height:100 , margin: 15, backgroundColor: "blue"}}>
          <Text style={{fontWeight: 'bold', fontSize: 25, color: "white"}}>TRACK YOUR</Text>
          <Text style={{fontWeight: 'bold', fontSize: 25, color: "white"}}>MEDICAL RECORD</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

          <View style={{height:100 , width: 165, margin: 15, backgroundColor: "green"}}>
            <Text style={{fontWeight: 'bold', fontSize: 25, color: 'white'}}>HEALTH TIPS</Text>
          </View>

          <View style={{height:100 , width: 165, margin: 15, backgroundColor: "green"}}>
            <Text style={{fontWeight: 'bold', fontSize: 25, color: 'white'}}>STARRED</Text>
          </View>

        </View>

        <View style={{height:100 , margin: 15, backgroundColor: "blue"}}>
          <Text style={{fontWeight: 'bold', fontSize: 25, color: "white"}}>TRACK YOUR MEDICAL RECORD</Text>
        </View>

        <View style={{height:100 , margin: 15, backgroundColor: "red"}}>
          <Text style={{fontWeight: 'bold', fontSize: 25, color: "white"}}>TRACK YOUR MEDICAL RECORD</Text>
        </View>

      </View>


    );
  };

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    return (

      <View style={styles.container}>


        <ScrollView style={{flex: 1}} scrollEventThrottle={16} onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.state.scrollY}}}])}>
          {this._renderScrollViewContent()}

        </ScrollView>

        <Animated.View style={[styles.header, {height: headerHeight}]}>
          <View style={styles.bar}>
            <View style={{paddingVertical: 30, justifyContent: 'center', flexDirection: 'row'}}>
              <Image style={{width: 310, height: 70}} source={require('../../assets/images/logoTeal2.png')} />
            </View>
            <View style={{justifyContent: 'center', flexDirection: 'row', paddingBottom: 30}}>
              <Text style={{fontWeight: 'bold', fontSize: 25, color: '#4b8477' }}>WELCOME TO MEDI-FILES</Text>
            </View>
          </View>
        </Animated.View>

      </View>
    );
  }


  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

}

const styles = StyleSheet.create({
  bar: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  },
});
