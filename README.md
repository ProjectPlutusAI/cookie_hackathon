# Project Plutus

## AI Autonomous Agents for Crypto Market Decisions

Project Plutus is an advanced AI-driven autonomous agent system. It leverages periodic snapshots of cookie data stored on all tokens to analyze market trends, optimize trading decisions, and automate on-chain actions.



## Overview

Project Plutus integrates AI capabilities with blockchain networks and Web3 protocols to automate trading decisions based on real-time and historical market data. Built using the latest AI-driven autonomous agent technology, it removes the need for manual chart monitoring and enhances decision-making efficiency in decentralized finance (DeFi).

## Features

- AI-Driven Market Insights: Analyzes periodic snapshots of cookie data to track:

  1. Trends in mindshare and social metrics (impressions, followers, engagements)
  2. Market cap and volume trends
  3. Price movements
  4. Holder count changes\
     Using Deepseek LLM

- Autonomous Trading Decisions:

  - Executes WAIT and BUY actions autonomously based on market conditions.
  - On-chain trading actions are powered by SendKit.

- Hedging with Liquidity Pools:

  - The system can autonomously decide to hedge risk by creating a one-sided Metora pool, optimizing asset protection.

- Users can check actions on the frontend and see the reasons the AI agent gave to each action before performing it

## Getting Started

### Frontend Setup

1. Install dependencies:
   
bash
   npm install
   
2. Input environment variables:
   
bash
   cp .env.example .env
   
3. Build and run the frontend:
   
bash
   npm run dev
   

### Backend Setup

1. Install dependencies:
   
bash
   npm install
   
2. Use the correct Node.js version:
   
bash
   nvm use 23.1.0
   
3. Input correct environment variables:
   
bash
   cp .env.example .env
   
4. Build and start the backend:
   
bash
   npx ts-node src/server.ts
   

## Tech Stack

- Next.js 14 (App Router)
- SendKit for on-chain execution
- Node.js

## Requirements

- Node.js >= 23.1.0
- npm >= 8.0.0

## License

MIT

## Team

- [potato]
- [ycrydev]

## Acknowledgments

Special thanks to CookieDAO and the DataSwarm Hackathon organizers for providing the platform to innovate in AI and crypto integration.

## Social Media

Follow our development:

- Twitter: @ProjectPlutus\_
