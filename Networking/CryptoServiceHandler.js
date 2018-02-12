 
 export default class CryptoServiceHandler{
    

    getCoinTickerData(){

         var crypt = require('../Utils/CryptoConstants')
        console.log('cryptcryptcrypt ' +crypt.CryptoConstants.getTickerUrl());
         fetch(crypt.CryptoConstants.getTickerUrl()).then(function(resp){
            console.log('success');
            return  resp.json()
        }, 
        function(error){
            console.log('error');

            }
        ).then((responseObject)=>{
            console.log(JSON.stringify(responseObject));
        })
    }
}