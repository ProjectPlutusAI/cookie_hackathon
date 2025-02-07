import type { PublicKey } from '@solana/web3.js'

type GetTokenDataProps = {
	address: PublicKey
	message: string
	signature: Uint8Array
	tokenAddress: string
}

export const getTokenData = async ({ address, message, signature, tokenAddress }: GetTokenDataProps) => {
	try {
		const body = { address, message, signature, tokenAddress }
		const url = 'http://localhost:3005/api/getTokenData'
		const options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
		const tokenDataResponse = await fetch(url, options)
		const tokenData = await tokenDataResponse.json()
		return tokenData
	} catch (e) {
		return { data: null, success: false }
	}
}
