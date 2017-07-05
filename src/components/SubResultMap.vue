<template>
  <div>
    <div class="maps" ref="map"></div>
    <div class="right-panels">
      <p>Wegpunkt A = Startadresse</p>
      <p v-if="isCarSearch">Wegpunkt B = Standort des Autos</p>
      <p v-if="isCarSearch" >Wegpunkt C = Zieladresse</p>
      <p v-if="isTrainSearch">Wegpunkt B = Zieladresse</p>
    </div>

  </div>
</template>

<script>
  export default {
    name: "SubResultMap",
    props: {
      directionRouteMap: '',
    },

    data() {
      return {
          total: '',
          isCarSearch: false,
          isTrainSearch: false
      }
    },

    mounted: function() {
      // Map initialisieren
      this.initMap();
    },

    methods: {
      /*
      In this function the Google directions object will be rendered in a Google Map view.
      Depending on the kind of transportmethod we have 2 or 3 waypoints at the rendered map.
      Therefor we display 2 or 3 describors.
       */
      initMap: function() {
        var that = this;
        if (that.directionRouteMap.request.travelMode != "DRIVING") {
          that.isTrainSearch = true;
        }
        else {
            that.isCarSearch = true;
        }
        var map = new google.maps.Map(that.$refs.map, {
          zoom: 11,
          center: {lat: 52.5152811, lng: 13.4018376}  // Berlin.
        });

        var directionsDisplay = new google.maps.DirectionsRenderer({
          draggable: true,
          map: map
        });
        directionsDisplay.setDirections(that.directionRouteMap);

      },
    }
  }

</script>
<style scoped>
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
  .maps {

    height: 500px;
    width: 500px;
    float: left;

  }
  .right-panels {
    float: left;
    height: 100%;
  }
  .panel {
    height: 100%;
    overflow: auto;
  }

</style>
