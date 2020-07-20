const { Gateway, Wallets } = require("fabric-network");
const path = require("path");
const fs = require("fs");
const FabricService = async function () {
  const ccpPath = path.resolve(__dirname, "..", "connection-profile.json");
  const ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

  // Create a new file system based wallet for managing identities.
  const walletPath = path.join(process.cwd(), "wallet");
  const wallet = await Wallets.newFileSystemWallet(walletPath);
  console.log(`Wallet path: ${walletPath}`);

  // Check to see if we've already enrolled the user.
  const identity = await wallet.get("admin");
  if (!identity) {
    console.log(
      'An identity for the user "admin" does not exist in the wallet'
    );
    console.log("Run the ./boot/enrollAdmin.js application before retrying");
    return;
  }

  // Create a new gateway for connecting to our peer node.
  global.FabricGateway = new Gateway();
  await FabricGateway.connect(ccp, {
    wallet,
    identity: "admin",
    discovery: { enabled: true, asLocalhost: false },
  });

  // Get the network (channel) our contract is deployed to.
  global.FabricNetwork = await FabricGateway.getNetwork("traxemchannel");

  // Get the contract from the network.
  global.FabricContract = FabricNetwork.getContract("Qrcode");
};

module.exports = { FabricService };
