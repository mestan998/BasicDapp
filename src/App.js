import React, { useState, useEffect } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.sol";
import getWeb3 from "./getWeb3";
import Connection from "./connection";

import "./App.css";

const App = () => {
  const [web3, setWeb3] = useState(undefined)
  const [accounts, setAccounts] = useState(undefined)
  const [contract, setContract] = useState(undefined)

  useEffect (() => {
    
    const init = async() => {
        // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );    

      setWeb3(web3)
      setAccounts(accounts)
      setContract(contract)
    }
    init()

  },[])

    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <Connection />
      </div>
    );
}

export default App;
