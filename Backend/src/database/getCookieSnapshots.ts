interface CookieSnapshot {
    id: number;
    token_address: string;
    timestamp: Date;
    agent_name: string;
    mindshare: number;
    mindshare_delta_percent: number;
    market_cap: number;
    market_cap_delta_percent: number;
    price: number;
    price_delta_percent: number;
    liquidity: number;
    volume_24h: number;
    volume_24h_delta_percent: number;
    holders_count: number;
    holders_count_delta_percent: number;
    avg_impressions_count: number;
    avg_impressions_delta_percent: number;
    avg_engagements_count: number;
    avg_engagements_delta_percent: number;
    followers_count: number;
    smart_followers_count: number;
    contracts: any[];
    twitter_usernames: string[];
    top_tweets: any[];
    raw_data?: any;
}

export async function getCookieSnapshots(
    client: any,
    options: {
        limit?: number;
        offset?: number;
        start_date?: Date;
        end_date?: Date;
        token_address?: string;
    } = {}
): Promise<{ success: boolean; data?: CookieSnapshot[]; error?: string }> {
    try {
        let query = 'SELECT * FROM cookie_snapshots WHERE 1=1';
        const params: any[] = [];
        let paramCount = 1;

        if (options.token_address) {
            query += ` AND token_address = $${paramCount}`;
            params.push(options.token_address);
            paramCount++;
        }

        if (options.start_date) {
            query += ` AND timestamp >= $${paramCount}`;
            params.push(options.start_date);
            paramCount++;
        }

        if (options.end_date) {
            query += ` AND timestamp <= $${paramCount}`;
            params.push(options.end_date);
            paramCount++;
        }

        query += ' ORDER BY timestamp DESC';

        if (options.limit) {
            query += ` LIMIT $${paramCount}`;
            params.push(options.limit);
            paramCount++;
        }

        if (options.offset) {
            query += ` OFFSET $${paramCount}`;
            params.push(options.offset);
        }

        const result = await new Promise((resolve, reject) => {
            client.query(query, params, (err: any, res: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });

        const snapshots = (result as any).rows.map((row: any) => ({
            ...row,
            // contracts: JSON.parse(row.contracts),
            // twitter_usernames: JSON.parse(row.twitter_usernames),
            // top_tweets: JSON.parse(row.top_tweets),
            // raw_data: row.raw_data ? JSON.parse(row.raw_data) : null
        }));

        return {
            success: true,
            data: snapshots
        };
    } catch (error) {
        console.error('Error in getCookieSnapshots:', error);
        return {
            success: false,
            error: 'Failed to retrieve cookie snapshots'
        };
    }
} 

export async function getCookieTweets(tokenName: string, fromDate: string, toDate: string): Promise<any> {
    try {
        const apiKey = process.env.COOKIE_API_KEY;
        if (!apiKey) {
            throw new Error('COOKIE_API_KEY is not set in environment variables');
        }

        const url = `https://api.cookie.fun/v1/hackathon/search/${encodeURIComponent(tokenName)}`;
        const params = new URLSearchParams({
            from: fromDate,
            to: toDate
        });

        const response = await fetch(`${url}?${params}`, {
            headers: {
                'x-api-key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Here you might want to process or store the data
        // For now, we'll just return it
        return {
            success: true,
            data: data
        };
    } catch (error) {
        console.error('Error in getCookieTweets:', error);
        return {
            success: false,
            error: 'Failed to retrieve cookie tweets'
        };
    }
}


