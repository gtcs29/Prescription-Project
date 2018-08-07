import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  AsyncStorage
} from 'react-native';
import { WebBrowser } from 'expo';
import { ListView } from '@shoutem/ui';
import { MonoText } from '../components/StyledText';
import { Icon, Tab, Accordion, Container, Button, Text, Content, Form, Item, Label, Input, Header, Body, Title, Card, CardItem, Picker} from 'native-base';



export default class betweenAddScreen extends React.Component {
  static navigationOptions = {
    title: 'Prescriptions!',
  };

  constructor(props) {
    super(props);
    this.state = {
      selected1: "key0",
      selected2: "key0",
      selected3: "key0",
      selected4: "key0"
    };
    this.onValueChange1 = this.onValueChange1.bind(this);
    this.onValueChange2 = this.onValueChange2.bind(this);
    this.onValueChange3 = this.onValueChange3.bind(this);
    this.onValueChange4 = this.onValueChange4.bind(this);
  }

  onValueChange1(value: string) {
    this.setState({
      selected1: value
    });
  }
  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
  }

  onValueChange3(value: string) {
    this.setState({
      selected3: value
    });
  }
  onValueChange4(value: string) {
    this.setState({
      selected4: value
    });
  }

  render() {
    return (

      <Container style={styles.container} contentContainerStyle={styles.contentContainer}>

        <Content>
          <Text> Enter the amount of each element you would like in this prescription</Text>

          <Form style={styles.rowContainer}>
            <Text>Medicines</Text>
            <Item picker>

              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={{ width: undefined }}
                placeholder="Medicine"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected1}
                onValueChange={this.onValueChange1.bind(this)}
              >
                <Picker.Item label="0" value="key0" />
                <Picker.Item label="1" value="key1" />
                <Picker.Item label="2" value="key2" />
                <Picker.Item label="3" value="key3" />
                <Picker.Item label="4" value="key4" />
              </Picker>
            </Item>
          </Form>

          <Form style={styles.rowContainer}>
            <Text>Appointments</Text>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={{ width: undefined }}
                placeholder="Amount"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="0" value="key0" />
                <Picker.Item label="1" value="key1" />
                <Picker.Item label="2" value="key2" />
                <Picker.Item label="3" value="key3" />
                <Picker.Item label="4" value="key4" />
              </Picker>
            </Item>
          </Form>
          <Form style={styles.rowContainer}>
            <Text>Diagnosis</Text>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={{ width: undefined }}
                placeholder="Amount"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected3}
                onValueChange={this.onValueChange3.bind(this)}
              >
                <Picker.Item label="0" value="key0" />
                <Picker.Item label="1" value="key1" />
                <Picker.Item label="2" value="key2" />
                <Picker.Item label="3" value="key3" />
                <Picker.Item label="4" value="key4" />
              </Picker>
            </Item>
          </Form>
          <Form style={styles.rowContainer}>
            <Text>Test Results</Text>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={{ width: undefined }}
                placeholder="Amount"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected4}
                onValueChange={this.onValueChange4.bind(this)}
              >
                <Picker.Item label="0" value="key0" />
                <Picker.Item label="1" value="key1" />
                <Picker.Item label="2" value="key2" />
                <Picker.Item label="3" value="key3" />
                <Picker.Item label="4" value="key4" />
              </Picker>
            </Item>
          </Form>

          <Button onPress={this.addNewNav}>
            <Text> Next</Text>
          </Button>
        </Content>

      </Container>

    );
  }

  addNewNav = () => {

    var newVar = {
      meds: parseInt(this.state.selected1.substring(3)),
      appointments: parseInt(this.state.selected2.substring(3)),
      diagnosis: parseInt(this.state.selected3.substring(3)),
      testres: parseInt(this.state.selected4.substring(3))
    }

    this.props.navigation.navigate('AddNew', {newVar} );
  }


  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

}

const styles = StyleSheet.create({
  ListViewOdd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#000000',
    borderBottomWidth:1,
    backgroundColor: '#ffffff'

  },
  ListViewEven: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#000000',
    borderBottomWidth:1,
    backgroundColor: '#eae0ff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingTop: 30,
  },
  rowContainer: {
  height: 64,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingLeft: 16,
},
});
