<template>
  <div>

  <div id="gmap"></div>
  <div id="right-panelcar2go">
    <p>Total Distance: <span id="totalcar2go"></span></p>
  </div>

  </div>
</template>

<script>
  export default {
    name: "car2go",
    props: {
      directionRoute: '',
      addressData: '',
    },

    data() {
      return {
          wegbeschreibung: 'one',
      }
    },

    mounted: function() {
      // Map initialisieren
      this.initMap();
    },

    methods: {

      initMap: function() {
        var that = this;
        var gmap = new google.maps.Map(document.getElementById('gmap'), {
          zoom: 4,
          center: {lat: -24.345, lng: 134.46}  // Australia.
        });

        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer({
          draggable: true,
          map: gmap,
          panel: document.getElementById('right-panelcar2go')
        });

        directionsDisplay.addListener('directions_changed', function() {
          that.computeTotalDistance(directionsDisplay.getDirections());
        });

        that.displayRoute('-32.534700, 115.723509', 'Sydney, NSW', directionsService,
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
        var that = this;
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
  #right-panelcar2go {
    font-family: 'Roboto','sans-serif';
    line-height: 30px;
    padding-left: 10px;
  }

  #right-panelcar2go select, #right-panelcar2go input {
    font-size: 15px;
  }

  #right-panelcar2go select {
    width: 100%;
  }

  #right-panelcar2go i {
    font-size: 12px;
  }
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  #gmap {

    height: 500px;
    width: 500px;
    float: left;

  }
  #right-panelcar2go {
    float: left;
    width: 34%;
    height: 100%;
  }
  .panelcar2go {
    height: 100%;
    overflow: auto;
  }

</style>
