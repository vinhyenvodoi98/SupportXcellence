install:
	@forge install transmissions11/solmate Openzeppelin/openzeppelin-contracts foundry-rs/forge-std --no-commit --no-git

deploy-vault:
	@forge script script/Deploy.s.sol:DeployScript --broadcast --legacy && bash ./convertVault.sh

deploy-token:
	@forge script script/DeployErc20.s.sol:DeployScript --broadcast --legacy && bash ./convertToken.sh

deploy-user:
	@forge script script/DeployUser.s.sol:DeployScript --broadcast --legacy && bash ./convertUser.sh
