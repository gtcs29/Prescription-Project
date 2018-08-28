import React from 'react';
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
import { WebBrowser } from 'expo';
import { ListView } from '@shoutem/ui';

import { MonoText } from '../components/StyledText';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { ListItem, Icon, Container, Button, Text, Content, Form, Item, Label, Input, Header, Body, Title, Card, CardItem, List, Left, Right, Thumbnail} from 'native-base';
import Accordion from 'react-native-collapsible/Accordion';
// import PropTypes from 'prop-types';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 125;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const window = Dimensions.get('window');

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome to the app!',
  };
  state = {
    scrollY: new Animated.Value(0),
  };

  _renderScrollViewContent = () => {
    return (
      <View style={styles.scrollViewContent}>
          <View style={{marginHorizontal: 15}}>
            <Image source={require('../assets/images/goldBackground.png')} style={{height: 10, width: null, flex: 1}}/>
            <ImageBackground source={require('../assets/images/backgroundScheduleLow.png')} style={{height: 100, width: null, flex: 1, alignItems: 'flex-end', justifyContent: 'center'}} >
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 25, color: '#DFBF86', opacity: 1}}> CREATE A SCHEDULE</Text>
              </View>
            </ImageBackground>
          </View>

          <View style={{paddingVertical: 10, marginHorizontal: 15}}>
            <Image source={require('../assets/images/purpleBackground.png')} style={{height: 10, width: null, flex: 1}}/>
            <ImageBackground source={require('../assets/images/backgroundPrescriptionsLow.png')} style={{height: 100, width: null, flex: 1, alignItems: 'flex-end', justifyContent: 'center'}} >
              <View style={{alignItems: 'flex-end'}}>
                <Text style={{fontWeight: 'bold', fontSize: 25, color: "#c1514d"}}> TRACK YOUR</Text>
                <Text style={{fontWeight: 'bold', fontSize: 25, color: "#c1514d"}}> MEDICAL RECORD</Text>
              </View>
            </ImageBackground>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 15}}>

            <View>
              <Image source={require('../assets/images/tealBackground.png')} style={{height: 10, width: 165, flex: 1}}/>
              <ImageBackground source={require('../assets/images/blueberriesLow.png')} style={{height: 150, width: 165, flex: 1, alignItems: 'center', justifyContent: 'center'}} >
                <View>
                  <Text style={{fontWeight: 'bold', fontSize: 25, color: '#4b8477'}}> HEALTH TIPS</Text>
                </View>
              </ImageBackground>
            </View>

            <View>
              <Image source={require('../assets/images/tealBackground.png')} style={{height: 10, width: 165, flex: 1}}/>
              <ImageBackground source={require('../assets/images/starLow.png')} style={{height: 150, width: 165, flex: 1, alignItems: 'center', justifyContent: 'center'}} >
                <View>
                  <Text style={{fontWeight: 'bold', fontSize: 25, color: '#4b8477'}}> STARRED</Text>
                </View>
              </ImageBackground>
            </View>

          </View>

          <View style={{paddingVertical: 10, marginHorizontal: 15}}>
            <Image source={require('../assets/images/purpleBackground.png')} style={{height: 10, width: null, flex: 1}}/>
            <ImageBackground source={require('../assets/images/backgroundPrescriptionsLow.png')} style={{height: 100, width: null, flex: 1, alignItems: 'flex-end', justifyContent: 'center'}} >
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 25, color: "#c1514d"}}> TRACK YOUR MEDICAL RECORD</Text>
              </View>
            </ImageBackground>
          </View>

          <View style={{paddingVertical: 10, marginHorizontal: 15}}>
            <Image source={require('../assets/images/purpleBackground.png')} style={{height: 10, width: null, flex: 1}}/>
            <ImageBackground source={require('../assets/images/backgroundPrescriptionsLow.png')} style={{height: 100, width: null, flex: 1, alignItems: 'flex-end', justifyContent: 'center'}} >
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 25, color: "#c1514d"}}> TRACK YOUR MEDICAL RECORD</Text>
              </View>
            </ImageBackground>
          </View>

          <View style={{paddingVertical: 10, marginHorizontal: 15}}>
            <Image source={require('../assets/images/purpleBackground.png')} style={{height: 10, width: null, flex: 1}}/>
            <ImageBackground source={require('../assets/images/backgroundPrescriptionsLow.png')} style={{height: 100, width: null, flex: 1, alignItems: 'flex-end', justifyContent: 'center'}} >
              <View>
                <Text style={{fontWeight: 'bold', fontSize: 25, color: "#c1514d"}}> TRACK YOUR MEDICAL RECORD</Text>
              </View>
            </ImageBackground>
          </View>

      </View>


    );
  }

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
              <Image style={{width: 310, height: 70}} source={require('../assets/images/logoTeal2.png')} />
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
