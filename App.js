import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import TextInputField from "./TextInputField"
import {useEffect, useState} from "react"


import {t} from "react-native-tailwindcss"
// const argon2 = require('argon2');
import * as Crypto from 'expo-crypto';
import CheckBox from './CheckBox';

import * as Clipboard from 'expo-clipboard';
import NumericInput from 'react-native-numeric-input'

import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  
  const [passphrase, setPassphrase] = useState("");
  const [pas, setPass] = useState("");
  const [len, setLen] = useState(25);
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [salt, setSalt] = useState("")
  const [showSalt, setShowSalt] = useState("idk")

  useEffect(()=>{
      AsyncStorage.getItem("salt").then(asyncStorageRes => {
        setSalt(asyncStorageRes)
      });
  },[])

  useEffect(()=>{
    console.log(passphrase)
    password(passphrase)
  },[salt, showSalt, toggleCheckBox])

  async function password(password){
    const ssalt = salt != null? salt: "";
    console.log(password+ssalt)
    const digest = await Crypto.digestStringAsync(
       Crypto.CryptoDigestAlgorithm.SHA256,
       (password+ssalt)
     );
     setPass((digest.toString().slice(0,len)))
  }

  const saveSalt = async () => {
    AsyncStorage.setItem('salt', salt);
      setShowSalt(salt)
  }

  const seeSalt = async () => {
      AsyncStorage.getItem("salt").then(asyncStorageRes => {
        setShowSalt(asyncStorageRes)
      });
  }

  return (
    <View style={[styles.container, t.bgGray900,]}>

      <Text style={[t.textWhite, {width:"80%"}]} >Set the salt to make your passphrase uniqe (when saved it will be saved to next session)</Text>
      <TextInputField placeholder="Salt" onChangeText={setSalt} password={true}  ></TextInputField>

      <Text style={[t.textWhite, t.text2xl]}>Salt: {showSalt}</Text>

      <View style={[t.flexRow, t.mT2]}>
        <TouchableOpacity onPress={saveSalt} style={[styles.button, t.mX1]} >
          <Text style={[t.textXl]} >Save Salt</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={seeSalt} style={[styles.button, t.mX1]} >
         <Text style={[t.textXl]} >See Salt</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{setSalt(""); saveSalt()}} style={[styles.button, t.mX1]} >
          <Text style={[t.textXl]} >Clear Salt</Text>
        </TouchableOpacity>
      </View>

      <TextInputField placeholder="Passphrase" onChangeText={password} password={true}  ></TextInputField>
      
      <NumericInput textColor={"white"} initValue={len} onChange={setLen} />

      <View style={[t.flexRow, t.mT2]}>
        <TouchableOpacity onPress={()=>Clipboard.setString(pas)} style={[styles.button, t.mX1]} >
          <Text style={[t.textXl]} >Copy to clipboard</Text>
        </TouchableOpacity>
      </View>

      <CheckBox value={setToggleCheckBox} >Show password</CheckBox>

      <Text style={[t.text2xl,t.textWhite]} >{(toggleCheckBox)?pas:""}</Text>
      <StatusBar style="auto" />
    </View>
  );
}



const styles = StyleSheet.create({
  button:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"lightblue",
    padding:10,
    borderRadius:10,
    minWidth:20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
