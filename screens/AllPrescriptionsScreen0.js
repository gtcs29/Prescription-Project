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
import { Icon, Left, Right, Tab, Accordion, Container, Button, Text, Content, Form, Item, Label, Input, Header, Body, Title, Card, CardItem, List, ListItem} from 'native-base';
import firebase from 'firebase';
const window = Dimensions.get('window');
import reverse from 'reverse-object-order';

var dataPatient = [];

var counter = 0;
export default class AllPrescriptionsScreen extends React.Component {
  constructor(props)
  {
      super(props);
      this.state={
        loaded: false,
        dataPatient2: [],
        dataByYear: {

        }
      }
  }


  componentDidMount() {

    var userId = firebase.auth().currentUser.uid;
    var that = this;
    console.log(userId);




    firebase.database().ref("users/" + userId+ "/data/Prescriptions/").on('value', function(snapshot) {
      that.setState({loaded: true});
      that.setState({dataPatient2: []});

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

  showAll = (data) => {

    return Object.keys(data).map((key, i) => {


      return (
        <View>
          <List>
            <ListItem itemHeader first>
              <Text>{Math.abs(key)}</Text>
            </ListItem>
          </List>
          <List dataArray={data[key]}
             renderRow={(item) =>
               <ListItem thumbnail>
                <Left style={{flexDirection: 'column', borderLeftWidth: 0.3, borderTopWidth: 0.3, borderBottomWidth: 2.0, borderRightWidth: 2.0, borderColor: "#6b5e61", width: 50, borderRadius: 4, shadowOffset:{  width: 5,  height: 5 },
                    shadowColor: '#a59fa0',
                    shadowOpacity: 1.0,
                    elevation: 1,
                    marginLeft: 5}}>
                  <ImageBackground style={{width: 48, height: 16, marginTop: 4}} source={require('../assets/images/purpleBackground.png')}>
                    <Text style={{fontSize: 12}}>{item.date.split(" ")[1]}</Text>
                  </ImageBackground>
                    <Text style={{fontSize: 22}}>{item.date.split(" ")[2]}</Text>
                </Left>
                <Body>
                  <Text style={{fontSize: 18, paddingLeft: 10}}>{item.docName}</Text>
                  <Text style={{fontSize: 15, paddingLeft: 10}}>{item.patientName}</Text>
                </Body>
                <Right>
                  <Button transparent
                    onPress={() => this._seePrescription(item.docName, item.patientName, item.date, item.medicines, item.appointments, item.diagnosis, item.testResults, item.amount)}>
                    <Text style={{color: "#c1514d", fontSize: 15}}>View</Text>
                  </Button>
                </Right>
               </ListItem>

             }
           >

           </List>
        </View>
      )
    })
  }


  render() {

    var dataAll = this.state.dataPatient2;

    dataAll.sort(function(a, b) {
      var dateA = new Date(a.date), dateB=new Date(b.date)
      return dateA-dateB //sort by date ascending
    })

    dataAll = dataAll.reverse();

    console.log(dataAll)

    var dataByYear = {}

    for(var i =0; i < dataAll.length; i++) {
      var year = dataAll[i].date.split(" ")[3]
      year = -Math.abs(parseInt(year))
      if(dataByYear.hasOwnProperty(year)) {
        dataByYear[year].push(dataAll[i])

        dataByYear[year].sort(function(
          a, b) {
          var dateA = new Date(a.date), dateB=new Date(b.date)
          return dateA-dateB //sort by date ascending
        })
        dataByYear[year] = dataByYear[year].reverse();

      }
      else {
        dataByYear[year] = [dataAll[i]]
      }
    }
    //
    // var result = [];
    //
    // for(var i in dataByYear){
    //     result.push([i, dataByYear[i]]);
    // }
    //
    // result = result.reverse();

    // function Comparator(a, b) {
    //   if (a[0] > b[0]) return -1;
    //   if (a[0] < b[0]) return 1;
    //   return 0;
    // }
    //
    //
    // result = result.sort(Comparator);

    // var data2 = JSON.stringify(result);
    // console.log(data2)
    // var data2 = reverse(dataByYear)
    //

     // if (!this.state.loaded) return <ActivityIndicator size="large" color="#9abdb5" style={{paddingBottom: 20}} />;

     return (

         <Container style={styles.container} contentContainerStyle={styles.contentContainer}>

           <Content>
             <View style={{paddingTop: 20, paddingBottom: 10, flexDirection: 'row', justifyContent: "flex-end", paddingRight: 20}}>
              <Icon active name="ios-add-circle-outline" onPress={this._addNew} style={{color: "#c1514d", fontSize: 35, paddingHorizontal: 12.5}}/>
              <Icon active name="ios-help-circle-outline" style={{color: "#c1514d", fontSize: 35}}/>

             </View>

             <View>
              {this.showAll(dataByYear)}
             </View>


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
    this.props.navigation.navigate('AddNew', {newVar});
  };

  _seePrescription = (doc, patient, date, medicines, appointments, diagnosis, testres, amount) => {
    var newVar = {
      docName: doc,
      patientName: patient,
      date: date,
      medicines: medicines,
      appointments: appointments,
      diagnosis: diagnosis,
      testres: testres,
      amount: amount
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
