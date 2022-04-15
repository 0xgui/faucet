import { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider'

function App() {
 
  const [web3Api, setWeb3Api] = useState({
    provider:  null,
    web3: null
  })

  const [account, setAccount] = useState(null)

  useEffect(() => {
    const  loadProvider = async () => {
    // with metamask we have an access to window.ethereum and window.web3
    // metamask injects a global API into the page
    // this API allows websites to request users, accounts, read data from chain,
    // sign messages and transactions etc
      const provider = await detectEthereumProvider()

      if (provider) {
      
        console.log('Ethereum successfully detected!')
        //Use if we want auto connect metamask:    provider.request({method: "eth_requestAccounts"})
        setWeb3Api({
          web3: new Web3(provider),
          provider
        })

        // From now on, this should always be true:
        // provider === window.ethereum
      
        // Legacy providers may only have ethereum.sendAsync
      }else {
      
        // if the provider is not detected, detectEthereumProvider resolves to null
        console.error('Please install MetaMask!')
      }

    }

    loadProvider()
  },[])

  useEffect (() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts() 
      setAccount(accounts[0])
    }
   web3Api.web3 && getAccount()
  }, [web3Api.web3])

  return (
  <>
  <div className="faucet-wrapper">
    <div className="faucet">
      <div className="is-flex is-align-items-center">
        <span>
          <strong className="mr-2">Account: </strong>      
        </span>
            { account ? 
            <div> {account} </div> :
              <button 
                  className="button is-link is-light mr-2"
                  onClick={() => web3Api.provider.request({method: "eth_requestAccounts"})}
              >
                Connect Wallet
              </button>
          }
            </div>
      <div className="balance-view is-size-2 my-4">
        Current Balance: 10 ETH
      </div>
      <button className="button is-primary is-light mr-2">Donate</button>
      <button className="button is-warning is-light mr-2">Withdraw</button>
    </div>
  </div>
  </>
  );
}

export default App;
