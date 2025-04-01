const API_KEY = "141e9dfa23ed4e1894eb3ded7ca6089c";
async function getCountryFromCoords(lat, lon) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C+${lon}&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        return data.address.country || "Unknown Country";
    } catch (error) {
        console.error("Error fetching location:", error);
        return "Location not found";
    }
}

export function getUserLocation() {
    if (!navigator.geolocation) {
        console.error("Geolocation is not supported by this browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

            const country = await getCountryFromCoords(latitude, longitude);
            console.log("Country:", country);

            document.getElementById("user-country").textContent = `Country: ${country}`;
        },
        (error) => console.error("Geolocation error:", error.message)
    );
}