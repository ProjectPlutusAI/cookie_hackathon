import { NextResponse } from 'next/server'

const DEEPSEEK_API = process.env.DEEPSEEK_API

interface DeepseekResponse {
	type: 'github' | 'tokenAddress' | 'cookie_analysis' | 'unknown'
	parsed: string
}

export async function POST(request: Request) {
	try {
		const { query } = await request.json()

		const response = await fetch('https://api.deepseek.com/chat/completions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${DEEPSEEK_API}`
			},
			body: JSON.stringify({
				model: 'deepseek-chat',
				messages: [
					{
						role: 'system',
						content: `Analyze the following query and determine its type:
						1. If it's a GitHub URL, return type "github"
						2. If it's a token address, return type "tokenAddress"
						3. If it's a query about top tokens, rankings, or analytics on Cookie, return type "cookie_analysis"
						
						Return JSON with:
						- "type": ("github", "tokenAddress", "cookie_analysis", "cookie_analysis")
						- "parsed": (the URL, address, or specific cookie analysis request)
						
						For cookie_analysis, parsed should be one of:
						- "top_tokens"
						- "top_agents"
						- "token_rankings"
						- "market_analysis"`
					},
					{
						role: 'user',
						content: query
					}
				],
				stream: false
			})
		})

		const data = await response.json()

		// Parse the response from Deepseek
		try {
			const analysis = JSON.parse(data.choices[0].message.content)
			return NextResponse.json(analysis)
		} catch (e) {
			return NextResponse.json({ type: 'unknown', parsed: '' })
		}
	} catch (error) {
		console.error('Error analyzing query:', error)
		return NextResponse.json({ type: 'unknown', parsed: '' })
	}
}
