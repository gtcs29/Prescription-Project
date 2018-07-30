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
    docName: "doc1",
    patientName: "patient1",
    date: "07/28/1987",
    medicine: "blah blah"
  },
  {
    docName: "doc2",
    patientName: "patient2",
    date: "08/13/1996",
    medicine: "wheee"
  },
  {
    docName: "bowl",
    patientName: "soup",
    date: "vegetables",

  }
]

var counter = 0;
export default class AllPrescriptionsScreen extends React.Component {
  constructor(props)
  {
      super(props);
  }

  renderRow(dataPatient) {
    counter = counter +1;
    if (counter % 2 == 0 )
      {return (

        <View style={styles.ListViewEven}>
          <View>
            <Text>{dataPatient.index}</Text>
            <Text>{dataPatient.docName}</Text>
            <Text>{dataPatient.patientName}</Text>
            <Text>{dataPatient.date}</Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Button block style={{backgroundColor: "#5b448c"}}
              onPress={() => this._seePrescription(dataPatient.docName, dataPatient.patientName, dataPatient.date)}>
              <Text>Press</Text>
            </Button>
          </View>
        </View>

      );
    }

    else {return (

      <View style={styles.ListViewOdd}>
        <View>
          <Text>{dataPatient.docName}</Text>
          <Text>{dataPatient.patientName}</Text>
          <Text>{dataPatient.date}</Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Button block style={{backgroundColor: "#5b448c"}}
            onPress={() => this._seePrescription(dataPatient.docName, dataPatient.patientName, dataPatient.date)}>
            <Text>Press</Text>
          </Button>
        </View>
      </View>

    );

    }
  }

  render() {
    return (

      <Container style={styles.container} contentContainerStyle={styles.contentContainer}>

        <Content>
          <Button onPress={this._addNew}>
            <Text>Add New</Text>
          </Button>

          <ListView
            data={dataPatient}
            renderRow={this.renderRow.bind(this)}
          />
        </Content>

      </Container>

    );
  }

  _addNew = () => {
    this.props.navigation.navigate('AddNew');
  };

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

});
