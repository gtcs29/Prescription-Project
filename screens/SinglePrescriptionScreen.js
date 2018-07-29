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
  ImageBackground
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { Accordion, Container, Button, Text, Content, Form, Item, Label, Input, Header, Body, Title, Card, CardItem} from 'native-base';

const dataArray = [
  { title: "First Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
  { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
];

const window = Dimensions.get('window');

export default class SinglePrescriptionScreen extends React.Component {
  static navigationOptions = {
    title: 'Prescription',
  };

  _renderHeader(title, expanded) {
  return (
    <View
      style={{ flexDirection: "row", padding: 10, justifyContent: "space-between", alignItems: "center", backgroundColor: "#A9DAD6" }}
    >
      <Text style={{ fontWeight: "600" }}>
        {" "}{title}
      </Text>
      {expanded
        ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
        : <Icon style={{ fontSize: 18 }} name="add-circle" />}
    </View>
  );
}
_renderContent(content) {
  return (
    <Text
      style={{ backgroundColor: "#e3f1f1", padding: 10, fontStyle: "italic" }}
    >
      {content}
    </Text>
  );
}


  render() {
    return (
      // <View style={styles.container}>
      //   <Button title="Show me more of the app" onPress={this._showMoreApp} />
      //   <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      // </View>

      <Container>
        <View style={styles.container}>
          <Content>
                <ImageBackground style={{width: window.width, height: 250}} source={require('../assets/images/background.png')} >
                  <View>
                    <Button
                      title="View prescription 1"
                      onPress={this._showPrescriptions}
                    />
                    <Text style={styles.mainText}>Doctor: {this.props.navigation.state.params.newVar.docName}</Text>
                    <Text style={styles.mainText}>Patient: {this.props.navigation.state.params.newVar.patientName}</Text>
                    <Text style={styles.mainText}>Date: {this.props.navigation.state.params.newVar.date}</Text>
                  </View>
                </ImageBackground>
              <Header>
                <Text style={styles.mainText}>Medicines</Text>
              </Header>

              <Accordion dataArray={dataArray} icon="add" expandedIcon="remove"

              />


              <Header>
                <Text style={styles.mainText}>Medicines</Text>
              </Header>

              <Accordion dataArray={dataArray} icon="add" expandedIcon="remove"
              headerStyle={{ backgroundColor: "#c6badd" }}
              contentStyle={{ backgroundColor: "#eae0ff" }}
              />



            </Content>
        </View>

      </Container>


      // <View style={styles.container}>
      //   <Container>
      //     <Content>
      //       <ImageBackground style={{width: window.width, height: 250}} source={require('../assets/images/background.png')} >
      //         <View>
      //           <Button
      //             title="View prescription 1"
      //             onPress={this._showPrescriptions}
      //           />
      //           <Text style={styles.mainText}>Doctor: {this.props.docName}</Text>
      //           <Text style={styles.mainText}>Patient: {this.props.patientName}</Text>
      //           <Text style={styles.mainText}>Date: {this.props.date}</Text>
      //         </View>
      //       </ImageBackground>
      //     </Content>
      //   </Container>
      //
      //   <Container>
      //     <Header>
      //       <Text style={styles.mainText}>Medicines</Text>
      //     </Header>
      //     <Content padder>
      //       <Accordion dataArray={dataArray} icon="add" expandedIcon="remove" />
      //     </Content>
      //   </Container>
      //
      //   <Container>
      //     <Header>
      //       <Text style={styles.mainText}>Medicines</Text>
      //     </Header>
      //     <Content padder>
      //       <Accordion dataArray={dataArray} icon="add" expandedIcon="remove" />
      //       renderHeader={this._renderHeader}
      //       renderContent={this._renderContent}
      //     </Content>
      //   </Container>
      //
      // </View>
    );
  }
  _showPrescriptions = () => {
    this.props.navigation.navigate('Prescriptions');
  };

  _showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainText: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Avenir',
    fontSize: 40,
  }
});
