/* function deployFunc() {
    console.log(hi);
}

module.exports.default = deployFunc;
 */

// const {getNamedAccounts, deployments} = hre

const { network } = require("hardhat");
const {
    networkConfig,
    developmentChains,
} = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;

    // Use the adress for diferetent networks
    let ethUsdPriceFeedAddress;
    if (developmentChains.includes(network.name)) {
        //if we are using a development netwok then we need to run a mock node
        const ethUsdAggregator = await deployments.get("MockV3Aggregator");
        ethUsdPriceFeedAddress = ethUsdAggregator.address;
    } else {
        // If we use real network then we use the address from chainlink
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
    }

    const args = [ethUsdPriceFeedAddress];

    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, // put pricefeedadress
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });

    // If the network is a real one, then we will verify the contract via etherscan
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, args);
    }
    log("---------------------------------------------------");
};

module.exports.tags = ["all", "fundme"];
