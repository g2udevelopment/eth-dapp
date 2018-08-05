Template.dashboard.onCreated(function() {
  this.mainAccount = new ReactiveVar('');
  EthBlocks.init();
});

Template.dashboard.helpers({
  latestBlockNumber() {
    return EthBlocks.latest.number;
  }
});

