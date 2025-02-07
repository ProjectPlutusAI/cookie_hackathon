// app/context/index.tsx
import React, { ReactNode } from 'react'
import AuthProvider from './AuthProvider'
import WalletProvider from './WalletProvider'

interface AppContextProviderProps { children: ReactNode }

const ContextProvider = ({ children }: AppContextProviderProps) => {
	return (
		<WalletProvider>
			<AuthProvider>
				 {children}
			</AuthProvider>
		</WalletProvider>
	)
}

export default ContextProvider