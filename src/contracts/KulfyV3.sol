//Contract based on [https://docs.openzeppelin.com/contracts/4.x/erc721](https://docs.openzeppelin.com/contracts/4.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

/// @title Kulfy Minting and Tipping Contract
/// @notice You can use this contract for Minting GIFs & Video Clips as NFTs with Tips functionality.
/// @dev All function calls are currently implemented without side effects

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract KulfyV3 is ERC721URIStorage, Ownable {
  
    /// Mapping to store Kulfys
    mapping(uint256 => Kulfy) public kulfys;

    // Auto Counter for Token Ids
    using Counters for Counters.Counter;
    Counters.Counter public tokenIds;
    
    // gas limit for transactions
    uint256 public gasLimit = 5000;

    constructor() public ERC721("KULFY", "KUL") {}

    /// Structure of hold Kulfys
    struct Kulfy {
        uint256 id;
        string kid;
        string tokenURI;
        string assetURI;
        uint256 tipAmount;
        address payable author;
    }

    /// This event is emmited when new Kulfy is created
    event KulfyCreated(
        uint256 id,
        string tokenURI,
        string assetURI,
        string kid,
        address payable author
    );

    /// This event is emmited when Tip is made
    event KulfyTipped(
        uint256 id,
        string hash,
        string kid,
        uint256 tipAmount,
        address payable author,
        address tipper
    );

    /*
     * This function is to Mint Kulfy as a NFT and setting the TokenURI
     * @param  {[type]} address payable       author [Address of the Kulfy creator]
     * @param  {[type]} string  memory        _tokenURI [IPFS URL of medadata of the Kulfy]
     * @param  {[type]} string  memory        _assetURI [IPFS URL of the actual binary asset]
     * @param  {[type]} string  memory        _kid      [KID is the unique id of Kulfy]) 
     * @return {[type]} uint256     [tokenID of the NFT in contract]
     */
    function mintNFT(
        address payable author,
        string memory _tokenURI,
        string memory _assetURI,
        string memory _kid
    ) external returns (uint256) {

        /// Increment tokenId
        tokenIds.increment();
        uint256 newItemId = tokenIds.current();

        /// calling mint function ERC 721
        _mint(author, newItemId);

        /// calling setTokenURI from ERC721URIStorage
        _setTokenURI(newItemId, _tokenURI);

        /// update mapping with new Kulfy 
        kulfys[newItemId] = Kulfy(
            newItemId,
            _kid,
            _tokenURI,
            _assetURI,
            0,
            author
        );

        /// emit Kulfy minted event
        emit KulfyCreated(newItemId,_tokenURI,_assetURI,_kid,author);

        return newItemId;
    }

    /*
     * This function is to transfer desired Tip amount from Tipper to Kulfy author
     * @param  {[type]} uint256 _id           [tokenID of the NFT in the contract ]
     * @return {[type]}                       [Transer Tip amount to creator via Internal Transfers]
     */
    function tipKulfyAuthor(uint256 _id, uint256 _gas) public payable {
        /// Check valid tokenId
        require(_id > 0 && _id <= tokenIds.current());
        /// Check that gas doesn't exceed limit
        require(_gas <= gasLimit);

        /// Load specific Kulfy based on tokenId
        Kulfy memory _kulfy = kulfys[_id];

        /// Get author/creator address
        address payable _author = _kulfy.author;

        /// Transfer Tip amount to the creator
        (bool sent, bytes memory data) = _author.call{value: msg.value, gas: _gas}("");
        require(sent, "Failed to send Ether");

        /// Add new tip to the Kulfy's total tip amount
        _kulfy.tipAmount = _kulfy.tipAmount + msg.value;

        /// Update Kulfy record
        kulfys[_id] = _kulfy;

        /// Emit Tip Event
        emit KulfyTipped(
            _id,
            _kulfy.tokenURI,
            _kulfy.kid,
            _kulfy.tipAmount,
            _author,
            msg.sender
        );
    }
    
    function changeGasLimit(uint256 newGasLimit) private {
        //change gas limit, depending on changes to the EVM
        gasLimit = newGasLimit;
    }
}
