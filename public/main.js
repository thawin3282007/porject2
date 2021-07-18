if ("geolocation" in navigator) {
    // console.log('geolocation available');
    navigator.geolocation.getCurrentPosition(async (position) => {
        let lat, long, weather, air;
        try {
            // console.log(position);
            lat = position.coords.latitude;
            long = position.coords.longitude;

            document.getElementById("latitude").textContent = lat.toFixed(2);
            document.getElementById("longitude").textContent = long.toFixed(2);

            const api_url = `weather/${lat},${long}`;
            //const api_url = "/weather";
            const response = await fetch(api_url);
            const json = await response.json();

            weather = json.weather;
            const temp = weather.main.temp - 273;
            const air = json.air_quality.results[0].measurements[0];
            console.log(air);

            document.getElementById("summary").textContent =
                weather.weather[0].description;
            document.getElementById("temperature").textContent =
                temp.toFixed(2);
            document.getElementById("PM2.5").textContent = air.value;
            document.getElementById("unit").textContent = air.unit;
        } catch (error) {
            air = { value: -1 };
            document.getElementById("PM2.5").textContent = "NO VALUE";
        }

        const button = document.getElementById("submit");
        button.addEventListener("click", async (event) => {
            const data = { lat, long, weather, air };
            console.log(data);
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            };

            const response = await fetch("/api", options);
            const json = await response.json();
            console.log(json);
        });
    });
} else {
    console.log("geolocation not available");
}
