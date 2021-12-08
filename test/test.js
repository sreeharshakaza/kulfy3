const { assert } = require('chai')

const KulfyNFTs = artifacts.require('./KulfyNFTs.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('KulfyNFTs', ([deployer, author, tipper]) => {
  let kulfyNFTs

  before(async () => {
    kulfyNFTs = await KulfyNFTs.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await kulfyNFTs.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
       console.log('address of Kulfy smart contract is ',address)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await kulfyNFTs.name()
      assert.equal(name, 'KULFY')
    })
  })


 describe('Minting', async () => {
    let result, imageCount
    const hash = 'https://ipfs.io/ipfs/QmWfwAaASNnTDZd6J5UGPwo3yUYXo7dWPgh6cTQMRh6KtQ'

    before(async () => {

      console.log(" author ",author);
      result = await kulfyNFTs.mintNFT( author,hash)
    })

   it('has a name', async () => {
      console.log('result for mint ',result);
      //assert.equal(name, 'KULFY')
    })



  })


})

