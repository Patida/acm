<template>

  <div>
    <div class ='bg'>
      <div class = 'standard'>
        <p class='headline'> {{ headline }} </p>
        <p class='subline'> {{ subline }} </p>
        <p> {{ msg }} </p>

        <!-- Autocomplete https://www.npmjs.com/package/vue-google-autocomplete -->

        <!-- InputFrom: own location-->
        <div class="autocompleteInput">
        <vue-google-autocomplete id="InputA" classname="form-control"
                                 placeholder="Your Position"
                                 v-on:placechanged="getOrigin"
                                 country="de"
                                 enable-geolocation: true
        >
        </vue-google-autocomplete>
        <!-- InputTo: Destination-->
        <vue-google-autocomplete id="InputB" classname="form-control"
                                 placeholder="Your Destination"
                                 v-on:placechanged="getDestination"
                                 country="de"
                                 enable-geolocation: true
        >
        </vue-google-autocomplete>

        <button @click="getRoutes()">Finde meinen Weg!</button>
      </div>

        <div v-if="showResults" id="resultsFieldDescriptor">
          <span class="resultFieldMenue" id="transport">Transportmittel</span>
          <span class="resultFieldMenue" id="Start">Startzeit</span>
          <span class="resultFieldMenue" id="End">Ankunftszeit</span>
          <span class="resultFieldMenue" id="duration">Dauer</span>
          <span class="resultFieldMenue"></span>
          <span class="resultFieldMenue">Kurzansicht</span>
          <span class="resultFieldMenue">Preis</span>
        </div>

        <p></p>
        <!-- Show all availabe data in returned object-->
        <GetRoutes v-if="showResults"
                      class="resultsField"
                      :options=' [{
                          origin: {lat: car2go.coordinates.latitude, lng: car2go.coordinates.longitude},
                          destination: {lat: destination.latitude, lng: destination.longitude},
                          travelMode: "DRIVING",
                          provideRouteAlternatives: false
                      },
                      {
                      origin: {lat: origin.latitude, lng: origin.longitude},
                      destination: {lat: destination.latitude, lng: destination.longitude},
                      travelMode: "DRIVING",
                      provideRouteAlternatives: false,
                      waypoints: [{
                          location: {lat: car2go.coordinates.latitude, lng: car2go.coordinates.longitude},
                          stopover: true
                          }]
                      },{
                          origin: {lat: origin.latitude, lng: origin.longitude},
                          destination: {lat: car2go.coordinates.latitude, lng: car2go.coordinates.longitude},
                          travelMode: "WALKING",
                          provideRouteAlternatives: false
                      }]'

        ></GetRoutes>

        <GetRoutes v-if="showResults"
                      class="resultsField"
                      :options=' [{
                          origin: {lat: origin.latitude, lng: origin.longitude},
                          destination: {lat: destination.latitude, lng: destination.longitude},
                          travelMode: "TRANSIT",
                          provideRouteAlternatives: false
                      }]'

        ></GetRoutes>

        <GetRoutes v-if="showResults"
                      class="resultsField"
                      :options=' [{
                          origin: {lat: origin.latitude, lng: origin.longitude},
                          destination: {lat: destination.latitude, lng: destination.longitude},
                          travelMode: "BICYCLING",
                          provideRouteAlternatives: false
                      }]'

        ></GetRoutes>

      </div>
    </div>
  </div>
</template>
<script>
  import VueGoogleAutocomplete from 'vue-google-autocomplete';
  import vueResource from 'vue-resource';
  import GetRoutes from './GetRoutes.vue';

  export default {
    components: {
      VueGoogleAutocomplete,
      GetRoutes,
    },
    name: 'Appcimo',
    data () {
      return {
        headline: 'Appcimo',
        subline: 'Application for City Movement',
        msg: 'Please enter your location and destination.',
        origin: '',
        destination: '',
        car2go: '',
        showResults: false,
      }

    },

    methods: {

      getOrigin: function (addressData, placeResultData) {
        this.origin = addressData;
        this.getCarLocation(addressData); // Ist eine Startadresse angegeben soll relativ zu dieser der Autostandort ermittelt werden.
      },

      getDestination: function (addressData, placeResultData) {
        this.destination = addressData;
      },

      getRoutes: function () {
        this.showResults = true;
        //this.showResults = true; // results einblenden
      },

      // Simulieren des Autostandortes, da noch kein Zugang zur Car2Go API gewährt wurde
      getCarLocation: function (originCar) {
        var carAddress = originCar.route + " 5"
        var car = {
          address: carAddress,
          coordinates: '',
          engineType: 'CE',
          exterior: 'GOOD',
          fuel: 100,
          interior: 'GOOD',
          name: '123456',
          vin: 'WMEEJ3BA8DK643640'
        }
        var geocoder = new google.maps.Geocoder();
        var loc = {
          latitude: '',
          longitude: ''
        };
        geocoder.geocode({'address': carAddress}, function (results, status) {
          if (status == 'OK') {
            loc.latitude = results[0].geometry.location.lat();
            loc.longitude = results[0].geometry.location.lng();
          }
        });
        car.coordinates = loc;
        this.car2go = car;
      },

    }
  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

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
    padding: 50px;
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
    margin-top: 3px;
    margin-bottom: 3px;
  }

/* Ueberschreiben des autocomplete css, da die pos-vorschlaege verschoben wurden */
  .pac-container {
      position: relative;
      margin-top: -60px;
  }

    .tabs {
      padding-top: 10px;
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

  #Gmap {
    margin: auto;
    height: 500px;
    width: 500px;
  }

  #right-panel {
    margin: auto;
    width: 500px;
    height: 300px;

  }

  .resultsField {
    margin: auto;
    width: 100%;
  }

  #resultsFieldDescriptor {
    text-align: left;
    margin: auto;
    width: 80%;
  }

  .resultFieldMenue  {
    left: 100px;
    margin-right: 0px;
    width: 20px;
    background-color: lightgrey;
  }

  #transport {
    margin-left: 40px;
  }

  #Start {
    margin-left: 40px;
  }
  #duration {
    margin-right: 100px;
  }



</style>
