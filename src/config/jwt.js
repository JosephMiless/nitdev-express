import jwt from 'jsonwebtoken';
import { config } from './env.js';

export const aToken = (payload) => {
    try {

        return jwt.sign(payload, config.asecret, {expiresIn: '15m'});
        
    } catch (error) {

        console.error(`Error signing access token. Error: ${error}`);
        
    }
};