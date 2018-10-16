import request from 'request'


const rewardAuditWithMicroPayment = (contractHex, accountID, amount) => {
  var formData = {
    contractHex: '',
    accountID: '',
    request: '',
    quantity: 0,
  }

  formData.contractHex = contractHex
  formData.accountID = accountID
  formData.request = 'payment'
  formData.quantity = amount

  request.post({
    url:'http://localhost:8080/',
     formData:formData
    }, function optionalCallback(err, response, body) {

      if(err) {
        return console.log('An error ocurred rewarding audit with micropayment: ',err)
      }

      return console.log('The audit was successfully rewarded: ', response)
  })

}

const rewardCreatorWithMicroPayment = () => {

}

export default {
  rewardAuditWithMicroPayment,
  rewardCreatorWithMicroPayment
}