function initAgreementWatch(contractAddress) {
        let agreementInstance = agreementContract.at(contractAddress);
        let accEvents = agreementInstance.AgreementAccepted();
        accEvents.watch((err, result) => {
            Agreements.update(contractAddress, {$set:{
                   status: 'Accepted'                
            }});
            
        });
        let decEvents = agreementInstance.AgreementDeclined();
        decEvents.watch((err, result) => {
            Agreements.update(contractAddress, {$set:{
                   status: 'Declined'                
            }});
        });
        let retEvents = agreementInstance.AgreementReturned();
        retEvents.watch((err, result) => {
            Agreements.update(contractAddress, {$set:{
                   status: 'Returned'                
            }});
        });
    }

export default {
    initWatch: function() {
        
        let myevents = lenderRegistarInstance.AgreementCreated();
        var myPrimaryAccount = EthAccounts.find().fetch()[0];
        //console.log(myPrimaryAccount);
        
        

        for(i=0;; i++) {
                var contractAddress = lenderRegistarInstance.agreements(myPrimaryAccount.address,i);
                if(contractAddress=="0x") break;
                
                var agreementInstance = agreementContract.at(contractAddress);
                var lender = agreementInstance.lender();
                var borrower = agreementInstance.borrower();
                var desc = agreementInstance.description();
                var status = agreementInstance.status();
                console.log(status.toNumber());
                var statuses = ['Created','Accepted','Declined','Returned'];
                Agreements.upsert(contractAddress,{
                   contract: contractAddress,
                   from: lender,
                   to: borrower,
                   description: web3.toAscii(desc),
                   status: statuses[status]
               })
             initAgreementWatch(contractAddress);
        } 


        myevents.watch((err,result) => {
            let contractAddress = result.args._agreement;

              Agreements.upsert(contractAddress,{
                   contract: contractAddress,
                   from: result.args._lender,
                   to: result.args._borrower,
                   description: web3.toAscii(result.args._description),
                   status: 'Created'
               })
             initAgreementWatch(contractAddress);
               
            });
    },
}