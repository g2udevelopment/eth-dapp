# Introductie

De lender-app is een Dapp(Distributed App). Met de app kunnen we een contract aanmaken tussen 2 partijen. Dit contract legt in de blockchain vast wat er tussen wie wordt uitgeleend.
Voor deze Dapp maken we gebruiken van de ethereum blockchain.

# Ethereum
Ethereum is een decentraal netwerk van nodes en miners, die samen een gezamelijk state (de blockchain) bijhouden. Nodes zijn verantwoorlijk voor het toevoegen en doorsturen van transacties.
Miner zijn verantwoorlijk voor het toevoegen van transacties aan een block. Ze doen dit door validaties uit te voeren op de transacties en waar nodig code uit te voeren (EVM). Dit laatste is wat
ethereum onderscheid van andere blockchain clients, het uitvoeren van code.

Binnen ethereum zijn er 2 soorten accounts. Accounts met een private key dit zijn accounts van 'mensen' en zogenaamde contracten dit zijn accounts met een public key maar zonder private key.



# Smartcontracts

Een smartcontract is stukje code dat uitgevoerd kan worden op de blockchain.

http://solidity.readthedocs.io

```
contract mortal {
    /* Define variable owner of the type address*/
    address owner;

    /* this function is executed at initialization and sets the owner of the contract */
    function mortal() { owner = msg.sender; }

    /* Function to recover the funds on the contract */
    function kill() { if (msg.sender == owner) selfdestruct(owner); }
}

contract greeter is mortal {
    /* define variable greeting of the type string */
    string greeting;

    /* this runs when the contract is executed */
    function greeter(string _greeting) public {
        greeting = _greeting;
    }

    /* main function */
    function greet() constant returns (string) {
        return greeting;
    }
}
````

# Dev en test setup

Opzetten van ontwikkel omgeving.

## Install
Controleer of je de volgende tools hebt en installeer indien nodig.

* node.js en npm
* docker for windows (let op hyper-v wordt dan ook geactiveerd)
* webpack-dev-server (npm install -g webpack-dev-server), een handig webservertje die herstart/compileert als je een bestand savet.

Voor Ethereum

* metamask for chrome
* Visual Studio Express (voor de C++ compiler die door npm wordt gebruikt om op stukjes truffle te kauwen, zie onder)  
* python 2.7.13 (npm install -g python)
* truffle (npm install -g truffle), voor communicatie met Ethereum via (Chrome's) MetaMask.


## Clone git repo
Clone de lenderapp repo https://lenderapp.visualstudio.com/_git/LenderApp
`git clone https://lenderapp.visualstudio.com/_git/LenderApp lender-app`

## Start testrpc en mongdo db via docker-compose
Voer het volgende commando uit. In de lender-app directory
`docker-compose up` er worden nu 2 containers aangemaakt een container voor de testrpc node en een container voor mongo

## Controle
Om te testen of de testrpc node werkt gebruik je het volgende commando
`curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' localhost:8545`

We voeren hier een rpc uit richting de ethereum node (in dit geval de testnode), maar dit zou ook een node kunnen zijn die met het mainnet is verbonden. Zie https://github.com/ethereum/wiki/wiki/JSON-RPC

## Metamask
Nu de testrpc draait kunnen we metamask gaan verbinden met de node.

Zet eerste het netwerk op je testrpc node. Klik hiervoor op Het ropsten testnetwork net naast het vosje links boven.
Kies dan localhost:8545

Als dit de eerste keer is klik dan op import den. Er wordt nu gevraagt om een string van 12 woorden.
Dit is de backup seed voor een zogenaamde HD-wallet (Hierachal Deterministic wallet). Gebruik de volgende seed

pig recipe two develop leave blind warfare option remove burden october tennis

Deze seed wordt ook gebruikt bij het opstarten van de testrpc node en zorgtervoor dat de keys overeen komen.


# Web3

rpc interfacing tussen ethereum node en applicatie.

https://github.com/tyleryasaka/EtherCred
https://tyleryasaka.me/blog/2017/01/14/ethereum-dapps.html

# Mongo DB
Als de mongo docker image draait kun je een mongo shell openen. Open een nieuwe cmd 
`docker exec -it <container-id> mongo` je krijgt nu een mongo shell. Kijk voor de container-id's even terug, ze werden door `docker-compose up` naar
 de console geschreven: die voor mongo is bijvoorbeeld `lenderapp_mongo_1`. 

* `use LenderApp` switch naar lender app
* `db.contracts.find({})` zoekt alle contracten
* `show collections` geef alle collecties weer