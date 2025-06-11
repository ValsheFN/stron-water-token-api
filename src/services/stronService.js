import axios from 'axios';
import { baseUrl, companyName, username, password } from '../config/stronConfig.js';

const defaultAuth = {
  CompanyName: companyName,
  UserName: username,
  PassWord: password,
};

const postToStron = async (endpoint, data) => {
    const requestData = { ...defaultAuth, ...data };
    try {
        const response = await axios.post(`${baseUrl}${endpoint}`, requestData, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        });
        
        return response.data;
      } catch (error) {
        console.error('STRON API request failed:', error.message);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Status:', error.response.status);
          console.error('Headers:', error.response.headers);
        } else if (error.request) {
          console.error('No response received:', error.request);
        }
        throw new Error(`STRON API request failed: ${error.message}`);
      }
    };

const queryCustomerCredit = (customerId) =>
  postToStron('/api/QueryCustomerCredit', { CustomerId: customerId });

const queryCustomerInfo = (customerId) =>
  postToStron('/api/QueryCustomerInfo', { CustomerId: customerId });

const queryMeterCredit = (meterId) =>
  postToStron('/api/QueryMeterCredit', { MeterId: meterId });

const queryMeterInfo = (meterId) =>
  postToStron('/api/QueryMeterInfo', { MeterId: meterId });

const createToken = (meterId, isVendByUnit, amount) =>
  postToStron('/api/VendingMeter', { MeterId: meterId, is_vend_by_unit: isVendByUnit, Amount: amount });

export default {
    queryCustomerCredit,
    queryCustomerInfo,
    queryMeterCredit,
    queryMeterInfo,
    createToken
  };  