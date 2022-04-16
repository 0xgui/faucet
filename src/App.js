import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider'
import {loadContract} from "./utils/load-contract";


function App() {
 
  const [web3Api, setWeb3Api] = useState({
    provider:  null,
    isProviderLoaded: false,
    web3: null,
    contract: null
  })

  const [balance, setBalance] = useState(null)
  const [account, setAccount] = useState(null)
  const [reloadBalance, reload] = useState(false)

  //Reload balance utils 
  const reloadEffect = useCallback(() => reload(!reloadBalance),[reloadBalance])

  // If account changes, execute setAccount
  const setAccountListerner = (provider) => {
   
    // to simplify just to a full window reload
    provider.on("accountsChanged", _ => window.location.reload())

    // provider.on("accountsChanged", accounts => setAccount(accounts[0]))

    // provider._jsonRpcConnection.events.on("notification", (payload) => {
    //   const { method } = payload
    //   // if metamask lock => account null
    //   if (method === "metamask_unlockStateChanged"){
    //     setAccount(null)
    //   }
    // })

   }

  useEffect(() => {
    const  loadProvider = async () => {
    // with metamask we have an access to window.ethereum and window.web3
    // metamask injects a global API into the page
    // this API allows websites to request users, accounts, read data from chain,
    // sign messages and transactions etc
      const provider = await detectEthereumProvider()

      if (provider) {
        console.log('Ethereum successfully detected!')
        setAccountListerner(provider)
        const  contract  = await loadContract("Faucet", provider)
        
        //Use if we want auto connect metamask:    provider.request({method: "eth_requestAccounts"})
        
        setWeb3Api({
          web3: new Web3(provider),
          provider,
          contract,
          isProviderLoaded: true
        })

        // From now on, this should always be true:
        // provider === window.ethereum
        // Legacy providers may only have ethereum.sendAsync
      }else {
        // if the provider is not detected, detectEthereumProvider resolves to null
        
        //setWeb3Api({...web3Api, isProviderLoaded: true})
        // to fix warning about functional update
        setWeb3Api(api => ({...api, isProviderLoaded: true}))

        console.error('Please install MetaMask!')
      }
    }

    loadProvider()
  },[])

  //Metamask Connected Account
  useEffect (() => {
    const getAccount = async () => {
      const accounts = await web3Api.web3.eth.getAccounts() 
      setAccount(accounts[0])
    }
   web3Api.web3 && getAccount()
  }, [web3Api.web3])

  //Contract Balance
  useEffect (() => {
    const loadBalance = async () => {
      const { contract, web3 } = web3Api
      const balance = await web3.eth.getBalance(contract.address) 
      //from wei to ether
      setBalance(web3.utils.fromWei(balance,"ether"))
    }
   web3Api.contract && loadBalance()
  }, [web3Api, reloadBalance])

    //Add Funds to Contract Balance
    const addFunds = useCallback( async () => {
      const { contract, web3 } = web3Api
      await contract.addFunds({
        from: account,
        value: web3.utils.toWei("1", "ether")
      })
      reloadEffect()
     }, [web3Api,account,reloadEffect])

    //Withdraw Funds from Contract Balance
    const withdrawFunds = useCallback( async () => {
      const { contract, web3 } = web3Api
      const withdrawAmount = web3.utils.toWei("0.1", "ether")
      await contract.withdraw(withdrawAmount, {
        from: account
      })
      reloadEffect()
     }, [web3Api,reloadEffect,account])


  return (
  <>
  <div className="faucet-wrapper">
    <div className="faucet">
      { web3Api.isProviderLoaded ? 
      <div className="is-flex is-align-items-center">
        <span>
          <strong className="mr-2">Account: </strong>      
        </span>
            { account ? 
            <div> {account} </div> :
              !web3Api.provider ?     
                  <>
                    <div className="notification is-warning is-size-6 is-rounded">
                    Wallet not detected! {`  `} 
                    <a target="_blank" rel="noreferrer" href="https://metamask.io">
                      Install Metamask
                    </a>
                  </div>
                  </> :
              <button 
                  className="button is-link is-light mr-2"
                  onClick={() => web3Api.provider.request({method: "eth_requestAccounts"})}
              >
                Connect Wallet
              </button>
            }
            </div> :
            <span>Loading Provider... </span>
      }
      <div className="balance-view is-size-2 my-4">
        Current Balance: {balance} ETH
      </div>
      <button
            disabled={!account}
            onClick={addFunds}
            className="button is-primary is-light mr-2">Donate 1 ETH</button>
      <button 
            disabled={!account}
            onClick={withdrawFunds}
            className="button is-warning is-light mr-2">Withdraw</button>
    </div>
  </div>
  </>
  );
}

export default App;
