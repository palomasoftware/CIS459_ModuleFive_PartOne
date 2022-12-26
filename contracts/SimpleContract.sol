pragma solidity 0.5.16;

// Store a single data point and allow fetching/updating of that datapoint
contract SimpleContract {


    // owner of this contract
    address public contractOwner;

    // constructor is called during contract deployment
    constructor() public{
        // assign the address that is creating
        // the transaction for deploying contract
        contractOwner = msg.sender;
    }

    function sendMoneyToContract() public payable {}

    function withdrawAll(address payable _to) public {
        require(contractOwner == _to);
        _to.transfer(address(this).balance);
    }
}

