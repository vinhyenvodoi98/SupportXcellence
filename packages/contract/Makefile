install:
	@forge install transmissions11/solmate Openzeppelin/openzeppelin-contracts foundry-rs/forge-std --no-commit --no-git

deploy:
	@forge script script/Deploy.s.sol:DeployScript --broadcast --verify --legacy && bash ./convert.sh
