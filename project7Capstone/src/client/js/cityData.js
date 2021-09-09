const geoUsername = 'nt_muhammedy';
const serverURL = 'http://127.0.0.1:8081';
const firstDate = new Date().toISOString().slice(0, 10)

// Setup empty JS object to act as endpoint for all results/route
const geoResResults = {};
const submitHandler = async e => {
    e.preventDefault();
    const city = document.getElementById('city').value;
    const tripStartDate = document.getElementById('tripStartDate').value;
    const tripEndDate = document.getElementById('tripEndDate').value;
    geoResResults['departureDate'] = tripStartDate;
    geoResResults['returnDate'] = tripEndDate;
    geoResResults['tripLength'] = dateDiffInDays(tripStartDate, tripEndDate);
    geoResResults['days'] = dateDiffInDays(firstDate, tripStartDate);
    //geoData(city);
    //console.log(city)
    updateUI(city);

}

const _MS_PER_DAY = 1000 * 60 * 60 * 24;

// a and b are javascript Date objects
function dateDiffInDays(a, b) {
    a = new Date(a);
    b = new Date(b);

    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
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

        // setTimeout(() => {
        //     displayData(geoResResults);
        // }, 2000)
        return geoResResults
    } catch (error) {
        console.log(error);
    }
};

const getWeatherBitData = async geoData => {
    const lat = geoData["lat"];
    const lon = geoData["long"];
    const APIKey = '151610c0df494fff92215cc8558b5e8e';
    const weatherbitBase = 'https://api.weatherbit.io/v2.0/forecast/daily?';
    const weatherbitFull = `${weatherbitBase}&lat=${lat}&lon=${lon}&key=${APIKey}`;
    const weatherbitData = await fetch(weatherbitFull);
    try {
        const bitData = await weatherbitData.json();
        geoResResults['high_temp'] = bitData['data'][0]['high_temp'];
        geoResResults['low_temp'] = bitData['data'][0]['low_temp'];
        geoResResults['description'] = bitData['data'][0]['weather']['description']
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
        geoResResults['pixCityImage'] = pixData['hits'][0]['webformatURL'];
    } catch (error) {
        console.log(`error: ${error}`)
    }
}
const displayData = geoData => {
    document.getElementById('trip').innerText = `My trip to: ${geoData['City']}, ${geoData['country']}`;
    document.getElementById('depart').innerText = `Departing: ${geoData['departureDate']}`;
    document.getElementById('return').innerText = `Returning: ${geoData['returnDate']}`;
    geoResResults['tripLength']
    document.getElementById('tripLength').innerText = `Length of trip: ${geoData['tripLength']} days`;
    document.getElementById('days').innerText = `${geoData['City']}, ${geoData['country']} is ${geoData['days']} days away`;
    document.getElementById('weather').innerText = `Typical weather for then is:`;
    document.getElementById('temp').innerText = `High: ${geoData['high_temp']}, Low: ${geoData['low_temp']}`;
    document.getElementById('description').innerText = `Mostly ${geoData['description']} throughout today`;
    document.getElementById('image').src = `${geoData['pixCityImage']}`;

}

// send retrieve data to backend

const postData = async serverData => {
    const resultPromise = await fetch(`${serverURL}/postData`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "data": serverData })

    })

    try {
        const result = await resultPromise.json();
        return result

    } catch (error) {
        console.log(`posting data to backend failed with error: ${error}`);
    }
};

// retrieve from backend and display
const getData = async() => {
    const weatherData = await fetch(`${serverURL}/getData`);
    try {
        const data = await weatherData.json();
        console.log(data)
        setTimeout(() => {
            displayData(geoResResults);
        }, 2000)
    } catch (error) {
        console.log(`data retrieval from backend failed with error : ${error}`)
    }
}

const updateUI = (event) => {
    geoData(event)
        .then(data => {
            postData(data)
        })
        .then(() => {
            getData()
        })
}

export { submitHandler }