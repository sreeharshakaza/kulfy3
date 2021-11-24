pragma solidity ^0.5.0;

contract KulfyV3 {
    string public name = "Kulfy-V3";
    mapping(uint256 => Kulfy) public kulfies;
    uint256 public kulfyCount = 0;

    struct Kulfy {
        uint256 id;
        string description;
        string hash;
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

    function uploadKulfy(string memory _kulfyHash, string memory _description)
        public
    {
        //Add some validations
        require(bytes(_kulfyHash).length > 0);
        require(bytes(_description).length > 0);
        require(msg.sender != address(0x0));

        kulfyCount++;
        kulfies[1] = Kulfy(kulfyCount, _description, _kulfyHash, 0, msg.sender);
        emit KulfyCreated(kulfyCount, _kulfyHash, _description, 0, msg.sender);
    }

    function tipKulfyOwner(uint256 _id) public payable {
        require(_id > 0 && _id <= kulfyCount);
        Kulfy memory _kulfy = kulfies[_id];

        address payable _author = _kulfy.author;

        address(_author).transfer(msg.value);

        _kulfy.tipAmount = _kulfy.tipAmount + msg.value;

        kulfies[_id] = _kulfy;

        emit KulfyTipped(
            _id,
            _kulfy.hash,
            _kulfy.description,
            _kulfy.tipAmount,
            _author
        );
    }
}
