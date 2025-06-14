// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Upload {
    
    struct Access {
        address user;
        bool access;
    }

    mapping(address => string[]) private files; // owner => file URLs
    mapping(address => mapping(address => bool)) private permissions; // owner => user => has access
    mapping(address => Access[]) private accessList; // owner => list of access records
    mapping(address => mapping(address => bool)) private hasAccessRecord; // owner => user => already in accessList

    //  Add file to _user's storage (usually _user == msg.sender)
    function addFile(address _user, string memory url) external {
        require(_user == msg.sender, "You can only upload to your own account");
        files[_user].push(url);
    }

    //  Allow another user to access your files
    function allowAccess(address user) external {
        permissions[msg.sender][user] = true;

        if (hasAccessRecord[msg.sender][user]) {
            for (uint i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == user) {
                    accessList[msg.sender][i].access = true;
                    break;
                }
            }
        } else {
            accessList[msg.sender].push(Access(user, true));
            hasAccessRecord[msg.sender][user] = true;
        }
    }

    //  Revoke access from a user
    function disallowAccess(address user) external {
        permissions[msg.sender][user] = false;

        for (uint i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == user) {
                accessList[msg.sender][i].access = false;
                break;
            }
        }
    }

    //  Display files if caller is owner or has permission
    function displayFiles(address user) external view returns (string[] memory) {
        require(user == msg.sender || permissions[user][msg.sender], "You don't have access");
        return files[user];
    }

    //  View your own access list
    function getAccessList() external view returns (Access[] memory) {
        return accessList[msg.sender];
    }
}
