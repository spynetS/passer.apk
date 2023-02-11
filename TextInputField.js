import { View,TextInput, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import {t} from "react-native-tailwindcss"

export default function TextInputField(props) {
	/*
		showText is so when the user pressed the key they can toogle
		to see password or not
	*/
	const [showText,setShowText] = useState(props.password)

	function iconPress(show){
		if(props.password){
			setShowText(show);
		}
	}

	const {style, ...rest} = props;

	const handleKeyDown = (e) => {
		alert(e.nativeEvent.key)
		if(e.nativeEvent.key == "Enter"){
			alert("asd")
		}
	}
	

    return (
		<View style={[t.border,t.pR3, t.bgWhite, t.roundedLg,t.h12,t.justifyCenter,t.itemsCenter,t.mY3,t.flex,t.flexRow,t.border0,style]} >
			<TextInput
				secureTextEntry={showText} 
				onChangeText={props.onChangeText} 
				style={[{width:"93%",height:"100%"},t.pX4,((props.inputStyle)?props.inputStyle:{})]}
				placeholderTextColor={props.placeholderTextColor?props.placeholderTextColor:"#919191"} 
				placeholder={props.placeholder} 
				keyboardType={props.keyboardType}
				textContentType={props.textContentType}
				defaultValue={props.default}
				onSubmitEditing={(props.onSubmitEditing)?props.onSubmitEditing:()=>{}}
				/>
			
			<TouchableOpacity onPressOut={()=>{iconPress(true)}} onPressIn={()=>{iconPress(false)}} >{(props.icon)?props.icon:""}</TouchableOpacity>
		</View>
	)

}
