pragma solidity ^0.4.11;
contract lenderAgreementRegistar {
    /*mapping from lender and borrower to contract addresses*/
    mapping (address => address[]) public agreements;
    address owner;
    
    event AgreementCreated(address indexed _agreement, address indexed _lender, address indexed _borrower, bytes32 _description);

    function lenderAgreementRegistar() {
        owner = msg.sender;
    }

    function createAgreement(address _lender, address _borrower, bytes32 _description) {
        lenderAgreement agreement = new lenderAgreement(_borrower, _lender, _description);
        agreements[_lender].push(agreement);
        agreements[_borrower].push(agreement);
        AgreementCreated(agreement, _lender, _borrower, _description);
    }
}


contract lenderAgreement {
    /* Define variable owner of the type address*/
    address public lender;
    address public borrower;
    address owner;
    bytes32 public description;
    enum Statuses { Created, Accepted, Declined, Returned }
    Statuses public status = Statuses.Created;
    
    event AgreementAccepted();
    event AgreementDeclined();
    event AgreementReturned();
    
    /* this function is executed at initialization and sets the owner of the contract */
    function lenderAgreement(address _borrower, address _lender, bytes32 _description) { 
        owner = msg.sender;
        lender = _lender;
        borrower = _borrower;
        description = _description;
    }
    
    /*Accept contract*/
    function acceptAgreement()  {
        if (msg.sender != borrower)
            throw;
        if (status != Statuses.Created)
            throw;
            
        status = Statuses.Accepted;
        AgreementAccepted();
    }
    
    function declineAgreement() {
        if (msg.sender != borrower && msg.sender != lender)
            throw;
        if (status != Statuses.Created)
            throw;
            
        status = Statuses.Declined;
        AgreementDeclined();
    }
    
    function returnAgreement() {
        if (msg.sender != lender)
            throw;
        if (status != Statuses.Accepted)
            throw;
        
        status = Statuses.Returned;
        AgreementReturned();
    }
    
    /*Do not allow sending ether */
    function () {
        throw;
    }
    
}