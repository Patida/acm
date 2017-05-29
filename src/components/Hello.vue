<template>

  <div>
    <div class ='bg'>
    <div class = 'standard'>
    <p class='headline'> {{ headline }} </p>

    <p class='subline'> {{ subline }} </p>



    <p> {{ msg }} </p>

    <!-- Autocomplete https://www.npmjs.com/package/vue-google-autocomplete -->

          <!-- InputFrom: own location-->
      <vue-google-autocomplete id="InputA" classname="form-control"
            placeholder="Your Position"
            v-on:placechanged="getAddressDataA"
            country="de"
            enable-geolocation: true
        >
      </vue-google-autocomplete>

<p></p>

<div>{{ "Latitute: " + addressA.latitude }}</div>
<div>{{ "Longitute: " + addressA.longitude }}</div>

<p></p>
      <!-- InputTo: Destination-->
      <vue-google-autocomplete id="InputB" classname="form-control"
            placeholder="Your Destination"
            v-on:placechanged="getAddressDataB"
            country="de"
            enable-geolocation: true
        >
      </vue-google-autocomplete>

    <p></p>

<!-- Filter coordinates for later usage-->
    <div>{{ "Latitute: " + addressB.latitude }}</div>
    <div>{{ "Longitute: " + addressB.longitude }}</div>
    <p></p>

    <div id="Choose-Travel-mode">
      <b>Mode of Travel: </b>
      <select id="mode">
        <option value="DRIVING">Driving</option>
        <option value="TRANSIT">Transit</option>
      </select>
    </div>

    <!-- TEST BUTTONS -->
    <button v-on:click="calculateAndDisplayRoute">Test Google Marker and Route</button>
    <button v-on:click="getDistance(addressA, addressB)">Test Google Directions API (console)</button>
    <button v-on:click="showDirection">Test Wegbeschreibung anzeigen</button>

    <!-- Google Map canvas-->
    <div id="map"></div>

    <!-- Show all availabe data in returned object-->
    <div class="data">{{ addressA }}</div>
    <div class="directionWindow">- Placeholder Google Direction Service -</div>
  </div>
</div>
</div>

</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete';
//import vueResource from 'vue-resource';


  export default {
    components: { VueGoogleAutocomplete },
    name: 'map',
    data () {
      return {
        headline: 'Appcimo',
        subline: 'Application for City Movement',
        msg: 'Please enter your location and destination.',
        address: '',
        addressA: '',
        addressB: '',
        autocompleteText: '',

        testobject: '',

      }

    },

    mounted: function() {
      // Map initialisieren
      this.initMap();

      // Wegbeschreibung initialisieren
      var directionsDisplay;
      var directionsService = new google.maps.DirectionsService();

    },

    methods: {
      initMap: function () {
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'),
        {center: {lat: 52.518755, lng: 13.398600}, zoom: 8,});


        // Direction Service von Google Maps Tutorials zur Anzeige von Markern und Routen auf der Karte.
        // Momentan noch ERROR
        directionsDisplay.setMap(map);
        calculateAndDisplayRoute(directionsService, directionsDisplay);
        document.getElementById('mode').addEventListener('change', function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        });
      },


      /**
      * When the location found
      * @param {Object} addressData Data of the found location
      * @param {Object} placeResultData PlaceResult object
      */
      getAddressDataA: function (addressData, placeResultData) {
        console.log(addressData, placeResultData);
        this.addressA = addressData;
      },

      getAddressDataB: function (addressData, placeResultData) {
        console.log(addressData, placeResultData);
        this.addressB = addressData;
      },


      // Direction Service von Google Maps Tutorials zur Anzeige von Markern und Routen auf der Karte.
      // Momentan noch ERROR


      calculateAndDisplayRoute: function  (directionsService, directionsDisplay) {
        console.log("directionsService", directionsService);

        var selectedMode = document.getElementById('mode').value;
        directionsService.route({
          origin: {lat: 37.77, lng: -122.447},
          destination: {lat: 37.768, lng: -122.511},
          // Note that Javascript allows us to access the constant
          // using square brackets and a string value as its
          // "property."
          travelMode: google.maps.TravelMode[selectedMode]
        }, function(response, status) {
          if (status == 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      },





      /*
      // JSON HTTP Abfrage
      requestData: function(origin, destination) {
        var data;
        // GET /someUrl
        var directionWay = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins="+origin.latitude+","+origin.longitude+"&destinations="+destination.latitude+","+destination.longitude+"&key=AIzaSyC2LiKg0HU1IxAhC7IYczuGF82wg9q7Axs"
        this.$http.get(directionWay).then(response => {

          // get body data
          // URL https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=Washington,DC&destinations=New+York+City,NY&key=AIzaSyC2LiKg0HU1IxAhC7IYczuGF82wg9q7Axs
          data = response.body;
          console.log(data.destination_addresses);
          console.log(data.origin_addresses);

          // distance gibt aus: Entfernung in km + Zeit in Sekunden.
          console.log(data.rows[0].elements[0].distance);
        }, response => {
          // error callback
        });

      },
      */

      getDistance: function(origin, destination) {
        var data;
        var service = new google.maps.DistanceMatrixService;

        var origin1 = {lat: origin.latitude, lng: origin.longitude};
        var dest1 = {lat: destination.latitude, lng: destination.longitude};
        service.getDistanceMatrix({
            origins: [origin1],
            destinations: [dest1],
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
          }, function(response, status){
          if (status == 'OK') {
            console.log("Transpormittel: Driving")
            console.log("Der Weg beträgt: "+response.rows[0].elements[0].distance.text);
            console.log("Die Fahrzeit beträgt: " + response.rows[0].elements[0].duration.text);
          }
          else
          {
            window.alert('Directions request failed due to ' + status);
          }

        });

      },

      // Funktioniert momentan noch nicht
      showDirection: function() {

        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();

        // Testdaten
        var start = "Berlin";
        var end = "Hamburg";

        var request = {
          origin:start,
          destination:end,
          travelMode: 'DRIVING'
        };
        directionsService.route(request, function(response, status) {
          if (status == 'OK') {
            directionsDisplay.setDirections(response);
          }
          else {
      window.alert('Directions request failed due to ' + status);
    }
        });
    },

/*
TO DO
Wegbeschreibung einfügen

*/



    }
}


</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.bg {
  background-color: #e6e6e6;
  width: 100%;
  height: 100%;
}

.headline {
  width: 80%;
  font-family: "Impact", sans-serif;
  font-size: 5em;
  margin: auto;
  color: brown;
  letter-spacing: 5px;
  border-style: solid;
  border-top-color: white;
}

.subline {
  font-family: "Impact", Charcoal, sans-serif;
  font-size: 2em;
  margin: 5px 0px 30px 0px;
  color: #4d4d4d;


}

.standard {
  color: black;
  width: 80%;
  background-color: white;
  margin: auto;
  height: 100%;
  border-style: solid;
  border-color: brown;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

button {
  margin-top: 5px;
  margin-bottom: 5px;
}

#InputA {
  margin: auto;
  width: 300px;
}

#InputB {
  margin: auto;
  width: 300px;
}

#SearchResult {
  margin: auto;
  height: 300px;
  width: 500px;
}

.data {
  margin: auto;
  width: 500px;
}

.directionWindow {
  margin: auto;
  margin-top: 30px;
  width:500px;
  height: 300px;
}

#map {
  margin: auto;
  height: 300px;
  width: 500px;
}

#right-panel {
  margin: auto;
  width: 500px;
  height: 300px;

}
</style>
