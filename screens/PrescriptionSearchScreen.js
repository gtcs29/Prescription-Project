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
import SearchBar from 'react-native-searchbar';

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

export default class PrescriptionSearchScreen extends React.Component {

  constructor(props)
  {
      super(props);
      this._handleResults = this._handleResults.bind(this);
      this.state = {filteredResults: []};
  }

  _handleResults(results) {
    this.setState({ filteredResults: results });
  }

  renderRow(dataPatient) {
    return (

      <View style={{flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: '#000000', borderBottomWidth:2}}>
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
        <Header>
          <SearchBar
            ref={(ref) => this.searchBar = ref}
            data={dataPatient}
            handleResults={this._handleResults}
            showOnLoad
            hideBack={true}
          />
        </Header>
        <Content style={{flexDirection: 'column'}}>

          <View>

          </View>
          <View>
            <ListView
              data={this.state.filteredResults}
              renderRow={this.renderRow.bind(this)}
            />
          </View>

        </Content>

      </Container>

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
