import { NextResponse } from 'next/server'

const COOKIE_API_KEY = process.env.COOKIE_API_KEY

interface CookieAgent {
	address: string
	name: string
	volume: number
	trades: number
	pnl: number
	rank?: number
}

export async function GET() {
	try {
		const response = await fetch('https://api.cookie.fun/v2/agents/agentsPaged?interval=_7Days&page=1&pageSize=10', {
			headers: {
				'x-api-key': COOKIE_API_KEY,
				'Content-Type': 'application/json'
			}
		})

		if (!response.ok) {
			throw new Error(`Cookie API error: ${response.status}`)
		}
		const data = await response.json()
		console.log('data', data)
		// Format the response to include only necessary data
		const formattedAgents = data.ok.data.map((agent: any) => ({
			agentName: agent.agentName,
			contracts: agent.contracts,
			twitterUsernames: agent.twitterUsernames,
			mindshare: agent.mindshare,
			mindshareDeltaPercent: agent.mindshareDeltaPercent,
			marketCap: agent.marketCap,
			marketCapDeltaPercent: agent.marketCapDeltaPercent,
			price: agent.price,
			priceDeltaPercent: agent.priceDeltaPercent,
			liquidity: agent.liquidity,
			volume24Hours: agent.volume24Hours,
			volume24HoursDeltaPercent: agent.volume24HoursDeltaPercent,
			holdersCount: agent.holdersCount,
			holdersCountDeltaPercent: agent.holdersCountDeltaPercent,
			averageImpressionsCount: agent.averageImpressionsCount,
			averageImpressionsCountDeltaPercent: agent.averageImpressionsCountDeltaPercent,
			averageEngagementsCount: agent.averageEngagementsCount,
			averageEngagementsCountDeltaPercent: agent.averageEngagementsCountDeltaPercent,
			followersCount: agent.followersCount,
			smartFollowersCount: agent.smartFollowersCount,
			topTweets: agent.topTweets
		}))

		const responseData = {
			data: formattedAgents,
			currentPage: data.currentPage,
			totalPages: data.totalPages,
			totalCount: data.totalCount
		}

		return NextResponse.json({
			success: true,
			data: responseData
		})
	} catch (error) {
		console.error('Error fetching Cookie top agents:', error)
		return NextResponse.json({ success: false, error: 'Failed to fetch Cookie data' }, { status: 500 })
	}
}
