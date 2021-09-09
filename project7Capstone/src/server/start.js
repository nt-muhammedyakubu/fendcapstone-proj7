const app = require("./index.js");
const allWeatherData = {};


const port = 8081;
const server = app.listen(port, listening);

function listening() {
    console.log('server running');
    console.log(`running on localhost: ${port}!`);
}