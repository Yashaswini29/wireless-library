import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
import { TextInput } from 'react-native-paper';

export default class TransactionScreen extends React.Component {

    constructor(){
      super();
      this.state={
        hasCameraPermissions:null,
        scanned:false,
        scannedBookId:'',
        scannedStudentId:'',
        buttonState:'normal'
      }
    }

    getCameraPermissions = async(id) =>{
      const {status} =await Permissions.askAsync(Permissions.CAMERA)

      this.setState({
        hasCameraPermissions: status === 'granted',
        buttonState: id,
        scanned: false
      })
    }

    handleBarCodeScanned = async({type,data})=>{
      const {buttonState} = this.state
      if(buttonState === "BookId"){
        this.setState({
          scanned:true,
          scannedBookId:data,
          buttonState: 'normal'
        })
      }else if(buttonState === "StudentId"){
        this.setState({
          scanned:true,
          scannedStudentId:data,
          buttonState: 'normal'
        })
      }
      
    }
    render() {
      const hasCameraPermissions = this.state.hasCameraPermissions;
      const scanned = this.state.scanned;
      const buttonState = this.state.buttonState;

      if(buttonState !== 'normal' && hasCameraPermissions){
        return(
          <BarCodeScanner
          onBarCodeScanned = {scanned? undefined: this.handleBarCodeScanned}
          style = {StyleSheet.absoluteFillObject}
          />
        )
      }else if(buttonState === 'normal'){
      return (
        <View style={styles.container}>
          <View>
            <Image source={require('../assets/booklogo.jpg')}
            style = {{width:200,height:200}}/>
            <Text style={{textAlign:'center',fontSize:30, color:'#30440d'}}>Wily</Text>
          </View>
          <View style = {styles.inputView}>
            <TextInput 
            style = {styles.inputBox}
            placeholder='Book Id'
            value={this.state.scannedBookId}/>
            <TouchableOpacity style={styles.scanButton}
            onPress={()=>{
              this.getCameraPermissions('BookId')
            }}>
              <Text style = {styles.buttonText}>Scan</Text>
            </TouchableOpacity>
          </View>
          <View style = {styles.inputView}>
          <TextInput 
            style = {styles.inputBox}
            placeholder='Student Id'
            value={this.state.scannedStudentId}/>
            <TouchableOpacity style={styles.scanButton}
            onPress={()=>{
              this.getCameraPermissions('StudentId')
            }}>
              <Text style = {styles.buttonText}>Scan</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 20,
    },
    inputBox:{
      width:200,
      height:20,
      borderWidth:1.5,
      fontSize:15,
      justifyContent:'center'
    },
    inputView:{
      flexDirection:'row',
      margin:20
    }
  });