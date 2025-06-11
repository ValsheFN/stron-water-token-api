import express from 'express';
import stronService from '../services/stronService.js';

const router = express.Router();

const getKeyCaseInsensitive = (obj, key) => {
  const foundKey = Object.keys(obj).find(k => k.toLowerCase() === key.toLowerCase());
  return foundKey ? obj[foundKey] : undefined;
};

router.post('/customer-credit', async (req, res) => {
  try {
    const customerId = getKeyCaseInsensitive(req.body, 'customerId');
    const result = await stronService.queryCustomerCredit(customerId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to query customer credit' });
  }
});

router.post('/customer-info', async (req, res) => {
  try {
    const customerId = getKeyCaseInsensitive(req.body, 'customerId');
    const result = await stronService.queryCustomerInfo(customerId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to query customer info' });
  }
});

router.post('/meter-credit', async (req, res) => {
  try {
    const meterId = getKeyCaseInsensitive(req.body, 'meterId');
    const result = await stronService.queryMeterCredit(meterId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to query meter credit' });
  }
});

router.post('/meter-info', async (req, res) => {
  try {
    const meterId = getKeyCaseInsensitive(req.body, 'meterId');
    const result = await stronService.queryMeterInfo(meterId);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to query meter info' });
  }
});

router.post('/vending', async (req, res) => {
  try {
    const meterId = getKeyCaseInsensitive(req.body, 'meterId');
    console.log(meterId)
    const isVendByUnit = getKeyCaseInsensitive(req.body, 'is_vend_by_unit');
    const amount = getKeyCaseInsensitive(req.body, 'amount');
    const result = await stronService.createToken(meterId, isVendByUnit, amount);
    res.json(result);
  } catch (err) {
    console.error('Error creating token:', err); // logs to console
    res.status(500).json({ error: `Failed to create token: ${err.message || err}` });
  }
});

export default router;