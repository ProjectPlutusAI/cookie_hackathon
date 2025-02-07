export interface CookieSnapshot {
    token_address: string;
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
    timestamp?: Date;
    
}

export async function insertCookieSnapshot(client: any, snapshot: CookieSnapshot): Promise<string> {
    return new Promise((resolve) => {
        client.query(
            `INSERT INTO cookie_snapshots (
                token_address,
                agent_name,
                mindshare,
                mindshare_delta_percent,
                market_cap,
                market_cap_delta_percent,
                price,
                price_delta_percent,
                liquidity,
                volume_24h,
                volume_24h_delta_percent,
                holders_count,
                holders_count_delta_percent,
                avg_impressions_count,
                avg_impressions_delta_percent,
                avg_engagements_count,
                avg_engagements_delta_percent,
                followers_count,
                smart_followers_count,
                contracts,
                twitter_usernames,
                top_tweets,
                raw_data
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)`,
            [
                snapshot.token_address,
                snapshot.agent_name,
                snapshot.mindshare,
                snapshot.mindshare_delta_percent,
                snapshot.market_cap,
                snapshot.market_cap_delta_percent,
                snapshot.price,
                snapshot.price_delta_percent,
                snapshot.liquidity,
                snapshot.volume_24h,
                snapshot.volume_24h_delta_percent,
                snapshot.holders_count,
                snapshot.holders_count_delta_percent,
                snapshot.avg_impressions_count,
                snapshot.avg_impressions_delta_percent,
                snapshot.avg_engagements_count,
                snapshot.avg_engagements_delta_percent,
                snapshot.followers_count,
                snapshot.smart_followers_count,
                JSON.stringify(snapshot.contracts),
                JSON.stringify(snapshot.twitter_usernames),
                JSON.stringify(snapshot.top_tweets),
                snapshot.raw_data ? JSON.stringify(snapshot.raw_data) : null
            ],
            (err: any) => {
                if (err) {
                    console.log('Error in insertCookieSnapshot:', err);
                    resolve('Error');
                } else {
                    resolve('Success');
                }
            }
        );
    });
} 