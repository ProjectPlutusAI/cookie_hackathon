'use client'
import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'

export default function Main() {
	const [view, setView] = useState<'splash' | 'gate' | 'chat'>('splash')


	return (
		<div className={`w-screen h-screen min-w-full min-h-full ${ 'flex'}`}>
			{/* Main Content should be inside a flex container to prevent overlay */}
			<div className="flex-1 flex flex-col">
				Project Plutus
			</div>

			<Toaster position="bottom-center" reverseOrder={false} />
		</div>
	)
}
