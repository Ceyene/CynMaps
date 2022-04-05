//creating a map template, with coordinates and zoom
const map = L.map("map-template").setView([-31.416668, -64.183334], 13);

//initializing connection for socket.io
const socket = io();

//choosing a map style
const tileURL = "https://a.tile.openstreetmap.de/{z}/{x}/{y}.png";

//adding our tile style layer to our map
L.tileLayer(tileURL, {
	attribution:
		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

//allowing user to add his/her own coordinates through asking to know his/her location
map.locate({ enableHighAccuracy: true });
//adding listener to locationFound event
map.on("locationfound", (e) => {
	const coords = [e.latlng.lat, e.latlng.lng]; //getting our user coordinates
	const marker = L.marker(coords); //creating a location marker
	marker.bindPopup("You are here!"); //adding to our marker a message
	map.addLayer(marker); //adding user location's marker with message layer to our map
	socket.emit("userCoordinates", e.latlng); //emiting event
});

//listening event
socket.on("newUserCoordinates", (coords) => {
	//creating new user's location marker
	console.log("A new user is connected");
	const marker = L.marker([coords.lat + 1, coords.lng + 1]); //moving coordinates to see the new marker when testing it myself

	//adding to new user's marker a message
	marker.bindPopup("Hello there, new user!");

	//adding new user's marker with message layer to our map
	map.addLayer(marker);
});
