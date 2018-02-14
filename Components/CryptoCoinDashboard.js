import React,{Component} from 'react'
import 
 {  View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Image,
    ActivityIndicator,
    NavigatorIOS,
    ListView,
    TouchableHighlight
} from 'react-native'

import {StackNavigator,NavigationActions} from 'react-navigation'
import CryptoServiceHandler from '../Networking/CryptoServiceHandler'

export default class CryptoCoinDashboard extends Component {

constructor(props){
    super(props)
     var inputSource= new ListView.DataSource({
        rowHasChanged:(r1,r2)=> r1!= r2  })

    this.state={
        dataSource :inputSource.cloneWithRows([]),
        isProgressShown: false
      }
 }

 componentDidMount(){
    this.invokeTickerService() 
 }

 invokeTickerService(){

    this.setState((prev,props)=>{
        isProgressShown: true;
    })

    var serviceHandler = new CryptoServiceHandler()
    serviceHandler.getCoinTickerData(function(result){
        let response = result.response
        if(response){
        this.setState({
            dataSource :this.state.dataSource.cloneWithRows(response)
        })
        console.log('json of data' + JSON.stringify(this.state.dataSource));
        this.setState((prev,props)=>{
            isProgressShown: false;
        })
    }}.bind(this),
    function(error){
        this.setState((prev,props)=>{
            isProgressShown: false;
        })
    }.bind(this) ) 
}
 

 render(){
     const cyptoIcon = require('../Utils/CryptoIconHelper')
      return(
        <View style={{flexDirection: 'column',width: '100%',height:'100%',alignContent:"center",backgroundColor : 'white', paddingTop:10}}>
        <Text  style={{alignContent:'center' , alignSelf:'center', color:'red' , fontSize:20 } }> Crypto Coin Price </Text>

        <ListView 
         
         renderRow = {(rowData,sectionId, highlightRow)=>{
           return( 
            <TouchableHighlight onPress={ ()=>{this.onItemClick(rowData,sectionId, highlightRow) } }>
           <View  style={[{flexDirection:'row'},CryptoDashboardStyle.rowStyle]}>
           <Text style={CryptoDashboardStyle.rankingLabel} >Rank # {rowData.rank}  </Text>
            <Image style={CryptoDashboardStyle.cryptoIcon} source={cyptoIcon.CryptoIcon.getIconUrl(rowData.id)}/> 
            <View style={CryptoDashboardStyle.rowInfoLabels}>
                <Text style={CryptoDashboardStyle.rowiLabel} >{rowData.name} </Text>
                <Text style={CryptoDashboardStyle.rowiLabel} >{rowData.symbol} </Text>
                <Text style={CryptoDashboardStyle.rowiLabel} >Price $.{rowData.price_usd} </Text>
                <Text style={CryptoDashboardStyle.rowiLabel} > % Change in 24hrs {rowData.percent_change_24h}% </Text>
             </View>
        </View> 
        </TouchableHighlight>
        )
         }}  
         dataSource= {this.state.dataSource} > 
         </ListView>
          </View>
     )
 }

 onItemClick(rowData,sectionId,rowId, highlightRow){
 
    this.props.navigation.navigate('CryptoCoinDetails',{
        coinDetails: rowData  
    })
 }

}//end of class

const CryptoDashboardStyle = StyleSheet.create({
    listView:{

    },
    rowStyle:{
        borderBottomWidth: 1,
        borderColor: 'grey',
    },
    cryptoIcon:{
        flex: 0.3,
        height: '100%',
        width: '100%',
       
         resizeMode: Image.resizeMode.center,
    }
    ,
    rowInfoLabels:{
        flex: 0.6,
        flexDirection:'column',
        padding:2,
        backgroundColor:'white',
         
        width:'100%',
       
    },
    rowiLabel:{
        marginTop: 3,
        padding: 2
    },
    rankingLabel:{
        alignSelf: 'center',
        flex: 0.1,
        padding: 2,
        paddingLeft:10
    }
});
