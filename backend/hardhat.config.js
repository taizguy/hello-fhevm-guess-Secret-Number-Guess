// require("@nomiclabs/hardhat-waffle");
// module.exports = {
//   solidity: "0.8.19",
//   networks: {
//     localhost: {
//       url: "http://127.0.0.1:8545"
//     }
//   }

  
// };


require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

module.exports = {
  solidity: "0.8.19",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "",
      accounts: process.env.KEY ? [process.env.KEY] : [],
      chainId: 11155111
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY || ""
  }
};


