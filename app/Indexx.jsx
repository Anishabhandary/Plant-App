import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import React from 'react'
const dog=require("../assets/Images/download.jpeg")

const Indexx = () => {
  return (
    <View style={myStyle.top}>
      <Text>Student</Text>
      <Image source={dog}/>
    </View>
  )
}

const myStyle=StyleSheet.create({
    top:{
        backgroundColor:"#6FF9E6",
        
    },
})

export default Indexx
