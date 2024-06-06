// Created with the help of YouTube tutorials from The Coding Train - Working With Data & APIs in JavaScript
// See: https://www.youtube.com/watch?v=uxf0--uiX0I&list=PLRqwX-V7Uu6YxDKpFzf_2D84p0cyk4T7X&index=6

class FetchedJSONDataChart
{
    constructor()
    {
        this.DisplayData();
    }

    async DisplayData()
    {
        const data = await this.GetData();
    }

    async GetData()
    {
        // Fetch data from https://api.wheretheiss.at and await its response.
        // See Fetch API, Response: https://developer.mozilla.org/en-US/docs/Web/API/Response
        const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
        const data = await response.json();

        // console.log(data);
        // console.log(data.latitude);
        // console.log(data.longitude);

        document.getElementById('ValueLatitude').textContent = data.latitude;
        document.getElementById('ValueLongitude').textContent = data.longitude;

        // Create a map using Leaflet with the initial view set to 0,0 
        // latitude longitude and zoomlevel 1 which is basically no zoom.
        const map = L.map('ContainerDivISSMap').setView([0, 0], 1);

        // Create tiles for the map from https://openstreatmap.org
        const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', 
        {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });

        // Add the tiles to the map
        tiles.addTo(map);

        // Create a Leaflet map marker for displaying the position of the ISS. 
        // See: https://leafletjs.com/reference.html#marker 
        const marker = L.marker([data.latitude, data.longitude]);
        marker.addTo(map);
    }
            
}