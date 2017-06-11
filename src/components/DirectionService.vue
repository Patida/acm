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
    name: "DirectionService",
    props: {
      directionRoute: '',
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

      initMap: function() {
        var that = this;
        if (that.directionRoute.request.travelMode == "DRIVING") {
            that.isCarSearch = true;
        }
        else {
            that.isTrainSearch = true;
        }
        var map = new google.maps.Map(that.$refs.map, {
          zoom: 11,
          center: {lat: 52.5152811, lng: 13.4018376}  // Berlin.
        });

        var directionsDisplay = new google.maps.DirectionsRenderer({
          draggable: true,
          map: map
        });
        directionsDisplay.setDirections(that.directionRoute);

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
    width: 34%;
    height: 100%;
  }
  .panel {
    height: 100%;
    overflow: auto;
  }

</style>
