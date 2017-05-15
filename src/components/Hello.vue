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

    <!-- Google Map canvas-->
    <div id="map"></div>

    <!-- Show all availabe data in returned object-->
    <div class="data">{{ address }}</div>
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
        var map = new google.maps.Map(document.getElementById('map'),
        {center: {lat: 52.518755, lng: 13.398600}, zoom: 8,});
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
</style>
