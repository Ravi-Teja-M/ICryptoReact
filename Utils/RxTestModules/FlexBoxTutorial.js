import React,{Component} from 'react'
import 
 {  View,
    Text,
    Image,
    TextInput,
    Button,
    StyleSheet
     
 
} from 'react-native'

 
 export default class FlexBoxTutorial extends Component{

    constructor(props){
        super(props)
     }

     render(){
         return(
             <View style={FlexStyle.container}>
                <View style={FlexStyle.header}>
                 <Text style={FlexStyle.title}> Title</Text>
                 <Text style={FlexStyle.title}> Abc</Text>

                 </View>  
                <View style={FlexStyle.contentPane}></View>
                <View style={FlexStyle.bottomBar}></View>

            </View>
         )
     }

}

const FlexStyle = StyleSheet.create({
 container:{
    flex: 1,
    flexDirection: 'column',
    position: 'absolute',
},
title:{
    backgroundColor:'white',
     
 }
 , 
 header:{
     backgroundColor: 'green',
     flex:1,
     

 },
 contentPane: {
    flex:1,
    backgroundColor:'#d2f2f1',
    zIndex: 2,
 }
 , 
 bottomBar:{
    flex:1,
    backgroundColor:'grey'
 }

});