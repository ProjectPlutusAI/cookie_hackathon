'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface AuthContextType {
	authMessage: string | null
	authSignature: Uint8Array | null
	access: boolean | null
	custodialWallet: string | null
	refresh: boolean | null
	goHome: boolean | null
	ordersOpen: number | null
	setAuthMessage: (message: string) => void
	setAuthSignature: (signature: Uint8Array) => void
	setAccess: (access: boolean) => void
	setCustodialWallet: (wallet: string) => void
	setRefresh: (refresh: boolean) => void
	setGoHome: (goHome: boolean) => void
	setOrdersOpen: (ordersOpen: number) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export default function AuthProvider({ children }: { children: ReactNode }) {
	const [authMessage, setAuthMessage] = useState<string | null>(null)
	const [authSignature, setAuthSignature] = useState<Uint8Array | null>(null)
	const [access, setAccess] = useState<boolean | null>(null)
	const [custodialWallet, setCustodialWallet] = useState<string | null>(null)
	const [refresh, setRefresh] = useState<boolean | null>(false)
	const [goHome, setGoHome] = useState<boolean | null>(false)
	const [ordersOpen, setOrdersOpen] = useState<number | null>(0)
	return (
		<AuthContext.Provider value={{ authMessage, authSignature, access, custodialWallet, refresh, goHome, ordersOpen, setAuthMessage, setAuthSignature, setAccess, setCustodialWallet, setRefresh, setGoHome, setOrdersOpen }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuthContext = (): AuthContextType => {
	const context = useContext(AuthContext)
	if (!context) { throw new Error('useAuthContext must be used within an AuthProvider') }
	return context
}
