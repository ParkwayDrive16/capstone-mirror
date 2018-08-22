var map;

var urlAvail = '/img/vehicle-pin-available.png';
var urlUnavail = '/img/vehicle-pin-unavailable.png';

// keep track of the currently open info window
var currentInfoWindow = null;
// keep track of which button is currently visible
var nearbyButton = true;
// the marker which represents the user's location
var geoMarker = null;

function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
    
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);
    alert(id_token);
}

function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		console.log('User signed out.');
	});
}

function showNearbyButton() {
	if (!nearbyButton) {
		var button = document.getElementById("geo-button");
		button.innerHTML = 'NEARBY CARS';
		button.removeEventListener('click', geolocateHandler)
		button.addEventListener('click', nearbyHandler)
		nearbyButton = true;
	}
}

function showGeoButton() {
	if (nearbyButton) {
		var button = document.getElementById("geo-button");
		button.innerHTML = '<i class="material-icons md-18">my_location</i>FIND ME';
		button.removeEventListener('click', nearbyHandler)
		button.addEventListener('click', geolocateHandler)
		nearbyButton = false;
	}
}

function geolocateHandler(e) {
	e.preventDefault();
	map.panTo(geoMarker.marker.getPosition());
	showNearbyButton();
}

function nearbyHandler(e) {
	var pos = geoMarker.marker.getPosition()
	nearbyCars(pos);
}

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: new google.maps.LatLng(-37.813985, 144.960235),
		zoom: 15,
		disableDefaultUI: true
	});
	
	map.setOptions({styles: [
		{
			featureType: 'poi.business',
			stylers: [{visibility: 'off'}]
		}
	]});
	
	// listener which resets the 'geolocate' button on pan
	map.addListener('center_changed', () => {
		showGeoButton();
	});
	
	// draw user's location
	navigator.geolocation.watchPosition(pos => {
		displayLocation(pos);
	}, console.error, {enableHighAccuracy: true});
	
	rebu.getVehicles(function(vehicles) {
		for (var i = 0; i < vehicles.length; i++) {
			addMarker(vehicles[i], map);
		};
	})
}

function displayLocation(pos) {
	p = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
	acc = pos.coords.accuracy
	if (geoMarker) {
		geoMarker.marker.setPosition(p);
		geoMarker.circle.setCenter(p);
		geoMarker.circle.setRadius(acc);
	} else {
		geoMarker = {
			marker: new google.maps.Marker({
				position: p,
				map: map,
				icon: {
					url: "/img/geo-dot.png",
					size: new google.maps.Size(14, 14),
					anchor: new google.maps.Point(7, 7)
				}
			}),
			circle: new google.maps.Circle({
				fillColor: "#687BF1",
				fillOpacity: 0.2,
				strokeWeight: 0,
				map: map,
				center: p,
				radius: acc
			})
		};
	}
}

function addMarker(vehicle, map) {	
	var marker = new google.maps.Marker({
		position: vehicle.position,
		map: map,
		icon: {
			url: vehicle.available ? urlAvail : urlUnavail,
			size: new google.maps.Size(40, 40),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(20, 40)
		},
		title: vehicle.registration
	});
		
	marker.addListener('click', function() {
		console.log("Clicked on marker for", vehicle)
		// close the currently opened window
		if (currentInfoWindow) currentInfoWindow.close();
		
		// create info window & open it
		var content = view.infoWindow(vehicle, function(e) {
			e.preventDefault();
			bookingForm(vehicle);
		});
		var info = new google.maps.InfoWindow({content: content});
		info.open(map, marker);
		
		// update the current window var
		currentInfoWindow = info;
	});
}

function bookingForm(vehicle) {
	console.log("Getting booking form for", vehicle)
	// close the current info window
	if (currentInfoWindow) {
		currentInfoWindow.close();
		currentInfoWindow = null;
	}
	// create the form
	var vehicleInfo = view.vehicleInfo(vehicle);
	var bookingForm = view.bookingForm(vehicle);
	bookingForm.addEventListener("submit", function(e) {
		e.preventDefault();
		submitBooking(vehicle);
	});
	
	sidepane.clear();
	sidepane.appendHeader("BOOK YOUR CAR");
	sidepane.append(vehicleInfo);
	sidepane.append(bookingForm);
	sidepane.open();
}

function submitBooking(vehicle) {	
	// collect booking details
	var form = document.getElementById("booking-form");
	var timeSelect = document.getElementById("dropoff-time");
	var time = timeSelect.options[timeSelect.selectedIndex].value;
	var location = document.getElementById("dropoff-location").value;
	
	var bookingRequest = {
		duration: time,
		dropoff: location
	};
	
	rebu.requestBooking(bookingRequest, function(succeeded) {
		if (succeeded) {
			// show the confirmation screen
			var vehicleInfo = view.vehicleInfo(vehicle);
			sidepane.clear();
			sidepane.appendHeader("BOOK YOUR CAR");
			sidepane.append(vehicleInfo);
			sidepane.append(view.bookingConfirmed());
		} else {
			alert("Booking failed");
		}
	});
}

function nearbyCars(pos) {
	// fetch nearby cars
	rebu.getNearby(pos, function(nearby) {
		// show the response
		sidepane.clear();
		sidepane.appendHeader("NEARBY CARS");
		for (var i = 0; i < nearby.length; i++) {
			let vehicle = nearby[i];
			console.log(vehicle);
			var nearbyVehicle = view.nearbyVehicle(vehicle, function(e) {
				e.preventDefault();
				bookingForm(vehicle);
			});
			sidepane.append(nearbyVehicle);
		}
		sidepane.open();
	});
}

// initialize sidepane
sidepane.setOpenCallback(function() {
	document.getElementById('sidepane').style.width = null;
	document.getElementById('map-wrapper').style.left = '360px';
});
sidepane.setCloseCallback(function() {
	document.getElementById('sidepane').style.width = '0';
	document.getElementById('map-wrapper').style.left = null;
});

// Display the geolocate button initially
showGeoButton();

