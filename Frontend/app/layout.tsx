import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ContextProvider from './context/'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })

// Make more robust metadata
export const metadata: Metadata = {
	title: 'Project Plutus',
	description: 'Your AI powered trading companion'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
			</head>
			<body className={`${inter.variable} antialiased overflow-hidden`} >
				<ContextProvider>
					{children}
				</ContextProvider>
			</body>
		</html>
	)
}
