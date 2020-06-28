const transactionsModels = require('../models/Transaction');

  
exports.createTx = (req, res, next ) => {

  const ethAddress = req.body.ethAddress

  const valido = isAddress(ethAddress)
  if(valido==true){
    transactionsModels.findOne({ethAddress, where: {ethAddress:ethAddress}})
  .then(tx => {
    if(tx) {
 //   this.atualizaSaldo(req)
      res.send({success: false, message: 'Endereco ETH ja cadastrado'})
    } else {

      const hash = ethAddress;

      newBzlAddress()
      .then((address)=>{
          const bzlAddress = address.data.result
          const updated = 0;

            transactionsModels.create({
              updated:updated,
              bzlAddress : bzlAddress,
              ethAddress : ethAddress
            })
          .then((transaction)=>{
            if(transaction) {
              res.send({success: true, message: 'ok, cadastrado', hash: hash, enderecoBzl:bzlAddress})
            } else {
              res.send({success: false, message: 'algum erro aconteceu'})
          }
      })
      .catch((error) => next(error))
    })
    .catch((error) => next(error)) 
    }
  })
  .catch((error) => next(error))
} else {
  res.send({success: false, message: 'Endereco ETH invalido'})
  }
};


exports.atualizaSaldo=(req, res, next) => {

  if(req.body.ethAddress) {

    const ethAddress = req.body.ethAddress
    
    transactionsModels.findOne({ethAddress, where: {ethAddress:ethAddress}})
    .then(tx => {
      if(tx) {
        const bzlAddress = tx.bzlAddress
        const pay = tx.pay
        const updated = tx.updated

        req.body.bzlAddress = bzlAddress
        req.body.updated = updated

  //     if(bzlAddress) {
      cachExplorer(bzlAddress)
      .then((amount)=>{
        const update = updated + 1;
        const amountBzl = amount.data;
        const amountReak = amountBzl*5;

  
          if(amountBzl>0){
            transactionsModels.update(
              {
                updated:update,
                amountBzl : amountBzl,
                amountReak : amountReak
              },
              {where: {bzlAddress:bzlAddress}}
            )
            .then((update)=>{
              if(update){
                res.send({success: true, message: 'Atualizado',enderecoBzl:bzlAddress, enderecoEth:ethAddress, amountBzl:amountBzl, amountReak:amountReak, alreadyPay:pay})
              } else {
                res.send({success: false, message: 'algum erro aconteceu'})
              }
            })
          } else {
            transactionsModels.update(
              {
                updated:update,
              },
              {where: {bzlAddress:bzlAddress}}
            )
            .then((update)=>{
              if(update){
                res.send({success: true, message: 'Atualizado',enderecoBzl:bzlAddress, enderecoEth:ethAddress, amountBzl:amountBzl, amountReak:amountReak, alreadyPay:pay})
              } else {
                res.send({success: false, message: 'algum erro aconteceu'})
              }
            })
          }
    })
      } else {
        res.send({success: false, message: 'EthAddress nao encontrado'})
      }
    }) 
  } else {
    res.send({success: false, message: 'Falta o EthAddress'})
  }
}

exports.updateAll = (req, res, next)=>{
  transactionsModels.findAll({where : { ethAddress: {
    ne: null } , Pay : null}
  })
  .then(tx => { 
    var array = tx;
    tx.forEach(element => {
      array = element.dataValues;
    var  bzlAddress = array.bzlAddress;
    var   ethAddress = array.ethAddress;
    var updated = array.updated;

      cachExplorer(bzlAddress)
      .then((amount)=>{
        const update = updated + 1;
        const amountBzl = amount.data;
        const amountReak = amountBzl*5;

          if(amountBzl>0){
            transactionsModels.update(
              {
                updated:update,
                amountBzl : amountBzl,
                amountReak : amountReak
              },
              {where: {bzlAddress:bzlAddress}}
            )
            .then((update)=>{
              if(update){
                console.log("Updated" + ethAddress)
              } else {
                res.send({success: false, message: 'algum erro aconteceu'})
              }
            })
          } else {
            transactionsModels.update(
              {
                updated:update,
              },
              {where: {bzlAddress:bzlAddress}}
            )
            .then((update)=>{
              if(update){
                console.log("Updated" + ethAddress)
              } else {
                res.send({success: false, message: 'algum erro aconteceu'})
              }
            })
          }
        })
      })
      res.end("atualizados todos")
    })
  }

exports.statusTotal = (req, res, next)=>{
    transactionsModels.findAll({where : { amountBzl: {
      ne: null }}
    })
    .then(tx => {   
      var array = tx;
      var bzltotal = array.map((amount) => parseFloat(amount.amountBzl)).reduce((total, amount) => total + amount,0);
      var reaktotal = array.map((amount) => parseFloat(amount.amountReak)).reduce((total, amount) => total + amount,0);

      var contas = array.map((contas)=> contas.bzlAddress).length;

      res.send({success: true, TotalContas:contas, TotalBZl: bzltotal, TotalReakoin: reaktotal})
      })
    .catch((error) => next(error))
}


exports.unPaid = (req, res, next)=>{
  transactionsModels.findAll({where : { amountBzl: {
      ne: null }, Pay : null}
    })
    .then(tx => {   
        var array = tx;
      res.send({success: true, array: array})
    })
  .catch((error) => next(error))
}


exports.showAll = (req, res, next)=>{
  transactionsModels.findAll({where : { bzlAddress : {
   ne: null }}
   })
  .then(tx => {   
    var array = tx;
    res.send({success: true, array: array})
  })
  .catch((error) => next(error))
}


exports.alreadyPay=(req, res, next) => {

  if(req.body.ethAddress) {
    const ethAddress = req.body.ethAddress
    transactionsModels.findOne({ethAddress, where: {ethAddress:ethAddress}})
    .then(tx => {
      if(tx) {
        const alreadypay = 1;
            transactionsModels.update(
              {
                pay : alreadypay
              },
              {where: {ethAddress:ethAddress}}
            )
            .then((update)=>{
              if(update){
                res.send({success: true, message: 'Atualizado'})
              } else {
              res.send({success: false, message: 'algum erro aconteceu'})
           }
        })
      } else {
        res.send({success: false, message: 'EthAddress nao encontrado'})
      }
    }) 
  } else {
    res.send({success: false, message: 'Falta o EthAddress'})
  }
}
 