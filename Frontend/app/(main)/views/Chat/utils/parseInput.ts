import { findAddressBySymbol } from '@/utils'

export const parseInput = async (messageInput: string): Promise<any> => {
	try {
		// const response = await fetch('/api/analyzeQuery', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify({ query: messageInput })
		// })

		// const result = await response.json()
		const result = null
		// Fallback to regex patterns if API fails or returns unknown
		if (!result || result.type === 'unknown') {
			const githubPattern = /https?:\/\/(?:www\.)?github\.com\/\S*/g
			const githubMatches = messageInput.match(githubPattern)
			if (githubMatches) {
				return { parsed: githubMatches[0], type: 'github' }
			}

			const addressPattern = /\b[1-9A-HJ-NP-Za-km-z]{32,44}\b/
			const addressMatch = messageInput.match(addressPattern)
			if (addressMatch) {
				return { parsed: addressMatch[0], type: 'tokenAddress' }
			}

			const cookieKeywords = /(top|best|ranking|analyze|market).*(tokens?|coins?|agents?)/i
			const cookieMatch = messageInput.match(cookieKeywords)
			if (cookieMatch) {
				return { parsed: cookieMatch[0], type: 'cookie_analysis' }
			}
		}

		return result
	} catch (error) {
		console.error('Error in parseInput:', error)
		return { parsed: '', type: 'unknown' }
	}
}
