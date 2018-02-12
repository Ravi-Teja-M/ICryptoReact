import React,{Component} from 'react'
import 
{
    View, Text, TextInput,Button, StyleSheet ,ActivityIndicator ,NavigatorIOS
} from 'react-native'
export default class LoginScreen extends Component{

constructor(props){
    super(props)
    this.initState();
}

initState(){
    this.state ={
        timer : new Date().toLocaleString(),
        userName: "ravi-teja-m",
        password: "Ironman!234",
        isLoading :false,
        isErrorEnabled : false,
        isLoggedInSuccessful: false,
        loggedUserName: ""
    }

}

render(){
      
    const LoginContainer = this.LoginScreen()
    return  ( <View>
                {LoginContainer}
             </View>
     )
}

LoginScreen (){
    var errorInput = <View/>
    var userProfileGreeting = <View/>

    if(this.state.isErrorEnabled){
        errorInput= <Text style={stylingView.errormesg} > invalid credentials, kindly re-enter.</Text> ;
    }

    if(this.state.isLoggedInSuccessful){
        userProfileGreeting = <Text style={stylingView.greetings} > Welcome {this.state.loggedUserName}..! </Text> ;
    }

    return (
        <View style={{flexDirection: 'column',width: '100%',height:'100%',alignContent:"center",backgroundColor : 'grey'}}>
        <View style={{marginTop:'50%'}}>
        <View style={{flexDirection: 'row',margin:20 }}>
            <Text style={stylingView.textField} >Email: </Text>
            <TextInput ref={(element)=>{ this.userName = element; }} 
                       id="userName"  style={stylingView.textInput} 
                        onChangeText={this.onUserTextChange.bind(this)} 
                        value={this.state.userName} >
            </TextInput>
        </View>

        <View style={{flexDirection: 'row',margin:20}}>
            <Text style={rs.textField}>Password: </Text>
            <TextInput ref={(element)=>{ this.password = element;}}
                       onChangeText={this.onPasswordTextChange.bind(this)} 
                       style={stylingView.textInput} 
                       value={this.state.password} >
            </TextInput>

        </View>
        <Button style={stylingView.submitStyle} title="Submit" onPress={this.onSubmitClicked.bind(this)}> </Button>
         <ActivityIndicator progressStyle={stylingView.progressS} animating={this.state.isLoading} ></ActivityIndicator>
            { errorInput }

            {userProfileGreeting}
            </View>
        </View>
    )
}

onUserTextChange(eventObject){
    console.log(eventObject);
    this.setState(function(previous,props){
        return {userName: eventObject};
    });
}

onPasswordTextChange(eventObject){
    console.log(eventObject);
    this.setState((previous,props)=>{
        return {password: eventObject};
    });
}

onSubmitClicked(event){  
    if(this.state.userName.trim().length ==0){        
       this.setState( {isErrorEnabled: true}
       );
        return;
    }
    if(this.state.password.trim().length == 0) {
       this.setState( {isErrorEnabled: true}
       );
       return;
    }
    this.setState((previous,props)=>{
       return {isLoading: true};
   });

   this.setState( {isErrorEnabled: false}
   );

   console.log('state' + this.state.isLoading);
 }
//eof
}

const stylingView = StyleSheet.create({
    greetings:{
        color: 'white',
        fontSize: 20,
        width: '100%',
        textAlign: 'center'
    },
    errormesg:{
        color: 'red',
        fontSize: 20,
        width: '100%',
        textAlign: 'center'
    } ,
    progressS:{
        backgroundColor : 'red',
    } ,
    block:{
        backgroundColor:'yellow',
        marginTop:2,
        marginLeft:2,
        flex: 1
    },
    submitStyle:{
        width: '100%',
        height: 80,
        backgroundColor:'red',
        marginTop:2,
        marginLeft:2,
        flex: 1,        
        color:'white'
    },
    textField :{
        color: '#FFFFFF',
        backgroundColor : '#82B1FF',
        flex:0.3,
        marginTop:20,
        padding:10
     },
    textInput :{
        color: '#000000',
        backgroundColor : '#ffffff',
        flex:0.7,
        marginTop:20,
        padding:10
    },
    loginLabel :{
        color: '#FFFFFF',
         width:"100%",
        marginTop:30,
        padding:10,
        textAlign:"left",
        fontSize: 18,
        paddingLeft: 25
    },
    timeTicker :{
        color: '#ffffff',
         width:"100%",
        marginTop:30,
        padding:10,
        textAlign:"left",
        fontSize: 15
     },
    progress :{
    }
});

const rs = Object.create(stylingView);
rs.prototype = {

}
