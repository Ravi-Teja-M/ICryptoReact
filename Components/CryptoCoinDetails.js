import React,{Component} from 'react'
import 
 {  View,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator,
      
} from 'react-native'
import applogo from '../assets/images/icon_.png'

import {CryptoIcon} from '../Utils/CryptoIconHelper'
import {StackNavigator,NavigationActions} from 'react-navigation'
import CryptoServiceHandler from '../Networking/CryptoServiceHandler'

export default class CryptoCoinDetails extends Component {

    static navigationOptions = {
        title: 'Coin Details',
      };
    

    constructor(props){
        super(props)
        
        this.state = {
            coinData: null
        }

        const {params} = this.props.navigation.state
        if(params && params.coinDetails){
            this.state= {
                coinData : params.coinDetails
            }
        } else {
            console.log('failed to fetch details of coin')
        }
     }

     render(){
         //  style={CoinDetailsStyle.}
        return(
            <View> 
                <View >
                    <Text style={CoinDetailsStyle.marketCap} > Market Cap : {this.state.coinData.market_cap_usd}</Text>
                </View>
                
                <View style={CoinDetailsStyle.coinSummaryContainer} >
                    <View style={{flex:1}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image style={CoinDetailsStyle.coinIcon} source={CryptoIcon.getIconUrl(this.state.coinData.rank)}></Image>
                            <Text style={{marginLeft: 8, fontFamily: 'arial',fontWeight:'bold',fontSize: 24,color:'grey'}}>({this.state.coinData.symbol})</Text>
                        </View>
                        <Text style={CoinDetailsStyle.coinTitle} >{this.state.coinData.name}</Text>
                    </View>
                    <View style={{flex:1, flexDirection:'column'}}>
                    <Text style={CoinDetailsStyle.marketPriceLabel}>${this.state.coinData.price_usd} <Text style={{fontSize: 18,color:'grey'}}>USD</Text> </Text>
                    <Text style={CoinDetailsStyle.changeInPercent} >({this.state.coinData.percent_change_24h}%)</Text>
                    <Text style={CoinDetailsStyle.bitcoinVolume} >{this.state.coinData.price_btc} BTC</Text>
 
                    </View>
                </View>
            </View>
        )
     }

     setCoinDetails(coinData){
      }

}

const CoinDetailsStyle = StyleSheet.create({

    marketCap:{

    },
    marketCapLabel:{
        color:'black'
    },
    coinSummaryContainer:{
        padding:10,
        flexDirection:'row'
    },
    coinIcon:{
        height:50,
        width:50,
       
    },
    coinTitle :{
        fontFamily: 'arial',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 24,
        marginTop: 6
    }
    ,
    marketPriceLabel: {
        fontFamily: 'arial',
        fontStyle: 'normal',
        fontSize: 26,
        marginTop: 2,
        
    },
    changeInPercent :{
        fontFamily: 'arial',
        fontStyle: 'normal',
         color: 'green',
        fontSize: 22,
        marginTop: 2
    },
    bitcoinVolume:{
        fontFamily: 'arial',
        fontStyle: 'normal',
        color: 'grey',

        fontSize: 18,
        marginTop: 2
    },

    marketCapSection:{

    },
    marketCapSectionLabel:{

    },
    lastUpdatedLabel:{

    },
    totalSupplyLabel:{

    }




})
