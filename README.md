# Faucet 

Faucet is a simple project to test and understand more about smart contracts in the Ethereum Network.

![faucet](/faucet.jpg "Faucet") 

## Run Faucet

First make sure that Ganache is running. After that, in the project directory, you can run the following commands:

- ```truffle migrate --reset ``` to deploy the smart contracts into the Ganache Network.

- ```npm install ``` to install the dependencies.

And finally:

- ```npm start ```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Metamask

To interact with the application Metamask is needed.
More info at https://metamask.io.

You need also to configure the Ganache network inside Metamask. [Example.](https://metamask.zendesk.com/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC)


## Ganache Network 

[Ganache](https://trufflesuite.com/ganache/) is a personal blockchain for rapid Ethereum and Corda distributed application development. 
Use Ganache across the entire development cycle; enabling you to develop, deploy, and test your dApps in a safe 
and deterministic environment.

## Truffle

To deploy the smart contract into the Ganache Chain we need [Truffle](https://trufflesuite.com/).

After installing and configuring Truffle deploy the smart contracts with:

- ```truffle migrate --reset ```

If you want to interact with the smart contract without the Faucet UI you can use:

- ```truffle console ```
