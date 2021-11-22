# kulfy3

## Set Privatekey information local .env file


    copy .env_example to .env 
    export private key from metamask
    update same as value to key PRIVATE_KEYS in .env file
    
Note: .env file is marked in .gitignore so it is not expected to be committed to git to avoid accidental leakage of sensitive private keys in github repo 

## Steps to deplay contracts to Harmony 1

    npm install --save-dev @truffle/hdwallet-provider
    Setup Harmony Test Net in MetaMask
        Network Name: Harmony Test Net
        New RPC URL:
        https://api.s0.b.hmny.io
        Chain ID: 1666700000
        Currency Symbol: ONE
        Block Explorer URL: https://explorer.pops.one/
    Load Test One Coins to Meta Mask account using below URL
    https://faucet.pops.one/

    Update truffule-config.js with your metamask account private key
    Run:
    truffle compile
    truffle deploy --network testnet
