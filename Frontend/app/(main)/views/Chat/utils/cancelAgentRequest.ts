import type { PublicKey } from '@solana/web3.js'

type getAgentHistoryProps = {
	address: PublicKey
	message: string
	signature: Uint8Array
	agentId: string
}

export const cancelAgentRequest = async ({ address, message, signature, agentId }: getAgentHistoryProps) => {
	try {
		const body = { address, message, signature, agentId }
		const url = 'http://localhost:3005/api/cancelAgentRequest'
		const options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
		const tokenDataResponse = await fetch(url, options)
		const tokenData = await tokenDataResponse.json()
		return tokenData
	} catch (e) { return { data: null, success: false } }
}