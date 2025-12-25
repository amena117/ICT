// Native fetch in Node 18+

const endpoints = [
    'http://localhost:3000/api/news?page=1&limit=2',
    'http://localhost:3000/api/resources?page=1&limit=2',
    'http://localhost:3000/api/projects?page=1&limit=2',
    'http://localhost:3000/api/news?search=cyber'
];

async function verify() {
    for (const url of endpoints) {
        try {
            const res = await fetch(url);
            const data = await res.json();
            console.log(`URL: ${url}`);
            console.log('Status:', res.status);
            console.log('Data Type:', Array.isArray(data) ? 'Array' : typeof data);
            if (data.pagination) {
                console.log('Pagination:', JSON.stringify(data.pagination));
                console.log('Items Count:', data.data.length);
            } else {
                console.log('Raw Data Length:', data.length);
            }
            console.log('---');
        } catch (err) {
            console.log(`Failed to fetch ${url}:`, err.message);
        }
    }
}

verify();
