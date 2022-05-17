// deploy code will go here
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {interface,bytecode} = require('./compile')

const provider = new HDWalletProvider(
    'stand blossom fiscal breeze bulb stamp rack outer neither capital bunker prepare',
    'https://rinkeby.infura.io/v3/a580a2827ef04c0c8d9e4d2a58bc2a94',

);

const web3 = new Web3(provider);

let accounts
const deploy = async ()=>{
     accounts = await web3.eth.getAccounts();
     console.log('Attempting to deploy from ', accounts[0]);
     const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data:bytecode,arguments:['hi there']})
        .send({gas:'1000000',from: accounts[0]});

        console.log('contract deployed to',result.options.address);
        provider.engine.stop();

}
