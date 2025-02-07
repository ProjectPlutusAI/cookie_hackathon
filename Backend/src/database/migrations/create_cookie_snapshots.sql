CREATE TABLE cookie_snapshots (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    agent_name VARCHAR(255),
    mindshare DECIMAL,
    mindshare_delta_percent DECIMAL,
    market_cap DECIMAL,
    market_cap_delta_percent DECIMAL,
    price DECIMAL,
    price_delta_percent DECIMAL,
    liquidity DECIMAL,
    volume_24h DECIMAL,
    volume_24h_delta_percent DECIMAL,
    holders_count INTEGER,
    holders_count_delta_percent DECIMAL,
    avg_impressions_count DECIMAL,
    avg_impressions_delta_percent DECIMAL,
    avg_engagements_count DECIMAL,
    avg_engagements_delta_percent DECIMAL,
    followers_count INTEGER,
    smart_followers_count INTEGER,
    contracts JSONB,
    twitter_usernames JSONB,
    top_tweets JSONB,
    raw_data JSONB
);

-- Create index on timestamp for faster querying
CREATE INDEX idx_cookie_snapshots_timestamp ON cookie_snapshots(timestamp);

-- Create index on agent_name for faster lookups
CREATE INDEX idx_cookie_snapshots_agent_name ON cookie_snapshots(agent_name); 