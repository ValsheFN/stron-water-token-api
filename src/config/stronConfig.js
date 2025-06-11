import dotenv from 'dotenv';
dotenv.config();

export const baseUrl = process.env.STRON_API_URL;
export const companyName = process.env.STRON_COMPANY_NAME;
export const username = process.env.STRON_USERNAME;
export const password = process.env.STRON_PASSWORD;
