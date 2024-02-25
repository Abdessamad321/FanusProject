// controllers/authController.js

const axios = require('axios');
const config = require('../config/config');
const Customer = require('../models/customer');

exports.googleCallbackHandler = async (req, res) => {
  try {
    const { code, code_verifier } = req.query;
    const { clientID } = config.google;

    const response = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: clientID,
      redirect_uri: 'http://localhost:3000/auth/google/callback',
      grant_type: 'authorization_code',
      code_verifier,
    });
    
    const { access_token } = response.data;
    // Use the access_token to fetch user data from Google API
    const userDataResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const userData = userDataResponse.data;

    // Validate user data before saving
    if (!userData || !userData.email || !userData.name) {
      throw new Error('Invalid user data received from Google OAuth');
    }

    // Save user data to the Customer collection
    const customer = await Customer.create({
      name: userData.name,
      email: userData.email,
      // Add other fields as needed
    });

    console.log('Customer data saved:', customer);
    
    // Show success toast
    res.json({ customer, success: true });
  } catch (error) {
    console.error('Error:', error);
    // Log error
    // Show error toast
    res.status(500).json({ message: 'Internal server error' });
  }
};
