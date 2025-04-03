const API_KEY = "141e9dfa23ed4e1894eb3ded7ca6089c";

async function getCountryFromCoords(lat, lon) {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat},${lon}&key=${API_KEY}`;


    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();

        return data.results[0].components.country || "Narnia";
    } catch (error) {
        console.error("Error fetching location:", error);
        return "Location not found";
    }
}

export function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            console.error("Geolocation is not supported by this browser.");
            reject("Geolocation not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const country = await getCountryFromCoords(latitude, longitude);
                    resolve(country);
                } catch (error) {
                    reject("Error getting country information.");
                }
            },
            (error) => reject(`Geolocation error: ${error.message}`)
        );
    });
}
