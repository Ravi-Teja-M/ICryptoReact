 
 export default class CryptoServiceHandler{
    

    getCoinTickerData(success, failure){

         var crypt = require('../Utils/CryptoConstants')
          fetch(crypt.CryptoConstants.getTickerUrl()).then(function(resp){
            console.log('success');
            return  resp.json()
        }, 
        function(error){
            console.log('error');
            failure({response:500})
            }
        ).then((responseObject)=>{
           // console.log(JSON.stringify(responseObject));
            success({response:responseObject});
        })
    }
}