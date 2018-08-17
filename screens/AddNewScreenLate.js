// import React from 'react';
// import {
//   Image,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   View,
//   AsyncStorage
// } from 'react-native';
// import { WebBrowser } from 'expo';
// import { ListView } from '@shoutem/ui';
// import { MonoText } from '../components/StyledText';
// import { List, ListItem, Icon, Tab, Accordion, Container, Button, Text, Content, Form, Item, Label, Input, Header, Body, Title, Card, CardItem, Picker} from 'native-base';
// import firebase from 'firebase';
//
// import GenerateForm from 'react-native-form-builder';
//
// const tempFields = [
//   {
//     type: 'text',
//     name: 'docName',
//     required: true,
//     icon: 'ios-person',
//     label: 'Doctor Name',
//   },
//   {
//     type: 'text',
//     name: 'patientName',
//     icon: 'ios-lock',
//     required: true,
//     label: 'Patient Name',
//   },
//   {
//     type: 'date',
//     name: 'date',
//     mode: 'date',
//     required: true,
//     label: 'Select Date',
//     maxDate: new Date(2300, 7, 15),
//     minDate: new Date(1880, 7, 15),
//   },
// ]
//
// const firebaseData = [
//   {
//     name: "med1",
//     dosage: "med11"
//   },
//   {
//     name: "med2",
//     dosage: "med22"
//   }
//
// ]
//
//
// export default class AddNewScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Prescriptions!',
//   };
//
//   constructor(props) {
//     super(props);
//     this.confirm = this.confirm.bind(this);
//     var i = 0;
//
//     this.state = {fields: tempFields, selected1: 'ADD', id: 0}
//
//   }
//   // componentWillMount = async() => {
//   // //  GET DATA FROM FIREABSE AND SAVE IT INTO FIREBASE DATA (CURRENTLY HAS HARDCODED DATA) WHICH WILL BE USED TO RENDER THE LIST AND FORM
//   //
//   // }
//
//   confirm() {
//     const formValues = this.formGenerator.getValues();
//
//     formValues["date"] = formValues["date"].toString();
//     formValues['date'] = formValues['date'].split(" ")[0]+ " " + formValues['date'].split(" ")[1]+" " +formValues['date'].split(" ")[2]+" " +formValues['date'].split(" ")[3];
//
//     formValues["amounts"] = {
//       "medicines": this.props.navigation.state.params.newVar.meds,
//       "appointments": this.props.navigation.state.params.newVar.appointments,
//       "diagnosis": this.props.navigation.state.params.newVar.diagnosis,
//       "testResults": this.props.navigation.state.params.newVar.testres
//     }
//     var i;
//     for(i=0; i < this.props.navigation.state.params.newVar.appointments; i++) {
//       formValues['Appointment'+i] = formValues['Appointment'+i].toString();
//       formValues['Appointment'+i] = formValues['Appointment'+i].split(" ")[0]+" " +formValues['Appointment'+i].split(" ")[1]+" " +formValues['Appointment'+i].split(" ")[2]+" " +formValues['Appointment'+i].split(" ")[3];
//     }
//     console.log(formValues);
//     var userId = firebase.auth().currentUser.uid;
//     var that = this;
//     firebase.database().ref("users/" + userId+ "/data/Prescriptions/").push(formValues)
//     // CHANGE THIS TO UPDATE FIREBASE UNIQUE PRESCRIPTION DATA
//
//     this.props.navigation.navigate('Prescriptions');
//   }
//
//   addMed = () => {
//     // this.setState({id:this.state.id+1});
//
//
//     // var key = this.state.id.toString();
//
//     // var name = 'Medicine ' + key;
//     // itemsConst.push(name);
//     // this.setState({items:itemsConst});
//     newVar = {
//       medName: "",
//       medDosage: ""
//     }
//     this.props.navigation.navigate('MedicineForm', {newVar});
//
//   }
//
//   renderRow(medicine) {
//     return(
//     <View style={styles.ListViewEven}>
//
//       <View style={{justifyContent: 'center' }}>
//         <Text style={{fontWeight: "bold"}}>{medicine.name}</Text>
//       </View>
//       <View style={{justifyContent: 'center'}}>
//         <Button block style={{backgroundColor: "#c1514d"}}
//           onPress={() => this._seeMedicine(medicine.name, medicine.dosage)}>
//           <Text>Press</Text>
//         </Button>
//       </View>
//     </View>)
//   }
//
//   _seeMedicine(name, dosage) {
//     newVar = {
//       medName: name,
//       medDosage: dosage
//     }
//     this.props.navigation.navigate('MedicineForm', {newVar})
//   }
//
//   render() {
//     try {
//
//         var keys = await AsyncStorage.getAllKeys();
//         console.log(keys)
//
//     } catch (error) {
//       console.log(error);
//     }
//
//     return (
//
//       <Container style={styles.container} contentContainerStyle={styles.contentContainer}>
//
//         <Content>
//
//           <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
//             <Button small onPress={this.addMed} style={{backgroundColor: "#c1514d"}}>
//               <Text> Medicine </Text>
//             </Button>
//             <Button small style={{backgroundColor: "#c1514d"}}>
//               <Text> Appointment </Text>
//             </Button>
//             <Button small style={{backgroundColor: "#c1514d"}}>
//               <Text> Test Result </Text>
//             </Button>
//             <Button small style={{backgroundColor: "#c1514d"}}>
//               <Text> Diagnosis </Text>
//             </Button>
//
//           </View>
//           <View>
//             <GenerateForm
//               ref={(c) => {
//                 this.formGenerator = c;
//               }}
//               fields={this.state.fields}
//             />
//           </View>
//
//           <ListView
//             data={firebaseData}
//             renderRow={this.renderRow.bind(this)}
//           />
//
//           <View style={styles.submitButton}>
//             <Button block style={{backgroundColor: '#c1514d'}} onPress={() => this.confirm()}>
//               <Text>Confirm</Text>
//             </Button>
//           </View>
//
//         </Content>
//
//       </Container>
//
//     );
//   }
//
//
//   _signOutAsync = async () => {
//     await AsyncStorage.clear();
//     this.props.navigation.navigate('Auth');
//   };
//
// }
//
// const styles = StyleSheet.create({
//   ListViewOdd: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     borderBottomColor: '#000000',
//     borderBottomWidth:1,
//     backgroundColor: '#ffffff'
//
//   },
//   ListViewEven: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     borderBottomColor: '#000000',
//     borderBottomWidth:1,
//     backgroundColor: '#fbf5f3',
//     paddingHorizontal: 20,
//     paddingVertical: 5,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//
//   contentContainer: {
//     paddingTop: 30,
//   },
//     submitButton: {
//       paddingHorizontal: 10,
//       paddingTop: 20,
//     },
//
// });
