

// contract test code will go here
const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const {interface,bytecode} = require('../compile')
const web3 = new Web3(ganache.provider())


class Car{
    park(){
        return 'stopped';
    }
    drive(){
        return 'vroom';
    }
}

let fetchedAccounts;
let inbox;
beforeEach(async ()=>{
    fetchedAccounts = await web3.eth.getAccounts();
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode,arguments:["hilol"]})
    .send({from:fetchedAccounts[0],gas:999999});
   })



describe('deplot inbox', () => { 
    it('deploys a contract',()=>{
        assert.ok(inbox.options.address);
    });
    it('has a default message',async ()=>{
        const msg = await inbox.methods.message().call();
        assert.equal(msg,'hilol')

    });
    it('can change the message',async ()=>{
        const themessage = "123";
        await inbox.methods.setMessage(themessage).send({from:fetchedAccounts[0],gas:999999});
        const msg = await inbox.methods.message().call();
        assert.equal(msg,themessage);

    });

 })