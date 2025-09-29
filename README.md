# Hello FHEVM — Secret Guess 🎲🔐  
*A beginner-friendly demo showing how to build an encrypted guessing game with Zama’s FHEVM concepts.*

---

## 🎥 Demo
- GIF / short video: [Demo GIF](docs/demo.gif) *(replace with YouTube/IPFS link if hosted)*

---

## ⚡ Quick Start

```bash
# 1) backend: start Hardhat node
cd backend
npm ci
npx hardhat node &   # keep running in one terminal

# 2) in another terminal: setup, encrypt secret, deploy
cd backend
node scripts/gen-key.js            # creates backend/.env (KEY=...)
node scripts/encrypt-secret.js 42  # encrypt secret number
mkdir -p tmp && npx hardhat run --network localhost scripts/deploy-fixed.js

# 3) submit guess (simulate player)
node scripts/submit-guess.js --guess 42

# 4) owner compute & publish
node scripts/compute-result.js

# 5) verify
node scripts/fetch-result.js
````

For frontend:

```bash
cd frontend
npm ci
echo "REACT_APP_CONTRACT_ADDRESS=0xYourDeployedContractAddress" > .env
npm start
```

---

## 📦 Prerequisites & Pinned Versions

* Node.js >= 18
* npm (bundled with Node)
* Hardhat `^2.17.0` (backend devDependency)
* Ethers v5 `^5.7.2`
* React `^18.2.0`
* react-scripts `5.0.1`

👉 Exact versions are committed in `backend/package.json` & `frontend/package.json`.

---

## 🔐 How It Works: Encryption → Computation → Decryption

### High-level flow

1. **Encrypt (client)** — user encrypts input locally (mock AES for demo).
2. **Submit (on-chain)** — contract stores ciphertext.
3. **Compute** —

   * *Real FHE:* on-chain precompile evaluates directly on ciphertexts.
   * *Demo:* owner decrypts → computes → re-encrypts → publishes.
4. **Decrypt (client)** — user decrypts result locally.

### ASCII Diagram

```
[User Browser] --encrypt--> [ciphertext] --tx--> [SecretGuess contract]
                                 |
                                 v
                          [FHEVM precompile]  or  [Owner/offchain worker]
                                 |
                                 v
                      encrypted result published on-chain
                                 |
                                 v
                      [User Browser] --decrypt--> outcome
```

### Minimal Math Intuition

FHE lets you evaluate functions `f` on ciphertexts:

```
Dec(Eval(f, Enc(m1), Enc(m2))) == f(m1, m2)
```

This repo uses symmetric encryption for reproducibility; replace with Zama’s SDK for true FHE.

---

## 🌐 Deploying to Zama Testnet

See [Zama Protocol Docs](https://docs.zama.ai).

1. Get a testnet RPC (e.g., Sepolia + Zama relayer).
2. Use the Zama SDK (`fhevm`) to fetch the chain’s FHE public key:

```js
// pseudo-code, check docs for current methods
const sdk = await fhevm.initialize({ rpcUrl: 'https://sepolia.zama-relayer.example' });
const chainPublicKey = await sdk.getPublicKey();
```

3. Replace AES mocks with SDK calls for encryption/decryption.
4. Deploy contract to supported FHEVM testnet.

---

## 🖥 Running the Demo (Frontend + Contract)

1. Start Hardhat local node & deploy (see Quick Start).
2. Update `frontend/.env` with:

   ```
   REACT_APP_CONTRACT_ADDRESS=0xYourDeployedContractAddress
   ```
   and import the wallet in metamask using key in backend .env file.
3. Run frontend with `npm start`.

---

## 📂 Source Code Structure

```
hello-fhevm-guess-full/
├─ backend/
│  ├─ contracts/GuessGame.sol       # Stores ciphertexts & results
│  ├─ scripts/                      # Demo flow scripts
│  │   ├ gen-key.js
│  │   ├ encrypt-secret.js
│  │   ├ deploy-fixed.js
│  │   ├ submit-guess.js
│  │   ├ compute-result.js
│  │   └ fetch-result.js
│  ├─ test/secret-guess.test.js
│  ├─ package.json
│  └─ .env.example
├─ frontend/
│  ├─ src/
│  │   ├ App.js
│  │   ├ App.css
│  │   ├ GuessGame.json             # ABI copied from backend
│  │   └ assets/
│  │       ├ zamaLogo.png
│  │       └ zamaBlock.png
│  ├─ package.json
│  └─ .env.example
├─ docs/
│  ├─ architecture.md
│  └─ demo.gif / demo.mp4
├─ README.md
├─ LICENSE
└─ .github/workflows/ci.yml
```

---

## 🛠 Troubleshooting & Common Errors

* **`backend/.env` missing** → run `node scripts/gen-key.js`.
* **`tmp/secret.hex` missing** → run `node scripts/encrypt-secret.js <secret>`.
* **React env var undefined** → set `frontend/.env` and restart.
* **MetaMask errors** → ensure correct network (Hardhat localhost vs Sepolia).
* **FHE public key fetch errors** → confirm relayer URL from [docs](https://docs.zama.ai).

---




