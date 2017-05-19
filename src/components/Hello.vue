<template>

  <div>
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
    <button v-on:click="calculateAndDisplayRoute">Go</button>

    <!-- Google Map canvas-->
    <div id="map"></div>

    <!-- Show all availabe data in returned object-->
    <div class="data">{{ addressA }}</div>
  </div>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete';

  export default {
    components: { VueGoogleAutocomplete },
    name: 'map',
    data () {
      return {
        msg: 'Please enter your location and destination.',
        address: '',
        addressA: '',
        addressB: '',
        autocompleteText: '',
        geo: '',

      }

    },
    // map Start
    mounted: function() {
      this.initMap();

    },

    methods: {
      initMap: function () {
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var directionsService = new google.maps.DirectionsService;
        var map = new google.maps.Map(document.getElementById('map'),
        {center: {lat: 52.518755, lng: 13.398600}, zoom: 8,});
        directionsDisplay.setMap(map);



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


      // Direction Service
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

    },

}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



h1, h2 {
  font-weight: normal;
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
