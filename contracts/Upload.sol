// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Upload {
    
    struct Access {
        address user;
        bool access; // true if access is granted
    }
    
    mapping(address => string[]) private files; // user to list of files
    mapping(address => mapping(address => bool)) private permissions; // owner to (user to permission)
    mapping(address => Access[]) private accessList; // owner to access info
    mapping(address => mapping(address => bool)) private hasAccessRecord; // to check previous access entries

    // Add a file for the user (only callable by the owner)
    function addFile(string memory url) external {
        files[msg.sender].push(url);
    }

    // Allow access to a specific user
    function allowAccess(address user) external {
        permissions[msg.sender][user] = true;
        
        if (!hasAccessRecord[msg.sender][user]) {
            accessList[msg.sender].push(Access(user, true));
            hasAccessRecord[msg.sender][user] = true;
        } else {
            // Update existing access record
            for (uint i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == user) {
                    accessList[msg.sender][i].access = true;
                    break;
                }
            }
        }
    }

    // Disallow access for a specific user
    function disallowAccess(address user) external {
        permissions[msg.sender][user] = false;
        
        // Update access list
        for (uint i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == user) {
                accessList[msg.sender][i].access = false;
                break;
            }
        }
    }

    // Display the files for the user if allowed
    function displayFiles(address user) external view returns (string[] memory) {
        require(user == msg.sender || permissions[user][msg.sender], "Access denied");
        return files[user];
    }

    // Returns the access list for the caller
    function getAccessList() external view returns (Access[] memory) {
        return accessList[msg.sender];
    }
}