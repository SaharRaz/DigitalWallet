import dotenv from 'dotenv';
import path from 'path';

// Force load the .env from root
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
console.log('[DEBUG][config.js] Loaded MONGO_URI:', process.env.MONGO_URI);

export const env = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    NOTIFICATION_SERVICE_URL: process.env.NOTIFICATION_SERVICE_URL,
    USERS_SERVICE_URL: process.env.USERS_SERVICE_URL,
};
