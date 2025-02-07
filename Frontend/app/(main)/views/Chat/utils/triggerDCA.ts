import type { PublicKey } from '@solana/web3.js'

interface TriggerDCAProps {
	address: PublicKey
	tokenAddress: string
	amount: number
	frequency: number
}

export const triggerDCA = async ({ address, tokenAddress, amount, frequency }: TriggerDCAProps) => {
	try {
		const body = {
			address,
			tokenAddress,
			amount,
			frequency
		}

		const response = await fetch('http://localhost:3005/api/triggerDCA', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		})

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		const data = await response.json()
		return {
			success: true,
			data,
			message: 'DCA strategy initiated successfully'
		}
	} catch (error) {
		console.error('Error triggering DCA:', error)
		return {
			success: false,
			data: null,
			message: error instanceof Error ? error.message : 'Failed to initiate DCA strategy'
		}
	}
}
