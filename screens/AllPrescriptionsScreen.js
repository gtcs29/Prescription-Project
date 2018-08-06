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
// const dataPatient = [
//   {
//   "Appointment0": "Fri Aug 01 2014",
//   "Medicine0": {
//     "medicine": "Med1",
//     "medicineDosage": "2",
//     },
//   "Medicine1": {
//     "medicine": "Med3",
//     "medicineDosage": "3",
//     },
//   "amounts": {
//     "appointments": 1,
//     "diagnosis": 0,
//     "medicines": 2,
//     "testResults": 0,
//     },
//   "date": "Fri Aug 01 2014",
//   "docName": "Doctor Name",
//   "patientName": "Patient Name",
//   },
//   {
//   "Appointment0": "Fri Aug 01 2014",
//   "Appointment1": "Fri Aug 01 2014",
//   "Appointment2": "Fri Aug 01 2014",
//   "Medicine0": {
//     "medicine": "Med1 WHEE",
//     "medicineDosage": "2 WHEE",
//     },
//   "Medicine1": {
//     "medicine": "Med3 WHEE",
//     "medicineDosage": "3 WHEE",
//     },
//   "amounts": {
//     "appointments": 3,
//     "diagnosis": 2,
//     "medicines": 1,
//     "testResults": 1,
//     },
//   "date": "Fri Aug 01 2014",
//   "docName": "Doctor Name WHEE",
//   "Diagnosis0": "Diagnosis Test 1",
//   "Diagnosis1": "Diagnosis Test 1",
//   "testres0": "Test Result 1",
//   "patientName": "Patient Name WHEE",
//   },
//   // {
//   //   docName: "doc2",
//   //   patientName: "patient2",
//   //   date: "08/13/1996",
//   //   medicine: "wheee"
//   // },
//   // {
//   //   docName: "bowl",
//   //   patientName: "soup",
//   //   date: "vegetables",
//   //
//   // },
//   // {
//   //   docName: "John Doe",
//   //   patientName: "Gitika Bose",
//   //   date: "07/28/1987",
//   //   medicine: "blah blah"
//   // },
//   // {
//   //   docName: "John Doe",
//   //   patientName: "Gitika Bose",
//   //   date: "07/28/1987",
//   //   medicine: "blah blah"
//   // }
// ]


var counter = 0;
export default class AllPrescriptionsScreen extends React.Component {
  constructor(props)
  {
      super(props);
      this.state={
        loaded: false
      }
  }

  renderRow(dataPatient) {
    counter = counter +1;
    var newVar = {
      medicines: [],
      appointments: {},
      diagnosis: {},
      testres: {}
    }
    var i;

    for (i=0; i < dataPatient.amounts.medicines; i++) {
      var med = "Medicine"+i;
      newVar.medicines.push(dataPatient[med])
    }
    var i;

    for (i=0; i < dataPatient.amounts.appointments; i++) {
      var app = "Appointment"+i;
      newVar.appointments[app] = (dataPatient[app])
    }
    var i;

    for (i=0; i < dataPatient.amounts.diagnosis; i++) {
      var dia = "Diagnosis"+i;
      newVar.diagnosis[dia] = (dataPatient[dia])
    }
    var i;

    for (i=0; i < dataPatient.amounts.testResults; i++) {
      var tr = "testres"+i;
      newVar.testres[tr] = (dataPatient[tr])
    }

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
              onPress={() => this._seePrescription(dataPatient.docName, dataPatient.patientName, dataPatient.date, newVar.medicines, newVar.appointments, newVar.diagnosis, newVar.testres)}>
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
            onPress={() => this._seePrescription(dataPatient.docName, dataPatient.patientName, dataPatient.date, newVar.medicines, newVar.appointments, newVar.diagnosis, newVar.testres)}>
            <Text>Press</Text>
          </Button>
        </View>
      </View>

    );

    }
  }

  componentWillMount() {
    var userId = firebase.auth().currentUser.uid;
    var that = this;
    var tempArray = [];
    console.log(userId);
    firebase.database().ref("users/" + userId+ "/data/Prescriptions/").on('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        console.log(childSnapshot)
        var childData = childSnapshot.val();
        console.log(childData);

        dataPatient.push(childData);
        that.setState({loaded: true});
        // tempArray.concat(childData);
        // that.setState(prevState => {
        //   return {
        //     dataPatient: prevState.dataPatient.concat(childData)
        //   };
        // });
      });
    });
  }

  render() {
     if (!this.state.loaded) return <ActivityIndicator size="large" color="#9abdb5" style={{paddingBottom: 20}} />;
     console.log(dataPatient);
     return (

         <Container style={styles.container} contentContainerStyle={styles.contentContainer}>

           <Content>
             <View style={{paddingVertical: 20}}>
             //d0716b - middle
             <Button block style={{backgroundColor: "#c1514d"}} onPress={this._addNew}>
               <Text>Add New</Text>
             </Button>
             </View>

             <ListView
               data={dataPatient}
               renderRow={this.renderRow.bind(this)}
             />
           </Content>

         </Container>


     );
   }

  _addNew = () => {
    this.props.navigation.navigate('betweenAdd');
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
