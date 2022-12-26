import React, {Component} from 'react'
import Web3 from 'web3'
import logo from './logo.svg';
import './App.css';

// add a new comment
//import votingArtifact from "../../build/contracts/Voting.json";
//1.) start ganache (include new DNS)
//2.) update truffle-config wtih dns
//2.) deploy contract
//3.) copy over new Voting
//4.) update DNS in DAPP
//5.) npm start
class App extends Component {
        componentWillMount(){
                this.loadBlockchainData()
        }

  async loadBlockchainData(){
        const web3 = new Web3(new Web3.providers.HttpProvider("http://ec2-35-87-55-230.us-west-2.compute.amazonaws.com:8545"))
         //this.setState( { web3 } )
         var account;
         const accounts  = await web3.eth.getAccounts()
         console.log(accounts)
             web3.eth.getAccounts().then((f) => {
             account = f[0];
         })

         //just copy the json file to the src directory
         const networkId = await web3.eth.net.getId();
         this.setState( { account : accounts[0] })
     console.log(account);
         let jsonData = require('./SimpleContract.json');
         var networkKey =  Object.keys(jsonData['networks'])[Object.keys(jsonData.networks).length-1]
         let contract = new web3.eth.Contract(jsonData.abi);
         contract.options.address = jsonData['networks'][networkId]["address"]
         let balanceContract = await web3.eth.getBalance(contract.options.address)
         let  balanceOwner  = await web3.eth.getBalance(accounts[0])

         console.log("before send")
         console.log(balanceContract)
         console.log(balanceOwner)

         let ans1 = await  contract.methods.sendMoneyToContract().send({from: accounts[0], value: web3.utils.toWei('10', 'ether')}).then((f) => console.log(f))
         let postbalanceContract = await web3.eth.getBalance(contract.options.address)
         let postBalance = await web3.eth.getBalance(accounts[0])

         console.log("after send")
         console.log(postbalanceContract)
         console.log(postBalance)

         let ans = await contract.methods.withdrawAll(accounts[0]).send({ from: accounts[0]})
         let postwithdrawbalanceContract = await web3.eth.getBalance(contract.options.address)
      let postwithdrawBalance = await web3.eth.getBalance(accounts[0])


         console.log("after withdraw")
         console.log(postwithdrawbalanceContract)
         console.log(postwithdrawBalance)







  }

     constructor(props){
                super(props)
                console.log("constructor")
                this.state = {
                        account: '',
                        loading: true,
                        message: ''
                }
     }

     setHandler = (event) => {
         event.preventDefault();
    console.log('sending ' + event.target.setText.value + ' to the contract');
                this.state.contract.methods.set(event.target.setText.value).send({ from: this.state.account });
        }

        getCurrentVal = async () => {
                 let val = await this.state.contract.methods.get().call(console.log);
                 this.setState( { message : val })
         }



render(){

        return (
                <div>

                <h5> Test update to contract</h5>
                </div>
        );
}
}



export default App;
                                   
