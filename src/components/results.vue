<template>
  <div>
    {{ msg }}
    <!-- TEST BUTTONS -->
    <button v-on:click="calculateAndDisplayRoute">Test Google Marker and Route</button>
    <button v-on:click="getCar2Go()">Test Google Directions API (console)</button>
  </div>

</template>
<script>
  export default {
    data () {
    return  {
        msg: 'Hier sehen Sie die Ergebnisse:'
    }
    },

    name: 'result',
    methods: {
      getDistance: function (origin, destination) {
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
        }, function (response, status) {
          if (status == 'OK') {
            console.log("Transpormittel: Driving")
            console.log("Der Weg beträgt: " + response.rows[0].elements[0].distance.text);
            console.log("Die Fahrzeit beträgt: " + response.rows[0].elements[0].duration.text);
          }
          else {
            window.alert('Directions request failed due to ' + status);
          }

        });

      },

      getCar2Go: function () {
        var car2go = require("car2go").createClient({
          // key: MY_OAUTH_KEY,
          //secret: MY_OAUTH_SECRET
        });

// get a list of available cars in Toronto in JSON format
        car2go.vehicles({
          format: "json",
          loc: "Toronto"
        }, function (err, cars) {
          if (err) {
            return console.log(err);
          }

          console.log(cars);
        });
      }
    }
  }
</script>

<style>


</style>
