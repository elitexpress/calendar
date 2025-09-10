// script.js for Hebrew Academy Dashboard

// Function to update the real-time clock
function updateClock() {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    document.getElementById('clock').innerText = now.toLocaleTimeString([], options);
}
setInterval(updateClock, 1000);

// Sample schedule
const schedule = [
    { class: "Math", start: "08:00", end: "09:00" },
    { class: "Science", start: "09:15", end: "10:15" },
    // Add more classes as needed
];

// Function to manage schedule display
function displaySchedule() {
    const scheduleContainer = document.getElementById('schedule');
    scheduleContainer.innerHTML = '';
    schedule.forEach(item => {
        const classDiv = document.createElement('div');
        classDiv.innerText = `${item.class}: ${item.start} - ${item.end}`;
        scheduleContainer.appendChild(classDiv);
    });
}

// Function to detect current class
function detectCurrentClass() {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    const currentClass = schedule.find(item => 
        currentTime >= item.start && currentTime <= item.end
    );
    document.getElementById('current-class').innerText = currentClass ? currentClass.class : "No current class";
}

// Fetch weather data
async function fetchWeather() {
    const response = await fetch('https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=YOUR_LOCATION');
    const data = await response.json();
    document.getElementById('weather').innerText = `Weather: ${data.current.temp_c}°C, ${data.current.condition.text}`;
}

// Function to update dynamic content
function updateDynamicContent() {
    displaySchedule();
    detectCurrentClass();
    fetchWeather();
}

// Initializations
updateClock();
setInterval(updateDynamicContent, 60000); // Update every minute
updateDynamicContent();
