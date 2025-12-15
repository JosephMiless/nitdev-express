import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT,
    asecret: process.env.ACCESS_SECRET,
    apiKey: process.env.API_KEY,
    nodeEnv: process.env.NODE_ENV,
    databaseURI: process.env.DATABASE_URL,
    db: {
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        pass: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    }
};