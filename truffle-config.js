require('babel-register');
require('babel-polyfill');
require('dotenv').config();

const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = '0x4CC7F1815F7538e1792DC4E86f21d11C0aAC241d';
const privateKeys = process.env.PRIVATE_KEYS || ""


module.exports = {
  networks: {
    testnet: {
      provider: () => new HDWalletProvider(
        privateKeys.split(',') // Array of account private keys
        , 'https://api.s0.b.hmny.io'),
      network_id: 1666700000,
      skipDryRun: true,
    },
    testnetHar: {
      provider: () => {
        if (!privateKeyTest.trim()) {
          throw new Error(
            'Please enter a private key with funds, you can use the default one'
          );
        }
        return new HDWalletProvider({
          privateKeys: [privateKeyTest],
          providerOrUrl: 'https://api.s0.b.hmny.io',
        });
      },
      network_id: 1666700000,
    },
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version:"0.8.7",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}


