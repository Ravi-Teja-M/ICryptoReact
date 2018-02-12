import React,{Component} from 'react'
import applogo from '../assets/images/icon_.png'
import reactlogo from '../assets/images/react_icon.png'

import 
{
    View,
    StyleSheet,
    Image,
    Text,
    TouchableWithoutFeedback
} from 'react-native'

import {StackNavigator} from 'react-navigation'
import { NavigationActions } from 'react-navigation'

export default class SplashScreen extends Component {

constructor(props){
    super(props)
}

render(){
    const appTitle = `( Ravi ) => { "iCrypto" }`
     return(
        <TouchableWithoutFeedback onPress={ ()=>{
           // this.props.navigation.navigate('LoginScreen'); 
           this.navigateToLoginScreen()
            } }>
        <View style={SplashScreenStyle.container}>
        <Image style={SplashScreenStyle.logoStyle} source={applogo}  ></Image>
       
        <Text style={SplashScreenStyle.appTitle}> {appTitle} </Text>

        <Image style={SplashScreenStyle.reactlogoStyle} source={reactlogo} ></Image>
         </View>
         </TouchableWithoutFeedback>

    )
}

componentDidMount(){
   var intervalInst= setInterval(()=>{
     clearInterval(intervalInst);

     //Navigate to Login Screen or check for Existing credentials
        //his.props.navigation.navigate('LoginScreen');
       this.navigateToLoginScreen()
    },  1500);
}

hasLoginCredentials(){

    return false
}

navigateToLoginScreen(){
    this.props.navigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'LoginScreen' })
        ]
      }))
}

navigateToDashBoardScreen(){

}

//EOF
}
const SplashScreenStyle = StyleSheet.create({
    appTitle:{
        alignSelf: 'center',
        marginTop: 50,
        fontSize: 20,
        fontStyle: 'normal',
        fontWeight: 'bold'
    },
    logoStyle:{
         alignSelf: 'center',
         marginTop: '25%',
    },
    reactlogoStyle:{
        marginTop: 20,

        alignSelf: 'center',
        },
    container : {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
   
    }
});