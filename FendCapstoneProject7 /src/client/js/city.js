// Add event listener
document.getElementById('generate').addEventListener('click', cityLocation);

function cityLocation(e) {
    e.preventDefault()
    const cityLocation = document.getElementById('cityLocation').value

    Client.cityLocation(long, lat)
    fetch('http://localhost:8080/geonames_api', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'long': long, 'lat': lat })
        })
        .then(res => {
            return res.json()
        })
        .then((allData) => {
            console.log(allData)

            document.getElementById('long').innerHTML = `long: ${allData.long}`;
            document.getElementById('lat').innerHTML = `lat: ${allData.lat}`;
        })
}