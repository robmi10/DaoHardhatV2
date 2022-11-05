//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";


contract DaoToken is ERC20Votes{
    constructor() ERC20("DaoToken", 'DT') ERC20Permit("DaoToken"){
        _mint(msg.sender, 1000000e18);
    } 

    function _afterTokenTransfer(
    address from,
    address to,
    uint256 amount
    ) internal override(ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount) internal override(ERC20Votes) {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount) internal override(ERC20Votes) {
        super._burn(account, amount);
    }

}