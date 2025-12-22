/**
 * SMART CONTRACT DEPLOYMENT PACKAGE
 * Framework Euystacio - DocumentAnchor.sol
 * 
 * DEPLOYMENT OPTIONS:
 * 1. Hardhat (Recommended)
 * 2. Remix IDE (Browser-based)
 * 3. Truffle
 * 
 * This package contains everything needed for deployment.
 */

// ============================================================================
// OPTION 1: HARDHAT DEPLOYMENT (RECOMMENDED)
// ============================================================================

/**
 * STEP 1: Project Setup
 * 
 * Create new directory and initialize:
 * 
 * mkdir euystacio-contracts
 * cd euystacio-contracts
 * npm init -y
 * npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
 * npx hardhat
 * 
 * Select: "Create a JavaScript project"
 */

// ============================================================================
// FILE: hardhat.config.js
// ============================================================================

require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    // Sepolia Testnet (for testing)
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 11155111
    },
    // Ethereum Mainnet (production)
    mainnet: {
      url: process.env.MAINNET_RPC_URL || "https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
      chainId: 1
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};

// ============================================================================
// FILE: .env (CREATE THIS FILE - DO NOT COMMIT TO GIT)
// ============================================================================

/*
# Create this file in your project root
# DO NOT share or commit this file!

PRIVATE_KEY=your_wallet_private_key_here
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
MAINNET_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY
ETHERSCAN_API_KEY=your_etherscan_api_key
*/

// ============================================================================
// FILE: contracts/DocumentAnchor.sol
// ============================================================================

/*
// Copy the complete Solidity contract from previous artifact
// Save as: contracts/DocumentAnchor.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DocumentAnchor {
    // ... (complete contract code from previous artifact)
}
*/

// ============================================================================
// FILE: scripts/deploy.js
// ============================================================================

const hre = require("hardhat");

async function main() {
  console.log("═══════════════════════════════════════════════════════");
  console.log("  DEPLOYING DOCUMENTANCHOR CONTRACT");
  console.log("  Framework Euystacio - Immutable Document Registry");
  console.log("═══════════════════════════════════════════════════════\n");

  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  const balance = await deployer.getBalance();

  console.log("Deploying with account:", deployer.address);
  console.log("Account balance:", hre.ethers.utils.formatEther(balance), "ETH\n");

  // Check if enough balance
  const estimatedGas = hre.ethers.utils.parseEther("0.1"); // Conservative estimate
  if (balance.lt(estimatedGas)) {
    console.error("❌ Insufficient balance for deployment");
    console.error(`   Need at least 0.1 ETH, have ${hre.ethers.utils.formatEther(balance)} ETH`);
    process.exit(1);
  }

  // Deploy contract
  console.log("📦 Deploying DocumentAnchor contract...");
  const DocumentAnchor = await hre.ethers.getContractFactory("DocumentAnchor");
  const documentAnchor = await DocumentAnchor.deploy();

  console.log("⏳ Waiting for deployment transaction...");
  await documentAnchor.deployed();

  console.log("\n✅ CONTRACT DEPLOYED SUCCESSFULLY!");
  console.log("═══════════════════════════════════════════════════════");
  console.log("Contract Address:", documentAnchor.address);
  console.log("Transaction Hash:", documentAnchor.deployTransaction.hash);
  console.log("Block Number:", documentAnchor.deployTransaction.blockNumber);
  console.log("Gas Used:", documentAnchor.deployTransaction.gasLimit.toString());
  console.log("═══════════════════════════════════════════════════════\n");

  // Wait for block confirmations
  console.log("⏳ Waiting for 5 block confirmations...");
  await documentAnchor.deployTransaction.wait(5);
  console.log("✅ Confirmed!\n");

  // Verify contract on Etherscan (if not local network)
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("📝 Verifying contract on Etherscan...");
    try {
      await hre.run("verify:verify", {
        address: documentAnchor.address,
        constructorArguments: [],
      });
      console.log("✅ Contract verified on Etherscan!");
    } catch (error) {
      console.log("⚠️  Verification failed:", error.message);
      console.log("   You can verify manually later");
    }
  }

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    contractAddress: documentAnchor.address,
    deployer: deployer.address,
    transactionHash: documentAnchor.deployTransaction.hash,
    blockNumber: documentAnchor.deployTransaction.blockNumber,
    timestamp: new Date().toISOString()
  };

  console.log("\n📄 Deployment Info:");
  console.log(JSON.stringify(deploymentInfo, null, 2));

  return documentAnchor;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });

// ============================================================================
// FILE: scripts/anchor-framework.js
// ============================================================================

const hre = require("hardhat");

async function main() {
  console.log("═══════════════════════════════════════════════════════");
  console.log("  ANCHORING FRAMEWORK EUYSTACIO DOCUMENTS");
  console.log("═══════════════════════════════════════════════════════\n");

  // Contract address (update after deployment)
  const CONTRACT_ADDRESS = "0xYOUR_DEPLOYED_CONTRACT_ADDRESS";

  // Get contract instance
  const DocumentAnchor = await hre.ethers.getContractFactory("DocumentAnchor");
  const contract = await DocumentAnchor.attach(CONTRACT_ADDRESS);

  // IPFS CIDs (update with actual CIDs after IPFS upload)
  const cids = {
    vetoEtico: "QmVetoEtico_PLACEHOLDER",
    peaceBonds: "QmPeaceBonds_PLACEHOLDER",
    ianiCodebase: "QmIANI_PLACEHOLDER",
    genesisBlock: "QmGenesis_PLACEHOLDER",
    nreSpecs: "QmNRE_PLACEHOLDER"
  };

  console.log("📍 Contract Address:", CONTRACT_ADDRESS);
  console.log("📦 Anchoring 5 framework documents...\n");

  // Call anchorFrameworkCore
  console.log("⏳ Sending transaction...");
  const tx = await contract.anchorFrameworkCore(
    cids.vetoEtico,
    cids.peaceBonds,
    cids.ianiCodebase,
    cids.genesisBlock,
    cids.nreSpecs
  );

  console.log("📝 Transaction Hash:", tx.hash);
  console.log("⏳ Waiting for confirmation...");

  const receipt = await tx.wait();

  console.log("\n✅ DOCUMENTS ANCHORED SUCCESSFULLY!");
  console.log("═══════════════════════════════════════════════════════");
  console.log("Block Number:", receipt.blockNumber);
  console.log("Gas Used:", receipt.gasUsed.toString());
  console.log("\nAnchored Document IDs:");

  // Parse events to get document IDs
  receipt.events.forEach((event, index) => {
    if (event.event === "DocumentAnchored") {
      console.log(`  Document ${index + 1}: ID #${event.args.id.toString()}`);
    }
  });

  console.log("═══════════════════════════════════════════════════════\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// ============================================================================
// FILE: scripts/verify-anchors.js
// ============================================================================

const hre = require("hardhat");

async function main() {
  const CONTRACT_ADDRESS = "0xYOUR_DEPLOYED_CONTRACT_ADDRESS";
  
  const DocumentAnchor = await hre.ethers.getContractFactory("DocumentAnchor");
  const contract = await DocumentAnchor.attach(CONTRACT_ADDRESS);

  console.log("═══════════════════════════════════════════════════════");
  console.log("  VERIFYING ANCHORED DOCUMENTS");
  console.log("═══════════════════════════════════════════════════════\n");

  // Get total documents
  const totalDocs = await contract.documentCount();
  console.log(`Total Documents Anchored: ${totalDocs}\n`);

  // Verify each document
  for (let i = 1; i <= totalDocs; i++) {
    console.log(`\nDocument #${i}:`);
    try {
      const doc = await contract.getDocument(i);
      console.log(`  Name: ${doc.name}`);
      console.log(`  CID: ${doc.cid}`);
      console.log(`  Timestamp: ${new Date(doc.timestamp * 1000).toISOString()}`);
      console.log(`  Anchored By: ${doc.anchoredBy}`);
      console.log(`  ✅ VERIFIED`);
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`);
    }
  }

  // Get statistics
  const stats = await contract.getStats();
  console.log("\n═══════════════════════════════════════════════════════");
  console.log(`Total Documents: ${stats.total}`);
  console.log(`Unique Anchors: ${stats.uniqueAnchors}`);
  console.log("═══════════════════════════════════════════════════════\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// ============================================================================
// FILE: test/DocumentAnchor.test.js
// ============================================================================

const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DocumentAnchor", function () {
  let documentAnchor;
  let owner;
  let addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    const DocumentAnchor = await ethers.getContractFactory("DocumentAnchor");
    documentAnchor = await DocumentAnchor.deploy();
    await documentAnchor.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await documentAnchor.owner()).to.equal(owner.address);
    });

    it("Should start with 0 documents", async function () {
      expect(await documentAnchor.documentCount()).to.equal(0);
    });
  });

  describe("Document Anchoring", function () {
    it("Should anchor a document successfully", async function () {
      const tx = await documentAnchor.anchorDocument(
        "Test Document",
        "QmTestCID123456789",
        '{"test": true}'
      );
      
      await tx.wait();
      
      expect(await documentAnchor.documentCount()).to.equal(1);
      
      const doc = await documentAnchor.getDocument(1);
      expect(doc.name).to.equal("Test Document");
      expect(doc.cid).to.equal("QmTestCID123456789");
    });

    it("Should prevent duplicate CIDs", async function () {
      await documentAnchor.anchorDocument(
        "Doc 1",
        "QmSameCID",
        "{}"
      );

      await expect(
        documentAnchor.anchorDocument("Doc 2", "QmSameCID", "{}")
      ).to.be.revertedWith("CID already anchored");
    });
  });

  describe("Document Verification", function () {
    it("Should verify existing documents", async function () {
      await documentAnchor.anchorDocument(
        "Test",
        "QmTest",
        "{}"
      );

      const result = await documentAnchor.verifyDocument("QmTest");
      expect(result.exists).to.be.true;
      expect(result.id).to.equal(1);
    });

    it("Should return false for non-existent CIDs", async function () {
      const result = await documentAnchor.verifyDocument("QmNonExistent");
      expect(result.exists).to.be.false;
      expect(result.id).to.equal(0);
    });
  });
});

// ============================================================================
// FILE: package.json
// ============================================================================

/*
{
  "name": "euystacio-contracts",
  "version": "1.0.0",
  "description": "Framework Euystacio Smart Contracts",
  "scripts": {
    "test": "hardhat test",
    "deploy:sepolia": "hardhat run scripts/deploy.js --network sepolia",
    "deploy:mainnet": "hardhat run scripts/deploy.js --network mainnet",
    "anchor": "hardhat run scripts/anchor-framework.js --network mainnet",
    "verify": "hardhat run scripts/verify-anchors.js --network mainnet"
  },
  "devDependencies": {
    "@nomicfoundation/hardhat-toolbox": "^2.0.0",
    "hardhat": "^2.19.0",
    "dotenv": "^16.0.0"
  }
}
*/

// ============================================================================
// DEPLOYMENT COMMANDS
// ============================================================================

/*

STEP-BY-STEP DEPLOYMENT:

1. SETUP PROJECT:
   mkdir euystacio-contracts
   cd euystacio-contracts
   npm init -y
   npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox dotenv

2. INITIALIZE HARDHAT:
   npx hardhat
   (Select: Create a JavaScript project)

3. CREATE FILES:
   - Copy hardhat.config.js
   - Copy contracts/DocumentAnchor.sol
   - Copy all scripts
   - Create .env file with your keys

4. COMPILE CONTRACT:
   npx hardhat compile

5. RUN TESTS:
   npx hardhat test

6. DEPLOY TO TESTNET (Sepolia):
   npm run deploy:sepolia

7. DEPLOY TO MAINNET:
   npm run deploy:mainnet

8. ANCHOR DOCUMENTS:
   npm run anchor

9. VERIFY ANCHORING:
   npm run verify

*/

// ============================================================================
// ALTERNATIVE: REMIX IDE DEPLOYMENT (BROWSER-BASED)
// ============================================================================

/*

FOR NON-DEVELOPERS - USE REMIX:

1. Go to: https://remix.ethereum.org

2. Create new file: DocumentAnchor.sol
   - Paste the Solidity contract code

3. Compile:
   - Click "Solidity Compiler" tab
   - Select version 0.8.19
   - Click "Compile"

4. Deploy:
   - Click "Deploy & Run" tab
   - Select "Injected Provider - MetaMask"
   - Click "Deploy"
   - Confirm in MetaMask

5. Interact:
   - Use deployed contract functions
   - Call anchorFrameworkCore() with CIDs

COST: ~0.06 ETH (~$120 USD) for deployment

*/

// ============================================================================
// GAS COST CALCULATOR
// ============================================================================

function calculateGasCosts(gasPrice = 30) {
  const costs = {
    deployment: {
      gas: 2000000,
      eth: (2000000 * gasPrice) / 1e9,
      usd: ((2000000 * gasPrice) / 1e9) * 2000
    },
    singleAnchor: {
      gas: 150000,
      eth: (150000 * gasPrice) / 1e9,
      usd: ((150000 * gasPrice) / 1e9) * 2000
    },
    frameworkCore: {
      gas: 750000,
      eth: (750000 * gasPrice) / 1e9,
      usd: ((750000 * gasPrice) / 1e9) * 2000
    }
  };

  console.log("GAS COST ESTIMATES (@ " + gasPrice + " gwei, ETH=$2000):");
  console.log("Deployment:", costs.deployment.eth.toFixed(4), "ETH ($" + costs.deployment.usd.toFixed(2) + ")");
  console.log("Single Anchor:", costs.singleAnchor.eth.toFixed(4), "ETH ($" + costs.singleAnchor.usd.toFixed(2) + ")");
  console.log("Framework Core:", costs.frameworkCore.eth.toFixed(4), "ETH ($" + costs.frameworkCore.usd.toFixed(2) + ")");

  return costs;
}

// Run calculator
calculateGasCosts();

module.exports = {
  calculateGasCosts
};
