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
import { Tab, Accordion, Container, Button, Text, Content, Form, Item, Label, Input, Header, Body, Title, Card, CardItem} from 'native-base';

const dataPatient = [
  {
    docName: "hiiiii",
    patientName: "hellololo",
    date: "hihello",
    medicine: "blah blah"
  },
  {
    docName: "ploob",
    patientName: "bllol",
    date: "hoop",
    medicine: "wheee"
  },
  {
    docName: "bowl",
    patientName: "soup",
    date: "vegetables",

  }
]
export default class AllPrescriptionsScreen extends React.Component {
  constructor(props)
  {
      super(props);
  }

  renderRow(dataPatient) {
    return (

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text>{dataPatient.docName}</Text>
          <Text>{dataPatient.patientName}</Text>
          <Text>{dataPatient.date}</Text>
        </View>
        <View>
          <Button block onPress={() => this._seePrescription(dataPatient.docName, dataPatient.patientName, dataPatient.date)}>
            <Text>Press</Text>
          </Button>
        </View>
      </View>

    );
  }

  render() {
    return (

      <Container style={styles.container} contentContainerStyle={styles.contentContainer}>

        <Content>

          <ListView
            data={dataPatient}
            renderRow={this.renderRow.bind(this)}
          />
        </Content>

      </Container>

      // <Button block onPress={this._seePrescription}>
      //   <Text> Press</Text>
      // </Button>
      // <Button block onPress={this._seePrescription}>
      //   <Text> Press</Text>
      // </Button>

      // <View style={styles.container}>
      //
      //   <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      //     <Button title="Actually, sign me out :)" onPress={this._signOutAsync} />
      //     <Button title="Actually, sign " onPress={this._seePrescription} />
      //   </ScrollView>
      // </View>
    );
  }

  _seePrescription = (doc, patient, date) => {
    var newVar = {
      docName: doc,
      patientName: patient,
      date: date
    }
    this.props.navigation.navigate('SinglePrescription', {newVar});
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

  contentContainer: {
    paddingTop: 30,
  },

});
