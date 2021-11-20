require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = '0x4CC7F1815F7538e1792DC4E86f21d11C0aAC241d';
const privateKeyTest = 'd20f32bd53c439f86b80e31c74d3b344274daf8bcef6111d1e7177c10d392ce4';

module.exports = {
  networks: {
    testnet: {
      provider: () => new HDWalletProvider(privateKeyTest, 'https://api.s0.b.hmny.io'),
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
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}


