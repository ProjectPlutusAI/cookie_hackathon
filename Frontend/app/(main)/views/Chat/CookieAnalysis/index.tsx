'use client'
import { useState } from 'react'
import { Flex } from '@/ui/primitives'
import { ThinkingDots } from '@/ui/magic'

interface CookieAgent {
	agentName: string
	contracts: any[]
	twitterUsernames: string[]
	mindshare: number
	mindshareDeltaPercent: number
	marketCap: number
	marketCapDeltaPercent: number
	price: number
	priceDeltaPercent: number
	liquidity: number
	volume24Hours: number
	volume24HoursDeltaPercent: number
	holdersCount: number
	holdersCountDeltaPercent: number
	averageImpressionsCount: number
	averageImpressionsCountDeltaPercent: number
	averageEngagementsCount: number
	averageEngagementsCountDeltaPercent: number
	followersCount: number
	smartFollowersCount: number
	topTweets: any[]
}

interface CookieData {
	data: CookieAgent[]
	currentPage: number
	totalPages: number
	totalCount: number
}

type CookieAnalysisProps = {
	cookieData: CookieData | null
	setInput: (input: string) => void
}

export const CookieAnalysis = ({ cookieData, setInput }: CookieAnalysisProps) => {
	console.log('cookieData', cookieData)
	const [expandedSection, setExpandedSection] = useState<number | null>(0)

	const formatNumber = (num: number) => {
		if (num >= 1000000) {
			return `${(num / 1000000).toFixed(2)}M`
		} else if (num >= 1000) {
			return `${(num / 1000).toFixed(2)}K`
		}
		return num.toFixed(2)
	}
	const formatDelta = (delta: number) => {
		const sign = delta > 0 ? '+' : ''
		const color = delta > 0 ? 'text-green-500' : 'text-red-500'
		return <span className={color}>{`${sign}${delta.toFixed(2)}%`}</span>
	}

	const sections = [
		{
			title: 'Top Agents by Mindshare',
			content: cookieData?.data.map((agent, index) => ({
				name: agent.agentName || `Agent ${index + 1}`,
				value: agent.mindshare,
				delta: agent.mindshareDeltaPercent
			}))
		},
		{
			title: 'Market Metrics',
			content: cookieData?.data.map((agent, index) => ({
				name: agent.agentName || `Agent ${index + 1}`,
				marketCap: agent.marketCap,
				marketCapDelta: agent.marketCapDeltaPercent,
				price: agent.price,
				priceDelta: agent.priceDeltaPercent,
				liquidity: agent.liquidity,
				volume: agent.volume24Hours,
				volumeDelta: agent.volume24HoursDeltaPercent
			}))
		},
		{
			title: 'Social Metrics',
			content: cookieData?.data.map((agent, index) => ({
				name: agent.agentName || `Agent ${index + 1}`,
				followers: agent.followersCount,
				smartFollowers: agent.smartFollowersCount,
				impressions: agent.averageImpressionsCount,
				impressionsDelta: agent.averageImpressionsCountDeltaPercent,
				engagements: agent.averageEngagementsCount,
				engagementsDelta: agent.averageEngagementsCountDeltaPercent
			}))
		}
	]

	return (
		<Flex className="w-full flex-col flex-1 items-start gap-4 text-offWhite cursor-pointer">
			{'Top Agents by Mindshare'}
			{cookieData.data.map((agent, index) => {
				return (
					<div key={index} onClick={() => setInput(agent.contracts[0].contractAddress)} className="w-[552px] h-12 rounded-[50px] border border-solid border-[#FFFFFF33] bg-[#1F2023] flex justify-between items-center px-4 py-3">
						<span className="d-flex">
							{index + 1 + '.'} {agent.agentName}
						</span>
						<span className="font-bold">
							{formatNumber(agent.mindshare)} {formatDelta(agent.mindshareDeltaPercent)}
						</span>
					</div>
				)
			})}
		</Flex>
	)
}
