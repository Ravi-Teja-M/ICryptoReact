

 export  var CryptoIcon = function(currencyName){
    if(!currencyName){
        return null;
    }
    return `https://files.coinmarketcap.com/static/img/coins/32x32/${currencyName}.png`
 }