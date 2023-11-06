import axios from 'axios';

const paypalApiUrl = 'https://api.paypal.com/v2/checkout/orders';

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

const initiatePayment = async (req, res) => {
  const { amount } = req.body;

  try {
    const response = await axios.post(paypalApiUrl, {
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: amount.toString(),
        },
      }],
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
    });

    // get the payment approval URL)
    const approvalUrl = response.data.links.find(link => link.rel === 'approve').href;

    res.status(200).json({ approvalUrl });
  } catch (error) {
   
    console.error('PayPal API Error:', error);
    res.status(500).json({ error: 'Failed to create PayPal payment' });
  }
};

export default initiatePayment;
