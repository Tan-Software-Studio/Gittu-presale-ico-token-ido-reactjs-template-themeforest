// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract GittuPresale is Ownable {
    IERC20 public token;
    address public sellerAddress;
    uint256 public presaleTokenAmount;
    bool public presaleActive = true;
    uint256 public softCap = 10 ether;
    uint256 public hardCap = 40 ether;
    uint256 public maxTxAmount = 1000;
    uint256 public maxWalletAmount = 1000000;
    uint256 public totalSold = 0;
    uint256 public totalFund = 0 ether;

    struct Stage {
        uint256 id;
        uint256 bonus;
        uint256 price;
        uint256 start;
        uint256 end;
    }
    mapping(uint256 => Stage) public stages;
    uint256 public maxStage = 4;
    uint256 currentStageId = 0;

    // constructor
    constructor(address _token, address _seller) {
        token = IERC20(_token);
        sellerAddress = _seller;
    }

    // token buy
    function buyToken(uint256 _amount) public payable {
        require(presaleActive, "Presale is not active!");
        require(address(this).balance <= hardCap, "Hardcap limit exceeds!");
        require(_amount >= 0, "Please enter minimum token!");
        uint256 _id = getCurrentStageIdActive();
        require(_id > 0, "Stage info not available!");
        uint256 _bonus = stages[_id].bonus;
        uint256 _price = stages[_id].price;
        uint256 _start = stages[_id].start;
        uint256 _end = stages[_id].end;
        require(_start <= block.timestamp, "Presale comming soon!");
        require(_end >= block.timestamp, "Presale end!");
        require(msg.value >= (_amount * _price), "Not enough payment!");
        uint256 _weiAmount = _amount * 1 ether;
        uint256 _bonusAmount = (_amount * _bonus) / 100;
        _bonusAmount *= 1 ether;
        uint256 _totalAmount = _weiAmount + _bonusAmount;
        require(
            (totalSold + _totalAmount) <= presaleTokenAmount,
            "Presale token amount exceeds!"
        );
        require(
            _totalAmount <= (maxTxAmount * 1 ether),
            "Maximum transaction limit excceds!"
        );
        require(
            (_totalAmount + token.balanceOf(msg.sender)) <=
                (maxWalletAmount * 1 ether),
            "Maximum wallet token limit excceds!"
        );
        bool success = token.transferFrom(
            sellerAddress,
            msg.sender,
            _totalAmount
        );
        require(success, "Failed to transfer token!");
        totalSold += _totalAmount;
        totalFund += msg.value;
    }

    // update token address
    function setToken(address _token) public onlyOwner {
        require(_token != address(0), "Token is zero address!");
        token = IERC20(_token);
    }

    // update seller address
    function setSellerAddress(address _seller) public onlyOwner {
        sellerAddress = _seller;
    }

    // update presale token amount
    function setPresaleTokenAmount() public onlyOwner {
        presaleTokenAmount = token.allowance(sellerAddress, address(this));
    }

    // update presale active
    function flipPresaleActive() public onlyOwner {
        presaleActive = !presaleActive;
    }

    // update soft cap
    function setSoftCap(uint256 _softCap) public onlyOwner {
        softCap = _softCap;
    }

    // update hard cap
    function setHardCap(uint256 _hardCap) public onlyOwner {
        hardCap = _hardCap;
    }

    // update maxTxAmount
    function setMaxTxAmount(uint256 _amount) public onlyOwner {
        maxTxAmount = _amount;
    }

    // update maxWalletAmount
    function setMaxWalletAmount(uint256 _amount) public onlyOwner {
        maxWalletAmount = _amount;
    }

    // update maximum stage
    function setMaxStage(uint256 _maxStage) public onlyOwner {
        maxStage = _maxStage;
    }

    // adding stage info
    function addStage(
        uint256 _bonus,
        uint256 _price,
        uint256 _start,
        uint256 _end
    ) public onlyOwner {
        uint256 _id = currentStageId + 1;
        require(_id <= maxStage, "Maximum stage excceds!");
        require(_bonus <= 100, "Bonus should be between 0 and 100");
        require(_start > 0 && _end > 0, "Invalid date!");
        require(_start < _end, "End date smaller than start!");
        currentStageId += 1;
        stages[_id].id = _id;
        stages[_id].bonus = _bonus;
        stages[_id].price = _price;
        stages[_id].start = _start;
        stages[_id].end = _end;
    }

    // update stage info
    function setStage(
        uint256 _id,
        uint256 _bonus,
        uint256 _price,
        uint256 _start,
        uint256 _end
    ) public onlyOwner {
        require(stages[_id].id == _id, "ID doesn't exist!");
        require(_bonus <= 100, "Bonus should be between 0 and 100");
        require(_start > 0 && _end > 0, "Invalid date!");
        require(_start < _end, "End date smaller than start!");
        stages[_id].bonus = _bonus;
        stages[_id].price = _price;
        stages[_id].start = _start;
        stages[_id].end = _end;
    }

    // get current stage id active
    function getCurrentStageIdActive() public view returns (uint256) {
        uint256 _id = 0;
        if (currentStageId == 0) {
            _id = 0;
        } else {
            for (uint256 i = 1; i <= currentStageId; i++) {
                if (
                    (block.timestamp >= stages[i].start) &&
                    (block.timestamp <= stages[i].end)
                ) {
                    _id = i;
                }
            }
            if (_id == 0) {
                _id = currentStageId;
            }
        }
        return _id;
    }

    // withdraw funds
    function withdrawFunds() public onlyOwner {
        require(softCap <= address(this).balance, "Smaller than Softcap!");
        require(hardCap == address(this).balance, "Not equal to Hardcap!");
        require(
            payable(msg.sender).send(address(this).balance),
            "Failed withdraw!"
        );
        totalFund = address(this).balance;
    }
}