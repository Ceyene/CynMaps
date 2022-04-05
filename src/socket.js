//listening events
module.exports = (io) => {
	io.on("connection", (socket) => {
		console.log("New user connected");

		//getting coordinates of new user
		socket.on("userCoordinates", (coords) => {
			//server receives coordinates and sends it to the rest of the users
			socket.broadcast.emit("newUserCoordinates", coords);
		});
	});
};
