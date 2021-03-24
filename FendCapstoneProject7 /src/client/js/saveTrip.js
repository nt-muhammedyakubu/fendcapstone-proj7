// Add event listener
document.getElementById('generate').addEventListener('click', saveTrip);

function saveTrip(e) {
    e.preventDefault()
    const saveTrip = document.getElementById('saveTrip').value

    Client.saveTrip(saveTrip)
    fetch('http://localhost:8080/saveTrip', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'saveTrip': saveTrip })
        })
        .then(res => {
            return res.json()
        })
        .then((allData) => {
            console.log(allData)

            document.getElementById('saveTrip').innerHTML = `saveTrip: ${allData.saveTrip}`;

        })
}