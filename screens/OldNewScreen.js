// import React from 'react';
// import {
//   Dimensions,
//   Image,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   View,
//   AsyncStorage,
//   ImageBackground,
//   KeyboardAvoidingView
// } from 'react-native';
// import { WebBrowser } from 'expo';
// import GenerateForm from 'react-native-form-builder';
//
// import { MonoText } from '../components/StyledText';
// import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
// import { Picker, Accordion, Container, Button, Text, Content, Form, Item, Label, Input, Header, Body, Title, Card, CardItem} from 'native-base';
//
// const window = Dimensions.get('window');
//
// const storedFields = []
//
// export default class AddNewScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Prescription',
//
//   };
//
//
//   state = {
//       fields: [
//         {
//           type: 'text',
//           name: 'Doctor Name',
//           required: true,
//           icon: 'ios-person',
//           label: 'Doctor Name',
//         },
//         {
//           type: 'text',
//           name: 'Patient Name',
//           icon: 'ios-lock',
//           required: true,
//           label: 'Patient Name',
//         },
//         {
//           type: 'date',
//           name: 'date',
//           mode: 'date',
//           label: 'Select Date',
//           maxDate: new Date(2018, 7, 15),
//           minDate: new Date(1990, 7, 15),
//         },
//       ],
//       selected: 'key0',
//     }
//     // this.state = {
//     //   selected: "key1"
//     // };
//
//
//   onValueChange = (value: string) => {
//
//       this.setState({ selected: value })
//       // this.setState({selected: value,})
//       //   prevState => {
//       //   return {
//       //
//       //     fields: prevState.fields.concat(newVar)
//       //   };
//       // });
//       // if(this.state.selected == 'key1') {
//       //     this.setState({appended: this.state.appended.concat({
//       //           type: 'group',
//       //           name: 'Medicine',
//       //           label: 'Medicine',
//       //           fields: [
//       //             {
//       //               type: 'text',
//       //               name: 'medicine',
//       //               label: 'Add Medicine',
//       //             },
//       //             {
//       //               type: 'text',
//       //               name: 'medicine dosage',
//       //               label: 'Add Dosage',
//       //             },
//       //           ]
//       //         })
//       //       })
//
//     }
//
//
//     check = () => {
//       console.log(storedFields);
//       if(this.state.selected == 'key1'){
//         storedFields = storedFields.concat({
//           type: 'group',
//           name: 'Medicine',
//           label: 'Medicine',
//           fields: [
//             {
//               type: 'text',
//               name: 'medicine',
//               label: 'Add Medicine',
//             },
//             {
//               type: 'text',
//               name: 'medicine dosage',
//               label: 'Add Dosage',
//             },
//           ]
//         })
//         var newFields = [];
//         var i;
//         for(i = 0; i < storedFields.length; i++)
//           {newFields[i] = storedFields[i]}
//
//         return (
//           <GenerateForm
//             ref={(c) => {
//               this.formGenerator = c;
//             }}
//             fields={newFields}
//           />
//         )
//       }
//       if(this.state.selected == 'key2'){
//         storedFields = storedFields.concat({
//           type: 'text',
//           name: 'Medicine',
//           label: 'Medicine',
//
//         })
//         var newFields = [];
//         for(i = 0; i < storedFields.length; i++)
//           {newFields[i] = storedFields[i]}
//         return (
//           <GenerateForm
//             ref={(c) => {
//               this.formGenerator = c;
//             }}
//             fields={newFields}
//           />
//         )
//       }
//       if(this.state.selected == 'key3'){
//         newFields.push({
//           type: 'group',
//           name: 'Medicine',
//           label: 'Medicine',
//           fields: [
//             {
//               type: 'text',
//               name: 'medicine',
//               label: 'Add Medicine',
//             },
//             {
//               type: 'text',
//               name: 'medicine dosage',
//               label: 'Add Dosage',
//             },
//           ]
//         })
//         return (
//           <GenerateForm
//             ref={(c) => {
//               this.formGenerator = c;
//             }}
//             fields={newFields}
//           />
//         )
//       }
//       if(this.state.selected == 'key4'){
//         newFields.push({
//           type: 'group',
//           name: 'Medicine',
//           label: 'Medicine',
//           fields: [
//             {
//               type: 'text',
//               name: 'medicine',
//               label: 'Add Medicine',
//             },
//             {
//               type: 'text',
//               name: 'medicine dosage',
//               label: 'Add Dosage',
//             },
//           ]
//         })
//         return (
//           <GenerateForm
//             ref={(c) => {
//               this.formGenerator = c;
//             }}
//             fields={newFields}
//           />
//         )
//       }
//       if(this.state.selected == 'key5'){
//         newFields.push({
//           type: 'group',
//           name: 'Medicine',
//           label: 'Medicine',
//           fields: [
//             {
//               type: 'text',
//               name: 'medicine',
//               label: 'Add Medicine',
//             },
//             {
//               type: 'text',
//               name: 'medicine dosage',
//               label: 'Add Dosage',
//             },
//           ]
//         })
//         return (
//           <GenerateForm
//             ref={(c) => {
//               this.formGenerator = c;
//             }}
//             fields={newFields}
//           />
//         )
//       }
//
//
//
//     }
//
//
//   confirm() {
//     const formValues = this.formGenerator.getValues();
//   }
//
//   render() {
//
//
//     return (
//
//       <Container>
//         <View style={styles.container}>
//           <KeyboardAvoidingView style={styles.container2} behavior="padding">
//           <Form>
//             <Picker
//               note
//               mode="dropdown"
//               style={{ width: 120 }}
//               selectedValue={this.state.selected}
//               onValueChange={this.onValueChange.bind(this)}
//             >
//               <Picker.Item label="--Select--" value="key0" />
//               <Picker.Item label="Medicine" value="key1" />
//               <Picker.Item label="Diagnosis" value="key2" />
//               <Picker.Item label="Appointments" value="key3" />
//               <Picker.Item label="Test Results" value="key4" />
//             </Picker>
//           </Form>
//
//             <View style={styles.wrapper}>
//               <View>
//                 <GenerateForm
//                   ref={(c) => {
//                     this.formGenerator = c;
//                   }}
//                   fields={this.state.fields}
//                 />
//               </View>
//               <View>{this.check()} </View>
//
//               <View style={styles.submitButton}>
//                 <Button block onPress={() => this.confirm()}>
//                   <Text>Start</Text>
//                 </Button>
//               </View>
//             </View>
//           </KeyboardAvoidingView>
//         </View>
//
//       </Container>
//
//     );
//   }
//
//   _showMoreApp = () => {
//     this.props.navigation.navigate('Other');
//   };
//
//   _signOutAsync = async () => {
//     await AsyncStorage.clear();
//     this.props.navigation.navigate('Auth');
//   };
//
// }
//
// const styles = StyleSheet.create({
//   container2: {
//     height: 60,
//     flex: 1,
//
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   mainText: {
//     textAlign: 'center',
//     alignItems: 'center',
//     justifyContent: 'center',
//     fontFamily: 'Avenir',
//     fontSize: 40,
//   },
//   wrapper: {
//     flex: 1,
//     marginTop: 150,
//   },
//   submitButton: {
//     paddingHorizontal: 10,
//     paddingTop: 20,
//   },
// });
