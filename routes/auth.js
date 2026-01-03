const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// @route   POST api/auth/login
// @desc    Authenticate admin & get token
// @access  Public
router.post('/login', (req, res) => {
    const { password } = req.body;

    // Simple password check against env variable
    if (password === process.env.ADMIN_PASSWORD) {
        // Create payload
        const payload = {
            admin: {
                id: 'admin_id_placeholder' // We don't have user IDs really
            }
        };

        // Sign Token
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '24h' }, // Token valid for 24 hours
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } else {
        return res.status(400).json({ msg: 'Invalid Credentials' });
    }
});

// @route   POST api/auth/verify
// @desc    Verify existing token
// @access  Public
router.post('/verify', (req, res) => {
    const { token } = req.body;
    if(!token) return res.json({ isValid: false});
    
    try {
        jwt.verify(token, process.env.JWT_SECRET);
        res.json({ isValid: true });
    } catch (e) {
        res.json({ isValid: false });
    }
});


module.exports = router;
