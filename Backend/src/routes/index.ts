import express from 'express';
import triggerDCA from './triggerDCA'
import dotenv from 'dotenv';
import { Client } from 'pg';

dotenv.config();

// -- Create a PostgreSQL client (direct DB connection).
const client = new Client({
    connectionString: process.env.DATABASE_URL
});
const client2 = new Client({
    connectionString: process.env.BACKUP_URL,
  });
  client2.connect().catch((error) => {
    console.error('Failed to connect to DB:', error);
});
// Connect at startup.
client.connect().catch((error) => {
    console.error('Failed to connect to DB:', error);
});

const router = express.Router();

router.use((req:any, res, next) => {
    req.client = client;
    req.client2 = client2;
    next();
});


// Define base routes and delegate to specific route handlers
router.use('/', triggerDCA); // Routes for "/users"

// Default route for the base URL
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API!' });
});

export default router;