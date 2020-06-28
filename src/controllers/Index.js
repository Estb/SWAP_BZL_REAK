const crypto = require('crypto');
const axios = require("axios");
const auth = require('../config/apikey');

exports.verifyHmac = (req, res, next) => {
  
  const pubkey = req.body.pubkey
  const sign = req.headers['signature']

  if (sign){
  const secret_key = auth.secret
  const hmac = crypto.createHmac('sha512', secret_key)
  const result = JSON.stringify(req.body)
    hmac.update(result)
    const signature = hmac.digest('hex')
      if(signature != sign) {
        return res.status(401).send({ auth: false, message: 'Failed to authenticate HMAC' })
      } else {
      next()
      }
    } else {
      res.send({ auth: false, message: 'Missing Hmac' })
    }
}

cachExplorer= (bzlAddress) =>{

  return new Promise((resolve, reject) => {
    var config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
   resolve (axios.post('https://chainz.cryptoid.info/bzl/api.dws?q=getbalance&key=989cdd2e0551&a=' + bzlAddress,config))
  })
}
   

newBzlAddress= () =>{
  return new Promise((resolve, reject) => {
    var config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    var options = {
        "jsonrpc": "1.0", 
        "id":"curltest", 
        "method": "getnewaddress", 
        "params": [] 
    };
   resolve (axios.post('http://rpc:B6azUo9X0Vl7bzJw@localhost:61460',options,config))
  })
}

exports.sendReakToClient = (options) => {
  return new Promise((resolve, reject) => {
    options = [options]
    options[0]['from'] = "BMZYgSy2qiiT91aPsmh2ZfSQH3tQuHHHZs";
     loginApi()
     .then((auth)=>{
      const token = auth.data.token
      var config = {
        headers: {
          'Authorization':`Bearer ${ token }`,
          'Content-Type': 'application/json'
        }
      };
      resolve ( axios.post('http://localhost:3100/v1/transactions', options[0],config)
      .catch(err => {
        throw new Error(err);
      }))
    })
  })
}

createHash = (length) => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  return result;
}

isAddress = function (address) {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        // check if it has the basic requirements of an address
        return false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        // If it's all small caps or all all caps, return true
        return true;
    } else {
        // Otherwise check each case
        return true;
    }
};