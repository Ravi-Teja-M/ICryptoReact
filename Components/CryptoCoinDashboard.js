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
     order =  [{
            rankAscending: true,
            coinNameAscending: false,
            percentChangeAscending:false 
           },
           {
            rankAscending: false,
            coinNameAscending: true,
            percentChangeAscending:false 
           },
           {
            rankAscending: false,
            coinNameAscending: false,
            percentChangeAscending:true 
           }
        ];

    static navigationOptions = {
        title: 'Trending Crypto Coins',
    };
      
constructor(props){
    super(props)
     var inputSource= new ListView.DataSource({
        rowHasChanged:(r1,r2)=> r1!= r2  })

    this.state={
        data: [],
        dataSource :inputSource.cloneWithRows([]),
        isProgressShown: false,
        showPlaceHolder: true,
        placeholderMsg:'loading...',
        filter: {
            clickedFilterPosition : 0,
            sortOrderLowToHigh: true  
        }
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
            data:response,
            dataSource :this.state.dataSource.cloneWithRows(response)
           })
           this.setState( {
            showPlaceHolder: (this.state.dataSource.length <= 0)
        })

        console.log('json of data' + JSON.stringify(this.state));
        this.setState((prev,props)=>{
            isProgressShown: false;
        })
    }}.bind(this),

    function(error){
        this.setState((prev,props)=>{
           return{ isProgressShown: false}
        })

        this.setState((prev,props)=>{
           return{ placeholderMsg: 'Error loading data..kindly retry'}
        })
    }.bind(this) ) 
}

sortDataSetByState(){

    var data = this.state.data;
    if(!data || data.length <= 0){
        return;
    }
    switch(this.state.filter.clickedFilterPosition){

        case 0:
        let sortedRank =  data.sort(function(prevObj, currentObject){

            if(this.state.filter.sortOrderLowToHigh)
            {
                 return (prevObj.rank > currentObject.rank )
              }
            else{
                return (prevObj.rank < currentObject.rank )
            }
        }.bind(this))

           console.log('sorted '+ JSON.stringify(sortedRank))

           this.setState({
            //data:sortedRank,
           // dataSource :this.state.dataSource.cloneWithRows(sortedRank)

           data:[],
            dataSource :this.state.dataSource.cloneWithRows([])
           })
            
        break;

        case 1:
        this.setState({
            data:sortedRank,
            dataSource :this.state.dataSource.cloneWithRows(sortedRank)

            
           })
            
        break;

        case 2: 
        break;
    }
}

 render(){
      const cyptoIcon = require('../Utils/CryptoIconHelper')
      return(
        <View style={{flex:1, flexDirection: 'column',width: '100%',height:'100%'  ,justifyContent: 'center',backgroundColor : 'white', paddingTop:10}}>
        {
         (this.state.showPlaceHolder) ? (<Text style={CryptoDashboardStyle.loadingPlaceholder}>{this.state.placeholderMsg}</Text>):
        (
         <View style={{flex:1, flexDirection: 'column'}}>
             <View style={[CryptoDashboardStyle.filterParentStyle ]}>
                <Text style={[CryptoDashboardStyle.filterItem,{ flex: 0.2,}]} onPress={()=>{this.onFilterClicked(0)}} >Rank ^ </Text>
                <Text style={[CryptoDashboardStyle.filterItem,{ flex: 0.2,}]}  > </Text>
                <Text style={[CryptoDashboardStyle.filterItem,{ flex: 0.4}]} onPress={()=>{this.onFilterClicked(1)}}>Coin name</Text>
                <Text style={[CryptoDashboardStyle.filterItem,{ flex: 0.2,}]} onPress={()=>{this.onFilterClicked(2)}}>%Change </Text>

             </View>
        <ListView style={CryptoDashboardStyle.listView}
         renderRow = {(rowData,sectionId, highlightRow)=>{
           return( 
            <TouchableHighlight onPress={ ()=>{this.onItemClick(rowData,sectionId, highlightRow) } }>
           <View  style={[{flexDirection:'row'},CryptoDashboardStyle.rowStyle,{justifyContent:'center',alignItems:'center'}]}>
           <Text style={CryptoDashboardStyle.rankingLabel} >Rank # {rowData.rank}  </Text>
            <Image style={CryptoDashboardStyle.cryptoIcon} source={cyptoIcon.CryptoIcon.getIconUrl(rowData.rank)}/> 
            <View style={CryptoDashboardStyle.rowInfoLabels}>
                <Text style={[CryptoDashboardStyle.rowiLabel,{fontWeight:'bold'}]} >{rowData.name} </Text>
                <Text style={CryptoDashboardStyle.rowiLabel} >{rowData.symbol} </Text>
                <Text style={CryptoDashboardStyle.rowiLabel} >Price $.{rowData.price_usd} </Text>
              </View>
               
             <Text  style={{flex:0.2}}  > {rowData.percent_change_24h}% </Text>
        </View> 
        </TouchableHighlight>
        )
         }}  
         dataSource= {this.state.dataSource}  > 
        </ListView></View> )
        }
          </View>
     )
 }

 onFilterClicked(viewPositionClicked){
   // alert('clicked '+ viewPositionClicked)

    this.sortDataSetByState()
 }

 onItemClick(rowData,sectionId,rowId, highlightRow){
     this.props.navigation.navigate('CryptoCoinDetails',{
        coinDetails: rowData  
    })
 }

}//end of class

const CryptoDashboardStyle = StyleSheet.create({
    filterParentStyle:{
        flexDirection:'row',
        backgroundColor:'grey',
        flex:0.04, 
           
    },
    filterItem:{
       paddingLeft:2,
        alignSelf: 'center',
      },
    loadingPlaceholder:{
        flex: 1,
        width:'100%',
        height:'100%',
        color:'black',
        fontSize: 25,
        alignSelf:'center'
    },

    listView:{
        flex: 0.9,
    },
    rowStyle:{
        borderBottomWidth: 1,
        borderColor: 'grey',
    },
    cryptoIcon:{
        flex: 0.3,
        height: 32,
        width: 32,
       
         resizeMode: Image.resizeMode.center,
    }
    ,
    rowInfoLabels:{
        flex: 0.4,
        flexDirection:'column',
        padding:2,
        backgroundColor:'white',
         borderRightWidth: 1,
         borderRightColor: 'grey',
        width:'100%',
       
    },
    rowiLabel:{
        marginTop: 3,
        padding: 2,
        color:'black'
         

    },
    rankingLabel:{
        alignSelf: 'center',
        flex: 0.1,
        padding: 2,
        paddingLeft:10,
        backgroundColor:'white',
        borderRightWidth: 1,
        borderRightColor: 'grey',
    },

    dividerBorderStyle:{
        backgroundColor:'grey',
        width:2,
        height:'100%'

    }
});
