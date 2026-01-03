const fetch = require('node-fetch');

const checkHealth = async () => {
    try {
        const res = await fetch('http://localhost:5000/api/health');
        if (res.ok) {
            console.log('Backend is UP');
        } else {
            console.log('Backend returned status:', res.status);
        }
    } catch (error) {
        console.log('Backend is DOWN');
    }
};

checkHealth();
