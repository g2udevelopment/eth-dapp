import agreementObserver from '../../lib/observeAgreement';

Template.agreements.onCreated(function() {
  agreementObserver.initWatch();
  EthAccounts.init();
});

Template.agreements.helpers({
    agreements() {
      return Agreements.find();  
    },
    isCreated() {
      return this.agreement.status === 'Created';
    },
    isAccepted() {
      return this.agreement.status === 'Accepted';
    },
    myAccounts() {
    return EthAccounts.find().fetch();
  }
}); 

Template.agreements.events({
  'click #btnAdd'(event, instance) {
    let from = EthAccounts.find().fetch()[0];
    // increment the counter when button is clicked
    let toAddress = $('.dapp-address-input > input').val();
    let description = $('#description').val();
   
    lenderRegistarInstance.createAgreement(from.address,toAddress,web3.fromAscii(description),{gas:1737910, from:from.address},(err,result) => {
      console.log(result);
      console.log(err);
    });
  },
  'click .btnAccept'(event,instance) {
    let from = EthAccounts.find().fetch()[0];
    let agreementInstance = agreementContract.at(this.agreement.contract);
    agreementInstance.acceptAgreement({gas:1737910, from:from.address},(err,result) => {
    });
  },
  'click .btnDecline'(event,instance) {
    let from = EthAccounts.find().fetch()[0];
    let agreementInstance = agreementContract.at(this.agreement.contract);
    agreementInstance.declineAgreement({gas:1737910, from:from.address},(err,result) => {
    });
  },
  'click .btnReturned'(event,instance) {
    let from = EthAccounts.find().fetch()[0];
    let agreementInstance = agreementContract.at(this.agreement.contract);
    agreementInstance.returnAgreement({gas:1737910, from:from.address},(err,result) => {
    });
  }
});