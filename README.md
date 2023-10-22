# SupportXcellence
## Project Description
ERC4626 is an extension of ERC20 that proposes a standard interface for token vaults. it will be even better when it integrates the multi-thread feature from Hyperlane, thereby bringing multi-chain farming to users.

In addition, we support Flashloan to help users earn additional profits from swapping price differences between current swap platforms.

Key Features and Functionality:

- Allows users to create new token vaults, displaying information makes it easy for users to understand
- The smart contract is deployed on 4 networks: Scroll Sepolia, Mantle Testnet, Goerli, Optimism Goerli
- Supports users to add tokens to multi-chain vaults
- Provide flashloan-backed liquidity

## How it's Made
- Vault implementation according to erc4626 standard
- Use Hyperlane's mailbox dispatch feature to support adding tokens to a multi-chain vault
- To make users can easily manage the token when interacting with multi-chain vaults, I created 2 contracts: UserContractSender in chain A and UserContract in chain B. The user will interact with the UserContractSender to create a new UserContract, add tokens to the vault and withdraw by using mailbox from Hyperlane
- The smartcontract is deployed on 4 networks: Scroll Sepolia, Mantle Testnet, Goerli, Optimism Goerli
- Provides a template to support users using vault for flashloan
