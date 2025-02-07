'use client'

import React, { useMemo } from 'react'
import { ConnectionProvider, WalletProvider as WalletProviderBase } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'
import { PhantomWalletAdapter, SolflareWalletAdapter, LedgerWalletAdapter } from '@solana/wallet-adapter-wallets'
import '@solana/wallet-adapter-react-ui/styles.css'

// imports here

export default function WalletProvider({ children }: { children: React.ReactNode }) {
	const network = WalletAdapterNetwork.Mainnet
	const endpoint = useMemo(() => clusterApiUrl(network), [network])
	const wallets = useMemo(
		() => [
			// manually add any legacy wallet adapters here
			// new UnsafeBurnerWalletAdapter(),
			new PhantomWalletAdapter(),
			new SolflareWalletAdapter(),
			new LedgerWalletAdapter()
		],
		[network]
	)

	return (
		<ConnectionProvider endpoint={endpoint}>
			<WalletProviderBase wallets={wallets} autoConnect>
				<WalletModalProvider>{children}</WalletModalProvider>
			</WalletProviderBase>
		</ConnectionProvider>
	)
}