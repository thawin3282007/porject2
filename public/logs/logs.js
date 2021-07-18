const mymap = L.map("mymap").setView([0, 0], 1);
const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

getData();
async function getData() {
    const response = await fetch("/api");
    const data = await response.json();

    for (item of data) {
        console.log(item);
        const marker = L.marker([item.lat, item.long]).addTo(mymap);
        temp = item.weather.main.temp - 273;
        let txt = `The weather here at latitud 
        ${item.lat.toFixed(2)}&deg;, and longtitude 
        ${item.long.toFixed(2)}&deg; is <strong>
        ${item.weather.weather[0].description}</strong>
        with the temperature of ${temp.toFixed(2)}&deg; C`;

        if (item.air.value < 0) {
            console.log("No aq");
            txt += " with no air quality reading.";
        } else {
            txt += `with PM2.5 of ${item.air.value} ${item.air.unit}`;
        }

        marker.bindPopup(txt);
        //     console.log(item);
        //     const root = document.createElement("p");
        //     const geo = document.createElement("div");
        //     const date = document.createElement("div");
        //     geo.textContent = `${item.lat}, ${item.long}`;
        //     const dataString = new Date(item.timestamp).toLocaleDateString();
        //     date.textContent = dataString;
        //     root.append(geo, date);
        //     document.body.append(root);
    }
    console.log(data);
}
