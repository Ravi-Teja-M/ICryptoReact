import React,{Component} from 'react'
import 
 {  View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ActivityIndicator,
    NavigatorIOS,
    ListView
} from 'react-native'

import {StackNavigator,NavigationActions} from 'react-navigation'

export default class CryptoCoinDashboard extends Component{

constructor(props){
    super(props)

    var inputSource= new ListView.DataSource({
        rowHasChanged:(r1,r2)=> r1!= r2  })

    this.state={
        dataSource :inputSource.cloneWithRows(['A','B'])
      
    }
 }


 render(){
     return(
        <View style={{flexDirection: 'column',width: '100%',height:'100%',alignContent:"center",backgroundColor : 'white'}}>

         <ListView 
         style = {CryptoCoinDashboard.listView} 
         renderRow = {(rowData,sectionId,rowId)=>{
            return <Text>Howdy</Text>
         }}  
         dataSource= {this.state.dataSource} > 
         </ListView>
        </View>
     )
 }
}//end of class

const CryptoDashboardStyle = StyleSheet.create({
    listView:{

    }
});
