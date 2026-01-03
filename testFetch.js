const fetch = require('node-fetch');

const testFetch = async () => {
    try {
        const res = await fetch('http://localhost:5000/api/health');
        console.log('Health Status:', res.status);
        const data = await res.json();
        console.log('Health Data:', data);
        
        const res2 = await fetch('http://localhost:5000/api/event-highlights');
        console.log('Highlights Status:', res2.status);
        const data2 = await res2.text(); // Text to see the HTML if any
        console.log('Highlights Data (first 100 chars):', data2.substring(0, 100));
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

testFetch();
