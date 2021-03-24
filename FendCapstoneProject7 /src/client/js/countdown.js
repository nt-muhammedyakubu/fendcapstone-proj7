function countdown() {
    const now = new Date();
    const tripDate = new Date(2021, 03, 23);

    const currentTime = now.getTime();
    const eventTime = tripDate.getTime();
    const remTime = eventTime - currentTime;

    const s = Math.floor(remTime / 1000);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);
    const d = Math.floor(h / 24);

    h %= 24;
    m %= 60;
    s %= 60;

    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;

    document.getElementById('days').innerHTML = d;
    document.getElementById('hours').innerHTML = h;
    document.getElementById('minutes').innerHTML = m;
    document.getElementById('seconds').innerHTML = s;

    setTimeout(countdown, 1000);

}
countdown();