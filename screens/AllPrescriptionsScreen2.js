import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  AsyncStorage,
  ImageBackground,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { WebBrowser } from 'expo';
import { ListView } from '@shoutem/ui';
import { MonoText } from '../components/StyledText';
import { Tab, Accordion, Container, Button, Text, Content, Form, Item, Label, Input, Header, Body, Title, Card, CardItem} from 'native-base';
import firebase from 'firebase';
const window = Dimensions.get('window');

var dataPatient = [];

const dataPatient3 = [{
           "amount": {
             "appointments": 0,
             "diagnosis": 1,
             "medicines": 1,
             "testResults": 0,
           },
           "appointments": [],
           "date": new Date(2018, 7, 15),
           "diagnosis": [
           {
               "diagnosis": "WOWIE",
             },
           ],
           "docName": "Doctor Hopper",
           "medicines":  [
              {
               "Days":  [
                 "Everyday",
               ],
               "Times":  {
                 "Time1": new Date(2018, 7, 15),
                 "Time2": null,
                 "Time3": null,
                 "Time4": null,
               },
               "endDate": new Date(2018, 7, 15),
               "medName": "Valium",
               "startDate": new Date(2018, 7, 15),
             },
           ],
           "patientName": "Patient Pipper",
           "testResults":  [],
         }]

var counter = 0;
export default class AllPrescriptionsScreen extends React.Component {
  constructor(props)
  {
      super(props);
      this.state={
        loaded: false,
        dataPatient2: []
      }
  }

  renderRow(dataPatient) {

    if(dataPatient.hasOwnProperty('appointments') === false) {
      dataPatient['appointments'] = [];
    }
    if(dataPatient.hasOwnProperty('medicines') === false) {
      dataPatient['medicines'] = [];
    }
    if(dataPatient.hasOwnProperty('diagnosis') === false) {
      dataPatient['diagnosis'] = [];
    }
    if(dataPatient.hasOwnProperty('testResults') === false) {
      dataPatient['testResults'] = [];
    }

    for(var i = 0; i < dataPatient.medicines.length; i++) {
      var timeList = dataPatient["medicines"][i]["Times"];
      for(var n = 1; n < Object.keys(dataPatient["medicines"][i]["Times"]).length+1; n++) {
        time = "Time" + n;
        if (timeList[time] !== null) {
          // timeList[time] = timeList[time].toString();
          timeList[time]= timeList[time].split(" ")[0];

        }
      }
    }

    counter = counter +1;
    var newVar = {
      medicines: [],
      appointments: {},
      diagnosis: {},
      testres: {}
    }
    var i;

    if (counter % 2 == 0 )
      {return (
        <ImageBackground style={{width: window.width, height: 100}} source={require('../assets/images/purpleBackground.png')} >

        <View style={styles.ListViewEven}>

          <View>
            <Text style={{fontWeight: "bold"}}>{dataPatient.docName}</Text>
            <Text>{dataPatient.patientName}</Text>
            <Text>{dataPatient.date}</Text>
          </View>
          <View style={{justifyContent: 'center'}}>
            <Button block style={{backgroundColor: "#c1514d"}}
              onPress={() => this._seePrescription(dataPatient.docName, dataPatient.patientName, dataPatient.date, dataPatient.medicines, dataPatient.appointments, dataPatient.diagnosis, dataPatient.testResults)}>
              <Text>Press</Text>
            </Button>
          </View>
        </View>
        </ImageBackground>

      );
    }

    else {return (

      <View style={styles.ListViewOdd}>
        <View>
          <Text style={{fontWeight: "bold"}}>{dataPatient.docName}</Text>
          <Text>{dataPatient.patientName}</Text>
          <Text>{dataPatient.date}</Text>
        </View>
        <View style={{justifyContent: 'center'}}>
          <Button block style={{backgroundColor: "#c1514d"}}
            onPress={() => this._seePrescription(dataPatient.docName, dataPatient.patientName, dataPatient.date, dataPatient.medicines, dataPatient.appointments, dataPatient.diagnosis, dataPatient.testResults)}>
            <Text>Press</Text>
          </Button>
        </View>
      </View>

    );

    }
  }

  componentDidMount() {
    var userId = firebase.auth().currentUser.uid;
    var that = this;
    console.log(userId);
    firebase.database().ref("users/" + userId+ "/data/Prescriptions/").on('value', function(snapshot) {
      that.setState({loaded: true});
      snapshot.forEach(function(childSnapshot) {

        var childData = childSnapshot.val();
        // dataPatient.push(childData);

        that.setState(prevState => {
          return {
            dataPatient2: prevState.dataPatient2.concat(childData)
          };
        });

      });
    });
  }

  render() {
     // if (!this.state.loaded) return <ActivityIndicator size="large" color="#9abdb5" style={{paddingBottom: 20}} />;
     return (

         <Container style={styles.container} contentContainerStyle={styles.contentContainer}>

           <Content>
             <View style={{paddingVertical: 20}}>
             <Button block style={{backgroundColor: "#c1514d"}} onPress={this._addNew}>
               <Text>Add New</Text>
             </Button>
             </View>
            <ListView
               data={this.state.dataPatient2}
               renderRow={this.renderRow.bind(this)}
             />
           </Content>

         </Container>


     );
   }

  _addNew = () => {
    var medicinesList = [];
    var AppointmentList = [];
    var DiagnosisList = [];
    var TestResultList = [];
    var PictureList = [];
    var data= {};
    newVar = {
      medicinesList,
      AppointmentList,
      DiagnosisList,
      TestResultList,
      PictureList,
      data
    }
    this.setState({dataPatient2: []})
    this.props.navigation.navigate('AddNew', {newVar});
  };

  _seePrescription = (doc, patient, date, medicines, appointments, diagnosis, testres) => {
    var newVar = {
      docName: doc,
      patientName: patient,
      date: date,
      medicines: medicines,
      appointments: appointments,
      diagnosis: diagnosis,
      testres: testres
    }
    this.props.navigation.navigate('SinglePrescription', {newVar});
  };

}

const styles = StyleSheet.create({
  ListViewOdd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#000000',
    borderBottomWidth:0,
    backgroundColor: '#fbf5f3',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  ListViewEven: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#000000',
    borderBottomWidth:0,
    // backgroundColor: '#edb0a2',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingTop: 30,
  },

});
