/**
 * Created by Daniel on 20.06.2017.
 */

function GoogleRouteQuery(options) {
  var ergebnis;
  var directionsService = new google.maps.DirectionsService();
  directionsService.route(options, function (result, status) {
    if (status == 'OK') {
      ergebnis = result;
    }
  })
  return ergebnis;
}

function getShortinfo(googleResult) {
  if ((options.travelMode == "DRIVING" && !options.waypoints) || options.travelMode != "DRIVING") {
    var Ankuftszeit;
    var Startzeit;

    if (result.routes[0].legs[0].departure_time) {
      Startzeit = result.routes[0].legs[0].departure_time.text;
      Ankuftszeit = result.routes[0].legs[0].arrival_time.text;
    }
    else {
      var Zeit = new Date();
      Startzeit = Zeit.toLocaleString('de-DE').substring(11, 16);
      Ankuftszeit = new Date(Zeit.setTime(Zeit.getTime() + result.routes[0].legs[0].duration.value * 1000));
      Ankuftszeit = Ankuftszeit.toLocaleString('de-DE').substring(11, 160);
    }

    return {
      transportmethod: googleResult.request.travelMode,
      distance: googleResult.routes[0].legs[0].distance.value,
      duration: googleResult.routes[0].legs[0].duration.value,
      start: Startzeit,
      finish: Ankuftszeit,
    };
  }
  else {
    return null;
  }
}

function getDescription(googleResult) {
  if ((options.travelMode == "DRIVING" && !options.waypoints) || options.travelMode != "DRIVING") {
    return googleResult;
  }
  else {
    return null;
  }
}

function getMap(googleResult) {
  if (options.travelMode != "WALKING") {
    if ((options.travelMode == "DRIVING" && options.waypoints)|| options.travelMode == "BICYCLING" || options.travelMode == "TRANSIT") {
      return googleResult;
    }
  }
  else {
    return null;
  }
}

