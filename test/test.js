const { assert } = require('chai')

const KulfyV3 = artifacts.require('./KulfyV3.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('KulfyV3', ([deployer, author, tipper]) => {
  let KulfyV3

  before(async () => {
    KulfyV3 = await KulfyV3.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await KulfyV3.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await KulfyV3.name()
      assert.equal(name, 'Kulfy-V3')
    })
  })

  describe('Upload Image', async () => {
    let result, imageCount;
    const hash = "abc123";

    before(async() => {
      result = await KulfyV3.uploadImage(hash, 'Image Description', { from : author})
      imageCount = await KulfyV3.imageCount()
    });

    it('Created Images', async () => {
      assert.equal(imageCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), imageCount.toNumber(), 'id is correct')
      assert.equal(event.hash, hash, 'hash is correct')
      assert.equal(event.description, 'Image Description', 'Description is correct')
      assert.equal(event.author, author, 'Author is correct')
    })
  })
})