import { View,Text, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import {t} from "react-native-tailwindcss"

export default function CheckBox(props) {

    const [on, setOn] = useState(false);

    function getTagged(){
        if(on){
            return(
                <View
                style={
                    [t.w4, 
                    t.h4,
                    t.bgGray800,
                    t.border2,
                    t.borderWhite,
                    ]} 
                ></View>
            )
        }
        return (<></>)
    }

    return(
        <TouchableOpacity onPress={()=>{setOn(!on);props.value(!on)}} style={[t.flexRow, t.itemsCenter,t.mY4]} >
            <View 
            style={
                [t.w5, 
                t.h5,
                t.bgWhite,
                t.border2,
                t.borderGray700,
                t.flex,
                t.itemsCenter,
                t.justifyCenter,
            ]} 
                >
                {getTagged()}
            </View>
            <Text style={[t.textWhite,t.mL1]} >{props.children}</Text> 
        </TouchableOpacity>)
}

