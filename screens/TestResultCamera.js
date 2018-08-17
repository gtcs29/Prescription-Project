import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Platform, Slider} from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Button, Icon } from 'native-base';
import { Camera, Permissions } from 'expo';

export default class TestResultCamera extends React.Component {
  static navigationOptions = {
    title: 'Take Picture'
  };

  constructor() {
    super();
    this.state = {
      previewImageData: '',
      enablePreview: false,
      canContinue: false,
      hasCameraPermission: null,
      flashMode: Camera.Constants.FlashMode.off,
      zoom: 0,
      retakeCheck: false,
   };
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  flash = () => {
    if(this.state.flashMode === Camera.Constants.FlashMode.off){
      return <MaterialIcons name='flash-off' size={20} color='white' style={{ color: 'white', alignSelf: 'flex-start', marginLeft: 10, marginTop: 10}} onPress={() => this.setState({ flashMode: Camera.Constants.FlashMode.on})} />
    }
    else {
      return <MaterialIcons name='flash-on' size={20} color='white' style={{ color: 'white', alignSelf: 'flex-start', marginLeft: 10, marginTop: 10}} onPress={() => this.setState({ flashMode: Camera.Constants.FlashMode.off})} />
    }
  }

  zoom = () => {
    return <Slider
      style={{ width: 300, marginLeft:20 }}
      minimumValue={0}
      maximumValue={1}
      value={this.state.zoom}
      onValueChange={val => this.setState({ zoom: val })}
    />
  }

  confirm = () => {
    var imageData = this.state.previewImageData;
    const formValues =
    {
      imageData
    };
    var data = this.props.navigation.state.params.newVar.data
    var name = this.props.navigation.state.params.newVar.name
    var PictureList = this.props.navigation.state.params.newVar.PictureList
    data[name] = formValues
    if(!(PictureList.indexOf(name) >= 0)){
      PictureList.push(name);
    }
    var newVar =
    {
      data,
      name
    }
    this.props.navigation.navigate('AddNew', {newVar})
  }

  retake() {
    this.state.enablePreview = false;
    this.state.previewImageData = '';
    this.state.retakeCheck = true;
    this.forceUpdate();
  }

  render() {
    if(this.state.retakeCheck === false) {
      var name = (this.props.navigation.state.params.newVar.name);
      var dataToCheck = this.props.navigation.state.params.newVar.data[name]

      if(dataToCheck !== undefined) {
        if('imageData' in dataToCheck){
          this.state.previewImageData = dataToCheck.imageData;
          this.state.enablePreview = true;
        }
      }
    }

    if (this.state.enablePreview) {
      return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <ImageBackground
            style={{width: '100%', height: '100%'}}
            source={{ uri: `data:image/jpeg;base64,${this.state.previewImageData}` }}
            resizeMode="contain"
          />
            <View style={{
              bottom: '15%',
              flexDirection: 'row',
              justifyContent: 'space-around' }}>
              <Button light style={{ alignSelf: 'center', alignItems: 'center'}} onPress={this.retake.bind(this)}>
                <Text style={{ marginLeft: 15, marginRight: 15 }}>Retake</Text>
              </Button>
              <Button light style={{ alignSelf: 'center', alignItems: 'center'}} onPress={() => this.confirm()}>
                <Text style={{ marginLeft: 15, marginRight: 15 }}>Confirm this Picture</Text>
              </Button>
            </View>
        </View>
      );
    }
      const { hasCameraPermission } = this.state;
      if (hasCameraPermission === null) {
        return <View />;
      }
      else if (hasCameraPermission === false) {
        return <Text>No access to camera</Text>;
      }

      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={Camera.Constants.Type.back}
            ref={ref => { this.camera = ref; }}
            flashMode={this.state.flashMode}
            zoom={this.state.zoom}
            >
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
                {this.flash()}
                {this.zoom()}
            </View>
            <View style={{
              bottom: '5%',
              flexDirection: 'row',
              justifyContent: 'center' }}>
              <Button iconLeft light style={{ alignSelf: 'center', alignItems: 'center'}} onPress={this.takePicture.bind(this)}>
                <Icon name='ios-camera' />
                <Text style={{ marginLeft: 5, marginRight: 15 }}>Snap</Text>
              </Button>
            </View>
          </Camera>
        </View>

      );
  }

  takePicture = async function() {
    if(this.camera){
      const options = { quality: 0.5, base64: true };
      const photo = await this.camera.takePictureAsync(options);
      this.state.previewImageData = photo.base64;
      this.state.enablePreview = true;
      this.forceUpdate();
    }
  }

}
