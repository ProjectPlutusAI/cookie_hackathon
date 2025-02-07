export type BasicTokenData = {
	address: string
	currentPrice: number
	decimals: string
	description: string
	name: string
	socials: string
	supply: string
	symbol: string
}

export type Eval = {
	moonEval: string
	communityEval: string
	holderEval: string
	rugEval: string
	technicalEval: string
}

export type RawData = {
	communityRaw: string
	holderRaw: string
	rugRaw: string
	technicalRaw: string
	cookieMetrics: any
}

export type Summary = {
	additionalSummary: string
	communitySummary: string
	holderSummary: string
	rugSummary: string
	technicalSummary: string
}

export type Analysis = {
	eval: Eval
	rawData: RawData
	summary: Summary
	waiting: boolean
}

export type ChartDataPoint = {
	c: number
	v: number
	unixTime: number
	type: string // '5m'
}

export type TokenData = {
	lastUpdated: string
	basicTokenData?: BasicTokenData
	chartData?: ChartDataPoint[]
	analysis?: Analysis
}

export type NotableForks = {
	name: string
	stars: number
	url: string
}

export type CommunityEngagement = {
	contributors: number
	commits: number
	recentActivity: number
}

export type GithubData = {
	owner: string
	repo: string
	stars: number
	forks: number
	openIssues: number
	openPRs: number
	closedIssues: number
	avgIssueResolutionTime: number
	notableForks: NotableForks[]
	communityEngagement: CommunityEngagement
}

export interface Message {
	sender: 'user' | 'bot'
	text?: string
	tokenData?: TokenData
	githubDataBasic?: GithubData
	githubDataAdvanced?: GithubData
	githubAnalysis?: GithubData
	cookieData?: any
	triggerInfo?: {
		action: string
		token_name: string
		token_amount: number
		analysis: string
		created_time: string
		amount: number
	}
}
