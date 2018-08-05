FlowRouter.route('/',{
    action: function() {
        BlazeLayout.setRoot('#appLayout');
        BlazeLayout.render('appLayout', {main: 'dashboard'});
    },
    name: 'agreementDashboard'
})