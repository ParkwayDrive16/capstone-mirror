// contains all API requests
rebu = (function() {
	
	// if true, calls will use admin API routes when possible
	var isAdmin = false;
	
	function addVehicleDescription(vehicle) {
		vehicle.description = vehicle.make + " " + vehicle.model + " (" + vehicle.year + ")";
	}
	
	return {
		
		setAdmin: function(value) {
			isAdmin = value;
		},
		
		isAdmin: function() {
			return isAdmin;
		},
		
		getVehicles: function(callback) {
			console.log("[api] getting all available vehicles");
			var vehicles = [];
			var request = new Request(isAdmin ? '/admin/api/vehicles/all' : '/api/vehicles');
			fetch(request)
			.then(res => res.json())
			.then(json => {
				for (var i = 0; i < json.length; i++) {
					var vehicle = json[i];
					
					// TODO: temporary fix for model mismatch
					addVehicleDescription(vehicle)
					vehicle.available = (vehicle.status == 0);
					
					vehicles.push(vehicle);
				};
				console.log(vehicles);
				callback(vehicles);
			});
		},
		
		getNearby: function(pos, callback) {
			console.log("[api] getting nearby vehicles");
			var vehicles = [];
			var headers = new Headers();
			headers.append("Content-Type", "application/json");
			var request = new Request('/api/vehicles/nearby', {
				method: 'post',
				headers: headers,
				body: JSON.stringify(pos)
			});
			
			fetch(request)
			.then(res => res.json())
			.then(json => {
				for (var i = 0; i < json.length; i++) {
					var vehicle = json[i];
					
					// TODO: temporary fix for model mismatch
					addVehicleDescription(vehicle)
					vehicle.available = true;
					
					// make the distance prettier
					vehicle.distance = vehicle.distance.toFixed(2) + " km";
					
					vehicles.push(vehicle);
				}
				console.log(vehicles);
				callback(vehicles)
			});
		},
		
		requestBooking: function(bookingRequest, callback) {
			console.log("[api] requesting booking", bookingRequest);
			var booking = {
			    timestamp: view.dateToString(new Date()),
			    registration: bookingRequest.registration,
			    customerId: bookingRequest.client,
			    duration: bookingRequest.duration
			}
			
			booking = JSON.stringify(booking);
			console.log("Booking:", booking);
						
			var headers = new Headers();
			headers.append("Content-Type", "application/json");
			var request = new Request('/api/bookings', {
				method: 'post',
				headers: headers,
				body: booking
			});
			
			fetch(request).then(res => {
				if (res.status == 200) {
					res.json()
					.then(callback(booking));
				} else {
					callback(null);
				}
			});
		},
		
		getBookings: function(user, callback) {
			console.log("[api] getting bookings for " + user);
			var request = new Request('/api/bookings?id=' + user);
			fetch(request)
			.then(res => res.json())
			.then(json => {
				callback(json);
			});
		},
		
		getCurrentBooking: function(callback) {
			console.log("[api] getting current booking");
			var request = new Request('/api/bookings/now');
			fetch(request)
			.then(res => {
				if (res.status == 200) {
					res.json()
					.then(booking => {
						addVehicleDescription(booking.vehicle);
						console.log(booking);
						callback(booking);
					})
				} else {
					console.log("No current booking");
				}
			});
		},
		
		extendCurrentBooking: function(extraDuration, callback) {
			console.log("[api] extending current booking");
			
			var headers = new Headers();
			headers.append("Content-Type", "application/json");
			
			var body = {
				extraDuration: extraDuration
			};
			
			var request = new Request('/api/bookings/extend', {
				method: 'POST',
				headers: headers,
				body: JSON.stringify(body)
			});
			
			fetch(request)
			.then(res => {
				if (res.status == 200) {
					return callback(true);
				}
				else {
					return callback(false);
				}
			});
		},
		
		endCurrentBooking: function(callback) {
			console.log("[api] ending current booking");
			
			var headers = new Headers();
			headers.append("Content-Type", "application/json");
			
			var request = new Request('/api/bookings/end');
			
			fetch(request)
			.then(res => {
				if (res.status == 200) {
					return callback(true);
				}
				else {
					return callback(false);
				}
			});
		}
	
	}
	
})();
