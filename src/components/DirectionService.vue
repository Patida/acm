<template>
  <div>

    <div class="test">{{ wegbeschreibung }}</div>
  test1


  <div id="map"></div>
  <div id="right-panel">
    <p>Total Distance: <span id="total"></span></p>
  </div>

  </div>
</template>

<script>
  export default {
    name: "DirectionService",
    props: {
      directionRoute: '',
    },

    data() {
      return {
          wegbeschreibung: 'one',
      }
    },


    methods: {

      initMap: function() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: {lat: 52.518755, lng: 13.398600}  // Berlin.
        });

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer({
          draggable: true,
          map: map,
          panel: document.getElementById('right-panel')
        });

        directionsDisplay.addListener('directions_changed', function() {
          computeTotalDistance(directionsDisplay.getDirections());
        });

        displayRoute('Perth, WA', 'Sydney, NSW', directionsService,
        directionsDisplay);
      },

      displayRoute: function(origin, destination, service, display) {
        service.route({
          origin: origin,
          destination: destination,
          waypoints: [{location: 'Adelaide, SA'}, {location: 'Broken Hill, NSW'}],
          travelMode: 'DRIVING',
          avoidTolls: true
        }, function(response, status) {
          if (status === 'OK') {
            display.setDirections(response);
          } else {
            alert('Could not display directions due to: ' + status);
          }
        });
      },

      computeTotalDistance: function(result) {
        var total = 0;
        var myroute = result.routes[0];
        for (var i = 0; i < myroute.legs.length; i++) {
          total += myroute.legs[i].distance.value;
        }
        total = total / 1000;
        document.getElementById('total').innerHTML = total + ' kms';
      },







    }
  }

</script>
<style scoped>
  .test {
    font-size: 1em;
  }


  #right-panel {
    font-family: 'Roboto','sans-serif';
    line-height: 30px;
    padding-left: 10px;
  }

  #right-panel select, #right-panel input {
    font-size: 15px;
  }

  #right-panel select {
    width: 100%;
  }

  #right-panel i {
    font-size: 12px;
  }
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  #map {
    height: 100%;
    float: left;
    width: 63%;
    height: 100%;
  }
  #right-panel {
    float: right;
    width: 34%;
    height: 100%;
  }
  .panel {
    height: 100%;
    overflow: auto;
  }


</style>
