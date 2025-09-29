# Hello FHEVM Guess Tutorial

This project demonstrates a simple FHEVM "Hello World" dApp with a secret number guessing game.

## Quick Start

### Backend
```bash
cd backend
npm install
npx hardhat node
```
In another terminal:
```bash
cd backend
node scripts/gen-key.js
node scripts/encrypt-secret.js --secret 42
npx hardhat run --network localhost scripts/deploy.js
```

### Frontend
```bash
cd frontend
npm install
npm start
```

Set environment variables in `.env` files (`KEY` and `CONTRACT_ADDRESS`).

See docs/architecture.md for flow diagrams.
