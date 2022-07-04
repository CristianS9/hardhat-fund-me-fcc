const { run } = require("hardhat");

async function verify(contractAddress, args) {
    // Function to verify the contract on etherscan after deploying

    console.log("Verifying contract, please wait...");
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified");
        } else {
            console.log(e);
        }
    }
}

module.exports = { verify };
