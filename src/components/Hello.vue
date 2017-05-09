<template>

  <div>
    <p> {{ msg }} </p>

    <!-- Autocomplete https://www.npmjs.com/package/vue-google-autocomplete -->
    <p id="autocomplete"> Adresse:
         <vue-google-autocomplete id="autocomplete"  classname="form-control"
            placeholder="Start typing"
            v-on:placechanged="getFromData"
            enable-geolocation: true
            country: de
            v-model="autocompleteText"
        >
        </vue-google-autocomplete>
    </p>


    <!-- Funktionier noch nicht -->
    <div id="SearchResult" v-show="address"> {{ addressData }} </div>





    <p></p>
    <p id="map"> </p>

  </div>


</template>


<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'

    export default {
        components: { VueGoogleAutocomplete },
  name: 'map',
  data () {
    return {
      msg: 'Google Map Test',
      adress: '',
      autocompleteText: '',
    }

  },
  // map Start
  mounted: function() {
      this.initMap();
    },

  methods: {
    initMap: function () {
      map = new google.maps.Map(document.getElementById('map'),
      {center: {lat: 52.518755, lng: 13.398600}, zoom: 8,});
    },
    // Funktion fuer autocomplete. Funktioniert noch nicht.
    /**
    * When the location found
    * @param {Object} addressData Data of the found location
    * @param {Object} placeResultData PlaceResult object
    */
    getAddressData: function (addressData) {
      this.address = addressData;
    },
    getFromData: function (){
      alert('hello!')
    }


  }

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

#autocomplete {
  margin: auto;

  width: 500px;
}

#SearchResult {
  margin: auto;
  height: 300px;
  width: 500px;
}



#map {
  margin: auto;
  height: 300px;
  width: 500px;
}
</style>
