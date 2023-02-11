import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native';
import TextInputField from "./TextInputField"
import {useState} from "react"


import {t} from "react-native-tailwindcss"
// const argon2 = require('argon2');
import * as Crypto from 'expo-crypto';
import CheckBox from './CheckBox';

import * as Clipboard from 'expo-clipboard';
import NumericInput from 'react-native-numeric-input'

export default function App() {
  
  const [passphrase, setPassphrase] = useState("");
  const [pas, setPass] = useState("");
  const [len, setLen] = useState(25);

  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  async function password(password){
     const digest = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
      );
      setPass((digest.toString().slice(0,len)))
  }

  return (
    <View style={[styles.container, t.bgGray900,]}>
    <TextInputField placeholder="Passphrase" onChangeText={password} password={true}  ></TextInputField>
      
      <NumericInput textColor={"white"} initValue={len} onChange={setLen} />

      <TouchableOpacity onPress={()=>Clipboard.setString(pas)} style={styles.button} >
        <Text style={[t.text2xl]} >Copy to clipboard</Text>
      </TouchableOpacity>

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
    minWidth:100,
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
