<template>
  <div>
    <div class ='bg'>
      <div id="menubar">
        <span id="title">{{ headline }}</span>
        <span class="submenufirst">Contact us</span>
        <span class="submenu">About</span>
        <span class="submenu">Home</span>
      </div>

      <div class = 'standard'>
        <div class="backgroundpic"></div>
          <div id="input">
          <p class='subline'></p>


          <!-- Autocomplete https://www.npmjs.com/package/vue-google-autocomplete -->

          <!-- InputFrom: own location-->
          <div class="autocompleteInput">
          <VueGoogleAutocomplete id="InputA" classname="form-control"
                                   placeholder="Your Position"
                                   v-on:placechanged="getOrigin"
                                   country="de"
                                   enable-geolocation: true
          >
          </VueGoogleAutocomplete>
          <!-- InputTo: Destination-->
          <VueGoogleAutocomplete id="InputB" classname="form-control"
                                   placeholder="Your Destination"
                                   v-on:placechanged="getDestination"
                                   country="de"
                                   enable-geolocation: true
          >
          </VueGoogleAutocomplete>

          <button id="buttonFind" @click="getRoutes()">Finde meinen Weg!</button>
          </div>


        <div v-if="showResults" id="resultsFieldDescriptor">
          <span class="resultFieldMenue" id="transport">Transportmittel</span>
          <span class="resultFieldMenue" id="Start" >Startzeit</span>
          <span class="resultFieldMenue" id="End">Ankunftszeit</span>
          <span class="resultFieldMenue" id="duration">Dauer</span>
          <span class="resultFieldMenue">Kurzansicht</span>
          <span class="resultFieldMenue" id="price">Preis</span>
        </div>


        <!-- Show all availabe data in returned object-->
        <GetRoutes v-if="showResults"
                      class="resultsField"
                      :options=' [{
                          origin: {lat: car2go.coordinates.latitude, lng: car2go.coordinates.longitude},
                          destination: {lat: destination.latitude, lng: destination.longitude},
                          travelMode: "DRIVING",
                          provideRouteAlternatives: false
                      },{
                      origin: {lat: origin.latitude, lng: origin.longitude},
                      destination: {lat: destination.latitude, lng: destination.longitude},
                      travelMode: "DRIVING",
                      provideRouteAlternatives: false,
                      waypoints: [{
                          location: {lat: car2go.coordinates.latitude, lng: car2go.coordinates.longitude},
                          stopover: true
                          }]
                      },
                      {
                          origin: {lat: origin.latitude, lng: origin.longitude},
                          destination: {lat: car2go.coordinates.latitude, lng: car2go.coordinates.longitude},
                          travelMode: "WALKING",
                          provideRouteAlternatives: false
                      }]'
                      :counter="counter"
        ></GetRoutes>

        <GetRoutes v-if="showResults"
                      class="resultsField"
                      :options=' [{
                          origin: {lat: origin.latitude, lng: origin.longitude},
                          destination: {lat: destination.latitude, lng: destination.longitude},
                          travelMode: "TRANSIT",
                          provideRouteAlternatives: false
                      }]'
                      :counter="counter"

        ></GetRoutes>

        <GetRoutes v-if="showResults"
                      class="resultsField"
                      :options=' [{
                          origin: {lat: origin.latitude, lng: origin.longitude},
                          destination: {lat: destination.latitude, lng: destination.longitude},
                          travelMode: "BICYCLING",
                          provideRouteAlternatives: false
                      }]'
                      :counter="counter"

        ></GetRoutes>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
  import VueGoogleAutocomplete from 'vue-google-autocomplete';
  import vueResource from 'vue-resource';
  import GetRoutes from '../business/GetRoutes.vue';
  var Promise = require('promise');
  const RouteOptions = require('../business/RouteOptions.js');



  export default {
    components: {
      VueGoogleAutocomplete,
      GetRoutes,
    },
    props: {

    },
    name: 'Appcimo',
    data () {
      return {
        headline: 'AppCiMo',
        subline: 'Application for City Movement',
        msg: 'Please enter your location and destination.',
        origin: '',
        destination: '',
        car2go: {
            address: '',
            coordinates: {latitude: '', longitude: ''},
            engineType: 'CE',
            exterior: 'GOOD',
            fuel: 100,
            interior: 'GOOD',
            name: '123456',
            vin: 'WMEEJ3BA8DK643640'
        },
        showResults: false,
        counter: 0
      }

    },

    methods: {
      /*1. Get the results from the first vue-google-autocomplete input component and store them in the data attribute origin
        2. Get the next car-location based on the origin address Data
        3. Use the function aynchronous fucntion getCarLocation to get the actual latitude and longitude values.
           When the result was send by google, the latitude and longitude will be stored in the car2go data attribute.
        At the moment the car address is mocked in, caused by the missing car2go API.
      */
      getOrigin: function (addressData, placeResultData) {
        this.origin = addressData;
        var that = this;
        that.mockCarAddress(addressData);
        that.getCarLocation(that.car2go.address).then(function(result) {
          that.car2go.coordinates.latitude = result[0].geometry.location.lat();
          that.car2go.coordinates.longitude = result[0].geometry.location.lng();
        });
      },

      // Get the results from the second vue-google-autocomplete input component and store them in the data attribute destination
      getDestination: function (addressData, placeResultData) {
        this.destination = addressData;
      },

      /* 1. Start to mount and display the component GetRoutes by setting showResults true
         2. Increase the counter to trigger the changes and let GetRoutes know about the new data to calculate the new routes.
      */
      getRoutes: function () {
        this.showResults = true;
        this.counter++;
        //this.showResults = true; // results einblenden
      },

      //Moch the car location address by adding the number 5, Berlin to the street name from the origin-address
      mockCarAddress: function (originCar) {
        this.car2go.address = originCar.route + " 5, Berlin";
      },

      // Use asynchronous google geocode service to get the car-location as a google geocode object.
      // it is needed to get the actual latitude and longitude values for the mocked in car address.
      getCarLocation: function (Street) {
        var geocoder = new google.maps.Geocoder();
        return new Promise(function (resolve, reject) {
          geocoder.geocode({'address': Street}, function (result, status) { // called asynchronously
            if (status == google.maps.GeocoderStatus.OK) {
                resolve(result);

            } else {
              reject(status);
            }
          });
        });
      }

    }
  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  .bg {
    background-color: white;
    width: 100%;
    height: 100%;
  }

  #buttonFind {
    height: 40px;
    width: 150px;
    border-radius: 5px;
    border-style: groove;
    background-color: rgb(71,82,94);
    color: white;
  }
  .subline {
    font-family: "Impact", Charcoal, sans-serif;
    font-size: 2em;
    margin: 50px 0px 30px 0px;
    color: #4d4d4d;
  }

  .standard {
    color: black;
    width: 80%;
    background-color: white;
    margin-left: 10%;
    height: 100%;
    border: solid;
    border-color: white;
    position: relative;

  }

  #InputA {
    width: 300px;
    heigth: 50px;
  }

  #InputB {
    width: 300px;
    heigt: 50px;
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
    width: 120px;
    height: 30px;
    background-color: lightgrey;
    display: inline-block;
    text-align: center;
    margin-bottom: 5px;
    padding-top: 3px;

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

  #price {
    float: right;
    margin-right: 10%;
  }

  #menubar {
    height: 100px;
    background-color: rgba(0,81,187,0.5);
    width: 100%;
  }

  .menubar {
    height: 100px;
    width: 80%;
    margin-left: 10%;
  }

  #title {
    float: left;
    margin-left: 18%;
    margin-top: 40px;
    font-size: 4em;
  }

  .submenufirst {
    float: right;
    margin-right: 15%;
    margin-top: 40px;
    font-size: 2em;
  }
  .submenu {
    float: right;
    margin-right: 20px;
    margin-top: 40px;
    font-size: 2em;
  }

  .autocompleteInput {
    height: 50px;
    text-align: left;
    width: 80%;
    margin-left: 10%;
    margin-bottom: 20px;
  }

  .backgroundpic {
    height: 400px;
    background-image: url("../assets/appcimo-background-pic.png");
    background-size: cover;
    opacity: 0.3;
    width: 100%;
    position: absolute;
  }

  #input {
    position: absolute;
    margin-top: 200px;
    width: 100%;
  }

</style>
