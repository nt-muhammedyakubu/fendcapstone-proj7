// Add event listener
document.getElementById('generate').addEventListener('click', removeTrip);

function removeTrip(e) {
    e.preventDefault()
    const removeTrip = document.getElementById('removeTrip').value

    Client.removeTrip(removeTrip)
    fetch('http://localhost:8080/removeTrip', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'removeTrip': removeTrip })
        })
        .then(res => {
            return res.json()
        })
        .then((allData) => {
            console.log(allData)

            document.getElementById('removeTrip').innerHTML = `removeTrip: ${allData.removeTrip}`;

        })
}