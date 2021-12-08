const KulfyV3 = artifacts.require("KulfyV3");
const KulfyNFTs = artifacts.require("KulfyNFTs");


module.exports = function(deployer) {
  deployer.deploy(KulfyV3);
};

