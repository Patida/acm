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
      </div>

        <!-- BUTTONS -->
        <button v-on:click="getRoutes()">Finde meinen Weg!</button>

        <!-- vue-material button -->
        <!-- Funktion wird momentan noch nicht ausgefuehrt -->
        <md-button class="md-raised md-primary" v-on:click="getRoutes()">Finde meinen Weg!</md-button>


        <div id="resultsFieldDescriptor">
          <span class="resultFieldMenue">Transportmittel</span>
          <span class="resultFieldMenue">Startzeit</span>
          <span class="resultFieldMenue">Ankunftszeit</span>
          <span class="resultFieldMenue">Dauer</span>
          <span class="resultFieldMenue"></span>
          <span class="resultFieldMenue">Kurzansicht</span>
        </div>

        <p></p>
        <!-- Show all availabe data in returned object-->

        <resultComponent class="resultsField"
                         :directionRoute="OutputDRIVING"
                         :completeRoute="directionRouteCompleteCar">

        </resultComponent>
        <p></p>
        <resultComponent class="resultsField"
                         :directionRoute="OutputTRANSIT"
                         :completeRoute="directionRouteCompleteTransit">
        </resultComponent>

        <hr>

        <!-- AUS DIRECTIONSERVICE.VUE>
        <div id="map"></div>
        <div id="right-panel">
          <p>Total Distance: <span id="total"></span></p>
        </div>
        < ENDE DIRECTIONSERVICE.VUE-->

      </div>
    </div>
  </div>

</template>

<script>
  import VueGoogleAutocomplete from 'vue-google-autocomplete';
  import vueResource from 'vue-resource';
  import resultComponent from './resultComponent.vue';
  import DirectionService from './DirectionService.vue';


  export default {
    components: {
      VueGoogleAutocomplete,
      resultComponent,
      DirectionService,
    },
    name: 'Gmap',
    data () {
      return {
        headline: 'Appcimo',
        subline: 'Application for City Movement',
        msg: 'Please enter your location and destination.',
        address: '',
        origin: '',
        destination: '',
        autocompleteText: '',
        OutputDRIVING: '',
        OutputTRANSIT: '',
        showDrive: false,
        showTransit: false,
        directionRouteCompleteCar: '',
        directionRouteCompleteTransit: '',
      }

    },

    methods: {

      /**
       * When the location found
       * @param {Object} addressData Data of the found location
       * @param {Object} placeResultData PlaceResult object
       */
      getOrigin: function (addressData, placeResultData) {
        console.log(addressData, placeResultData);
        this.origin = addressData;
      },

      getDestination: function (addressData, placeResultData) {
        //console.log(addressData, placeResultData);
        this.destination = addressData;
      },

      getRoutes: function() {
        this.getRoute(this.origin, this.destination, "DRIVING");
        this.OutputTransit = this.getRoute(this.origin, this.destination, "TRANSIT");

      },

      getCarLocation: function (originCar) {
        var carAddress = originCar.route + " 5"
        var car = {
            address: carAddress,
            coordinates: [],
            engineType: 'CE',
            exterior: 'GOOD',
            fuel: 100,
            interior: 'GOOD',
            name: '123456',
            vin: 'WMEEJ3BA8DK643640'
        }

        var geocoder = new google.maps.Geocoder();
        var loc = [];
        geocoder.geocode({'address' : carAddress}, function(results, status) {
            if (status=='OK') {
              loc[0]=results[0].geometry.location.lat();
              loc[1]=results[0].geometry.location.lng();
            }
        });
        car.coordinates = loc;
        return car;
      },

      getRoute: function (origin1, dest1, transport) {
        var that = this;
        var directionsService = new google.maps.DirectionsService();
        var request = {
          origin: {lat: origin1.latitude, lng: origin1.longitude},
          destination: {lat: dest1.latitude, lng: dest1.longitude},
          travelMode: transport
        };
        directionsService.route(request, function(result, status) {
          var resultarray;
          if (status == 'OK') {

            //console.log(result.routes[0]);
            if (transport == 'TRANSIT') {
              that.directionRouteCompleteTransit = result;
              resultarray = {
                transportmethod: transport,
                distance: result.routes[0].legs[0].distance.value,
                duration: result.routes[0].legs[0].duration.text,
                start: result.routes[0].legs[0].departure_time.text,
                finish: result.routes[0].legs[0].arrival_time.text,
              };
              /*var steps = result.routes[0].legs[0].steps;
              console.log("Startadresse: " + result.routes[0].legs[0].start_address);
              for (var i = 0; i < steps.length; i++) {
                if (steps[i].travel_mode == 'WALKING') {
                  var walkduration = 0;
                  var walkdistance = 0;
                  for (var j = 0; j < steps[i].steps.length; j++) {
                    walkduration +=  steps[i].steps[j].distance.value
                    walkdistance += steps[i].steps[j].duration.value
                  }
                  if (i+1 < steps.length) {
                    console.log("Zu Fuß " + walkduration + "m in ca. " + (walkdistance) + "sec nach " + steps[i + 1].transit.departure_stop.name);
                  }
                  else {
                    console.log("Zu Fuß " + walkduration + "m in ca. " + (walkdistance) + "sec nach " + result.routes[0].legs[0].end_address);
                  }
                }
                if (steps[i].travel_mode == 'TRANSIT') {
                  console.log("Mit der " + steps[i].transit.line.vehicle.name + "  " + steps[i].transit.line.short_name +" Abfahrt um " + steps[i].transit.departure_time.text + " in " + steps[i].duration.text + " nach " + steps[i].transit.arrival_stop.name)

                }
              }*/
              that.OutputTRANSIT = resultarray;
            }
            if (transport == 'DRIVING') {
              that.directionRouteCompleteCar = result;
              var Zeit = new Date();
              var Startzeit = Zeit.getHours()+":"+Zeit.getMinutes();
              var Ankuftszeit = new Date(Zeit.setTime(Zeit.getTime()+ result.routes[0].legs[0].duration.value*1000));
              Ankuftszeit = Ankuftszeit.getHours()+":"+Ankuftszeit.getMinutes();

              resultarray = {
                transportmethod: transport,
                distance: result.routes[0].legs[0].distance.value,
                duration: result.routes[0].legs[0].duration.text,
                start: Startzeit,
                finish: Ankuftszeit,
              };
              //console.log("Mit dem Auto von " + result.routes[0].legs[0].start_address + " nach " + result.routes[0].legs[0].end_address + " sind es " + result.routes[0].legs[0].distance.text + " in " + result.routes[0].legs[0].duration.text);
              that.OutputDRIVING = resultarray;
            }
          }
        });
      },

    }
  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  .bg {
    background-color: #e6e6e6;
    width: 100%;
    height: 100%px;
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
    margin: auto;
    width: 100%;
  }

  .resultFieldMenue {
    left: 100px;
    margin-right: 0px;
    width: 20px;
    background-color: lightgrey;
  }

</style>
