import type { PublicKey } from '@solana/web3.js'

type getAgentHistoryProps = {
	address: PublicKey
	message: string
	signature: Uint8Array
}

export const getAgentHistory = async ({ address, message, signature }: getAgentHistoryProps) => {
	try {
		const body = { address, message, signature }
		const url = 'http://localhost:3005/api/getAgentHistory'
		const options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
		const tokenDataResponse = await fetch(url, options)
		const tokenData = await tokenDataResponse.json()
		return tokenData
	} catch (e) {
		return { data: null, success: false }
	}
}
