<template>
  <div>
    <div class="left-panel" ref="leftpanel">
      <p class="descriptionMethod">{{ primaryWayDescriptor }}</p>
    </div>

    <div class="right-panel" ref="rightpanel">
      <p class="descriptionMethod">{{ secondaryWayDescriptor }}</p>
    </div>

  </div>
</template>

<script>
  export default {
    name: "DirectionService",
    props: {
      description: false,
      descriptionCar: null,
      descriptionWalk: null
    },

    data() {
      return {
        total: '',
        primaryWayDescriptor:'',
        secondaryWayDescriptor:''
      }
    },

    mounted: function() {
      // Map initialisieren
      this.updateDescription();
    },

    methods: {

      updateDescription: function() {
        var that = this;

        var directionsService = new google.maps.DirectionsService();
        if (that.descriptionWalk != null && that.descriptionCar != null) {
          var directionsDisplayWalk = new google.maps.DirectionsRenderer({
            panel: that.$refs.leftpanel
          });
          that.primaryWayDescriptor = "Wegbeschreibung zum Auto";
          directionsDisplayWalk.setDirections(that.descriptionWalk);

          var directionsDisplay = new google.maps.DirectionsRenderer({
            panel: that.$refs.rightpanel
          });
          that.secondaryWayDescriptor = "Wegbeschreibung mit dem Auto zum Ziel";
          directionsDisplay.setDirections(that.descriptionCar);
        }
        else {
          var directionsDisplay = new google.maps.DirectionsRenderer({
            panel: that.$refs.leftpanel
          });
          that.primaryWayDescriptor = "Wegbeschreibung zum Ziel"
          directionsDisplay.setDirections(that.description);
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
    float: left;
    width: 47%;
    height: 100%;
  }
  .right-panel {
    float: right;
    width: 47%;
    height: 100%;
  }

  .panel {
    height: 50%;
    overflow: auto;
  }

  .descriptionMethod {
    font-size: large;
  }

</style>
