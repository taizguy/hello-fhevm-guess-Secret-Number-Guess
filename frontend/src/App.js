import React, { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';
import GuessGame from './GuessGame.json';
import zamaLogo from './assets/zamaLogo.jpg';
import zamaBlock from './assets/zamaBlock.png';

function App() {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');

  async function switchToSepolia(provider) {
    try {
      await provider.send("wallet_switchEthereumChain", [{ chainId: "0xaa36a7" }]); // Sepolia
    } catch (switchError) {
      // If Sepolia not added to MetaMask
      if (switchError.code === 4902) {
        try {
          await provider.send("wallet_addEthereumChain", [{
            chainId: "0xaa36a7",
            chainName: "Sepolia Test Network",
            rpcUrls: ["https://sepolia.infura.io/v3/YOUR_INFURA_ID"], // replace with your Infura/Alchemy URL
            nativeCurrency: {
              name: "SepoliaETH",
              symbol: "ETH",
              decimals: 18,
            },
            blockExplorerUrls: ["https://sepolia.etherscan.io/"],
          }]);
        } catch (addError) {
          console.error("Failed to add Sepolia", addError);
        }
      } else {
        console.error("Failed to switch network", switchError);
      }
    }
  }

  async function submitGuess() {
    if (!window.ethereum) {
      setMessage("⚠️ Please install MetaMask or a web3 wallet.");
      return;
    }
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // 1. Request accounts
      await provider.send("eth_requestAccounts", []);

      // 2. Ensure Sepolia is selected
      await switchToSepolia(provider);

      const signer = provider.getSigner();
      const addr = process.env.REACT_APP_CONTRACT_ADDRESS;
      if (!addr) {
        setMessage("⚠️ Contract address is not set.");
        return;
      }

      // 3. Interact with contract
      const contract = new ethers.Contract(addr, GuessGame.abi, signer);
      const hexGuess = Buffer.from(guess).toString('hex');
      const tx = await contract.submitEncryptedGuess("0x" + hexGuess);
      await tx.wait();

      setMessage("✅ Guess submitted!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Error: " + (err.message || err.toString()));
    }
  }

  return (
    <div className="app-container">
      <div className="hero">
        <h1>Zama FHE Guess Game</h1>
        <p>
          Experience the power of privacy-preserving computation. Here’s a demo of secure guessing
          using encrypted inputs and smart contracts.
        </p>
        <div className="hero-images">
          <img src={zamaLogo} alt="Zama Logo" />
          <img src={zamaBlock} alt="Zama Block Art" />
        </div>
      </div>

      <div className="card">
        <h2>Enter Your Guess</h2>
        <input
          type="text"
          placeholder="Type a number..."
          value={guess}
          onChange={e => setGuess(e.target.value)}
        />
        <button onClick={submitGuess}>Submit Guess</button>
        {message && <div className="message">{message}</div>}
      </div>

      <div className="footer">
        Built as a “Hello FHEVM” demo — mock encryption flow. Swap to Zama’s `fhevmjs` for real FHE.  
        <br />
        <strong>Note:</strong> Make sure your `.env` has `REACT_APP_CONTRACT_ADDRESS` set.  
      </div>
    </div>
  );
}

export default App;
