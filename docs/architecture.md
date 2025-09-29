# Architecture

Flow:
1. User encrypts secret number locally (using mock AES here).
2. Deploy contract with encrypted secret.
3. Player submits encrypted guess.
4. Owner decrypts guess, computes result, re-encrypts result, and publishes to chain.
5. Player decrypts result locally.

This is a mock-up flow. Replace AES with FHEVM JS SDK calls for production.
