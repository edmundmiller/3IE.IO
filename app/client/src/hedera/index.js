import request from 'request'

const getBalance = accountID => {
  var formData = {
    accountID: '',
    request: '',
  }

  formData.request = 'balance'
  formData.accountID = accountID

  request.post(
    {
      url: 'http://localhost:8080',
      formData: formData,
    },
    function optionalCallback(err, response, body) {
      if (err) {
        console.log('There was an error getting the balance')
        return -1
      }

      console.log('the balance was aquired properly')
      console.log(response)
      console.log(body)

      return response
    }
  )
}
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

  request.post(
    {
      url: 'http://localhost:8080/',
      formData: formData,
    },
    function optionalCallback(err, response, body) {
      if (err) {
        return console.log(
          'An error ocurred rewarding audit with micropayment: ',
          err
        )
      }

      return console.log('The audit was successfully rewarded: ', response)
    }
  )
}

const rewardCreatorWithMicroPayment = () => {}

export default {
  rewardAuditWithMicroPayment,
  rewardCreatorWithMicroPayment,
  getBalance,
}
