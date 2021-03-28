const geoUsername = 'nt_muhammedy';

// Setup empty JS object to act as endpoint for all results/route
const geoResResults = {};
const submitHandler = async e => {
    e.preventDefault();
    const city = document.getElementById('city').value;
    const tripStartDate = document.getElementById('tripStartDate').value;
    const tripEndDate = document.getElementById('tripEndDate').value;
    geoResResults['departureDate'] = tripStartDate;
    geoResResults['returnDate'] = tripEndDate;
    geoData(city);
    console.log(city)
        //updateUI(city);

}

const geoData = async city => {
    // const apiURL = 'http://api.geonames.org/searchJSON?q=Berlin&maxRows=10&fuzzy=0&username=nt_muhammedy';
    const apiURL = `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&fuzzy=0&username=${geoUsername}`;

    const geoResponse = await fetch(apiURL);
    try {
        const geoResults = await geoResponse.json();
        geoResResults["City"] = geoResults["geonames"][0]["toponymName"];
        geoResResults["country"] = geoResults["geonames"][0]["countryName"];
        geoResResults["long"] = geoResults["geonames"][0]["lng"];
        geoResResults["lat"] = geoResults["geonames"][0]["lat"];
        getWeatherBitData(geoResResults);
        pixabayURL(geoResResults);
        displayData(geoResResults);
        return geoResResults
    } catch (error) {
        console.log(error);
    }
};

const getWeatherBitData = async geoData => {
    const lat = await geoData["lat"];
    const lon = await geoData["long"];
    const APIKey = '151610c0df494fff92215cc8558b5e8e';
    const weatherbitBase = 'https://api.weatherbit.io/v2.0/forecast/daily?';
    const weatherbitFull = `${weatherbitBase}&lat=${lat}&lon=${lon}&key=${APIKey}`;
    const weatherbitData = await fetch(weatherbitFull);
    try {
        const bitData = await weatherbitData.json();
        geoData['high_temp'] = bitData['data'][0]['high_temp'];
        geoData['low_temp'] = bitData['data'][0]['low_temp'];
        geoData['description'] = bitData['data'][0]['weather']['description']
    } catch (error) {
        console.log(`error: ${error}`)
    }
}
const pixabayURL = async geoData => {
    const pixCityName = geoData['City'];
    const pixBayAPI = '20794987-b6947d0b2c84f1adfd4f3e75d';
    const pixBaseURL = `https://pixabay.com/api/?key=${pixBayAPI}&q=${pixCityName}`;
    const pixUrlData = await fetch(pixBaseURL);
    try {
        const pixData = await pixUrlData.json();
        geoData['pixCityImage'] = pixData['hits'][0]['webformatURL'];
    } catch (error) {
        console.log(`error: ${error}`)
    }
}
const displayData = geoData => {
    document.getElementById('trip').innerText = `My trip to: ${geoData['City']}, ${geoData['country']}`;
    document.getElementById('depart').innerText = `Departing: ${geoData['departureDate']}`;
    document.getElementById('return').innerText = `Returning: ${geoData['returnDate']}`;
    document.getElementById('days').innerText = `${geoData['City']}, ${geoData['country']} is 220 days away`;
    document.getElementById('weather').innerText = `Typical weather for then is:`;
    document.getElementById('temp').innerText = `High: ${geoData['high_temp']}, Low: ${geoData['low_temp']}`;
    document.getElementById('description').innerText = `Mostly ${geoData['description']} throughout today`;
    document.getElementById('image').src = `${geoData['pixCityImage']}`;
}

export { submitHandler }