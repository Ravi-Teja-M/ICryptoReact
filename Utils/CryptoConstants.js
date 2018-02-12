   var CryptoConstants = {
    BASE_URL: 'https://api.coinmarketcap.com/v1/',
   
    getTickerUrl : function(){
            return this.BASE_URL + 'ticker/';
    },
 
}

module.exports.CryptoConstants = CryptoConstants
 