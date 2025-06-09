{/*import express from 'express';*/}
import axios from 'axios';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();


router.post('/verify-recaptcha', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ success: false, message: 'Missing reCAPTCHA token' });
  }

  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY; 
    if (!secretKey) {
      throw new Error('reCAPTCHA secret key not defined in environment variables.');
    }
    const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
      params: {
        secret: secretKey,
        response: token,
      },
    });

    if (response.data.success) {
      res.json({ success: true });
    } else {
      res.status(400).json({ success: false, message: 'reCAPTCHA verification failed' });
    }
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;