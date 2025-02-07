import { Router, Request, Response } from 'express';
import { Client } from 'pg';
import { fetchAndStoreTokenSymbolData } from '../cache/cache';

const router = Router();

router.post('/triggerDCA', async (req: any, res: Response) => {
    const { address, tokenAddress, amount, frequency } = req.body;
    const client2 = req.client2
      
    if (!address || !tokenAddress || !amount || !frequency) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
    }
    try {
        const query = `
            INSERT INTO dca_orders (user_id, token_address, amount, frequency,token_name, start_date)
            VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
            RETURNING id;
        `;
        const symbolData = await fetchAndStoreTokenSymbolData(tokenAddress)
        console.log(symbolData)
        const values = [1, tokenAddress, amount, `${frequency}`, symbolData.data[0].symbol];

        const result = await client2.query(query, values);

        res.json({
            success: true,
            message: 'DCA order created successfully',
            orderId: result.rows[0].id
        });
    } catch (error) {
        console.error('Error creating DCA order:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

export default router;
