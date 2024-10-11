// clock.js
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = String(hours).padStart(2, '0');

    const clock = document.getElementById('clock');
    clock.innerHTML = `${hours}:${minutes}:${seconds} <span class="ampm">${ampm}</span>`;
}

// Update the clock immediately and then every second
updateClock();
setInterval(updateClock, 1000);
