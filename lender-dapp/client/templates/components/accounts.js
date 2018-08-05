Template.accounts.onCreated(function() {
  this.mainAccount = new ReactiveVar('');
  EthAccounts.init();
});

Template.accounts.helpers({
  myAccounts() {
    return EthAccounts.find().fetch();
  }
});