# Linters

Solhint is used to check for errors in the solidity code

> yarn solhint {filename}

> yarn solhint contracts/\*.sol

# Better deployment

> yarn add --dev hardhat-deploy

-   This command wil rewrite hardhat-ethers with hardhat-deploy-ethers

> npm install --save-dev @nomiclabs/hardhat-ethers@npm:hardhat-deploy-ethers ethers

We need to create a new folder called `deploy` were we add the scripts

> yarn hardhat deploy --network rinkeby

-   The contract 00 is using mocks, so be sure to use `--tags mocks` in the call

# Documentation

To create code info documentatios we use

> solc --userdoc --devdoc [filename].sol

# Debugging

Importing the console form hardhat gives aditions info on the prints

```
    import "hardhat/console.sol
```
