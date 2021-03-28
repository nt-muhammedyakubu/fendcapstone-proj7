import 'regenerator-runtime/runtime'
const app = require('../server/index.js'); // Link to server file
const supertest = require('supertest');
const request = supertest(app);
import 'regenerator-runtime/runtime'

it('gets the getData endpoint', async done => {
    // Sends GET Request to /test endpoint
    const res = await request.get('/getData')

    // ...
    done()
});