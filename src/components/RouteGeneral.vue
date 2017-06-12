<template>
  <resultComponent   class="resultsField"
                    :directionRoute="shortOutput"
                    :completeRoute="directionRouteDescription"
                    :showDrive="false"
                    :walkRoute="null"
                    :shortRouteCar="null"
  >
  </resultComponent>
</template>
<script>
  import resultComponent from './resultComponent.vue';
  import DirectionService from './DirectionService.vue';

  export default {
      name: 'RouteGeneral',
      props: {
        options: '',
        time:'',

      },
    components: {
      resultComponent
    },
    data () {
          return {
              directionRouteDescription: [],
              directionRouteMap: '',
              shortOutput: [],
          }
    },
    mounted: function() {
      this.getRoutes(this.options);
    },
    methods: {
      getRoutes: function(options1) {
        for (var i = 0; i < this.options.length; i++) {
          this.getRoute(options1[i]);
        }
      },

      getRoute: function (options) {
        var that = this;
        var directionsService = new google.maps.DirectionsService();
        directionsService.route(options, function (result, status) {
          if (status == 'OK') {
            var resultarray;
            that.directionRouteDescription=result;
            if (result.routes[0].legs[0].departure_time) {
                resultarray = {
                transportmethod: options.travelMode,
                distance: result.routes[0].legs[0].distance.value,
                duration: result.routes[0].legs[0].duration.value,
                start: result.routes[0].legs[0].departure_time.text,
                finish: result.routes[0].legs[0].arrival_time.text,
              };
            }
            else {
              var Zeit = new Date();
              var Startzeit = Zeit.getHours() + ":" + Zeit.getMinutes();
              var Ankuftszeit = new Date(Zeit.setTime(Zeit.getTime() + result.routes[0].legs[0].duration.value * 1000));
              Ankuftszeit = Ankuftszeit.getHours() + ":" + Ankuftszeit.getMinutes();
              resultarray = {
                transportmethod: options.travelMode,
                distance: result.routes[0].legs[0].distance.value,
                duration: result.routes[0].legs[0].duration.value,
                start: Startzeit,
                finish: Ankuftszeit,
              };
            }
            that.shortOutput = resultarray;
          }
        });
      }

    },
    watch: {
          'options'(newoptions, options) {
            this.getRoutes(newoptions)
          },
          'time'(newtime,time) {
            this.getRoutes(this.options)
          }
    }



  }
</script>
<style>
  .resultsField {
    margin: auto;
    width: 100%;
  }
</style>
