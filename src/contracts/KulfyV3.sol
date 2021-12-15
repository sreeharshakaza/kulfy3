//Contract based on [https://docs.openzeppelin.com/contracts/3.x/erc721](https://docs.openzeppelin.com/contracts/3.x/erc721)
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract KulfyV3 is ERC721URIStorage, Ownable {
    //string public name = "KulfyV3";
    mapping(uint256 => Kulfy) public kulfies;
    using Counters for Counters.Counter;
    Counters.Counter public tokenIds;

    constructor() public ERC721("KULFY", "KUL") {}

    struct Kulfy {
        uint256 id;
        string description;
        string tokenURI;
        string assetURI;
        uint256 tipAmount;
        address payable author;
    }

    event KulfyCreated(
        uint256 id,
        string hash,
        string description,
        uint256 tipAmount,
        address payable author
    );

    event KulfyTipped(
        uint256 id,
        string hash,
        string description,
        uint256 tipAmount,
        address payable author
    );

    function mintNFT(
        address payable recipient,
        string memory _tokenURI,
        string memory _assetURI,
        string memory _description
    ) public returns (uint256) {
        tokenIds.increment();

        uint256 newItemId = tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, _tokenURI);
        kulfies[newItemId] = Kulfy(
            newItemId,
            _description,
            _tokenURI,
            _assetURI,
            0,
            recipient
        );

        return newItemId;
    }

    function tipKulfyOwner(uint256 _id) public payable {
        require(_id > 0 && _id <= tokenIds.current());
        Kulfy memory _kulfy = kulfies[_id];

        address payable _author = _kulfy.author;

        _author.transfer(msg.value);

        _kulfy.tipAmount = _kulfy.tipAmount + msg.value;

        kulfies[_id] = _kulfy;

        emit KulfyTipped(
            _id,
            _kulfy.tokenURI,
            _kulfy.description,
            _kulfy.tipAmount,
            _author
        );
    }
}
