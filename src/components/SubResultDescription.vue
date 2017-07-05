<template>
  <div>
    <div class="left-panel" ref="leftpanel">
      <p class="descriptionMethod">{{ WayDescriptor }}</p>
    </div>


  </div>
</template>

<script>
  export default {
    name: "SubResultDescription",
    props: {
      description: '',
    },

    data() {
      return {
        total: '',
        WayDescriptor:'',
      }
    },

    mounted: function() {
      // Map initialisieren
      this.updateDescription();
    },

    methods: {

      /*
      In this function the Description is pushed to the html Element with the ref "leftpanel".
      Because the carsharing route contains to Routes we have to check for the correct start. Depending on the Google API
      the Directions could be in a different oder. Sometimes we have to start with object 0, sometimes with 1. In any case the description for walking from the start to the car
      should be the first one.

      With the panel attribute of google.maps.Directionrenderer we only let the description return. The map is not rendered here.
       */
      updateDescription: function() {
        var that = this;
        var directionsService = new google.maps.DirectionsService();
        that.WayDescriptor = "Wegbeschreibung zum Ziel"
        if (that.description[0].request.travelMode == "DRIVING") {
          for (var i = that.description.length; i >= 0; i--) {
            var directionsDisplay = new google.maps.DirectionsRenderer({
              panel: that.$refs.leftpanel
            });
            directionsDisplay.setDirections(that.description[i]);
          }
        }
        else {
          for (var i = 0; i < that.description.length; i++) {
            var directionsDisplay = new google.maps.DirectionsRenderer({
              panel: that.$refs.leftpanel
            });
            directionsDisplay.setDirections(that.description[i]);
          }
        }
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
  .left-panel {
    margin-left: 10%;
    height: 100%;
    width: 80%;
  }

  .panel {
    height: 50%;
    overflow: auto;
  }

  .descriptionMethod {
    font-size: large;
  }

</style>
