/**
 * Created by Daniel on 20.06.2017.
 */
function getOptions(start, ziel, waypoint, transport) {
  var origin;
  var destination;
  var waypoint;

  if (waypoint == null) {
    return {
      origin: {lat: start.coordinates.latitude, lng: start.coordinates.longitude},
      destination: {lat: ziel.latitude, lng: ziel.longitude},
      travelMode: transport,
    };
  }
  else {
    return {
      origin: {lat: start.latitude, lng: start.longitude},
      destination: {lat: ziel.latitude, lng: ziel.longitude},
      travelMode: "transport",
      waypoints: [{
        location: {lat: waypoint.coordinates.latitude, lng: waypoint.coordinates.longitude},
        stopover: true
      }]
    };
  }
}
